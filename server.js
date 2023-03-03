import { express } from "express";
const app = express();
import passport from "passport";
import log4js from "./utils/logs";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { ParsedArgs } from "minimist";
import { graphqlHTTP } from "express-graphql";
import { graphQLSchema } from "./graphql/schema";
import { graphQLRootValue } from "./graphql/rootValue";

dotenv.config();

app.use("/avatar", express.static("./public/avatar"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/graphql`, graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLRootValue(),
    graphiql: true
}))

import session from "express-session";

//Middleware: session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

const args = parseArgs(process.argv.slice(2));

//Views
app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

//Middlewares
const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});

//My middleware
const isLogged = ((req, res, next) => {
    let msgError = `Para acceder a esta URL debe iniciar sesión`
    if (req.user) {
        next();
    } else {
        return res.render('viewError', { msgError })
    }
});

//Routers import
import productosRouter from "./routes/productosRouter";
import carritoRouter from "./routes/carritoRouter";
import { loginRouter } from "./routes/userRouter";
import { signupRouter } from "./routes/userRouter";
import { logoutRouter } from "./routes/userRouter";
import { profileRouter } from "./routes/userRouter";
import generalViewsRouter from "./routes/generalViewsRouter";
import ordenesRouter from "./routes/ordenesRouter";

//Routers
app.use(`/`, generalViewsRouter);
app.use(`/api/productos`, isLogged, productosRouter);
app.use(`/api/carrito`, isLogged, carritoRouter);
app.use(`/api/ordenes`, isLogged, ordenesRouter);
app.use(`/login`, loginRouter);
app.use(`/signup`, signupRouter);
app.use('/logout', isLogged, logoutRouter);
app.use(`/profile`, isLogged, profileRouter);

app.use((req, res) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`);
    const msgError = `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`;

    res.render(`viewError`, { msgError })

});

    const CLUSTER = args.CLUSTER;

const PORT = process.env.PORT || 8080;
const runServer = (PORT) => {
    app.listen(PORT, () => loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`));
}

if (CLUSTER) {
    if (cluster.isMaster) {

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on(`exit`, (worker, code, signal) => {
            cluster.fork();
        });

    } else {
        runServer(PORT);
    }

} else {
    runServer(PORT);
}