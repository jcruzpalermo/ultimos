import passport from "passport";
import UserModel from "../database/models/user";
import log4js from "../utils/logs";

const loggerArchiveError = log4js.getLogger(`errorArchive`);

const deserializeUser = () => {
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    });
}

export default deserializeUser;