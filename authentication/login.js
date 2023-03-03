import passport from "passport";
import LocalStrategy from "passport-local"
LocalStrategy.Strategy;

import UserModel from "../database/models/user";
import { isValidPassword } from "../utils/utils";

import log4js from "../utils/utils";

const loggerArchiveError = log4js.getLogger(`errorArchive`);

const login = () => {
    passport.use('login', new LocalStrategy({
        //Configuración para obtener todo el req.
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    }));
}

export default login;