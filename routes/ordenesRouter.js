import { Router } from "express";
import {
    viewOrdenesController,
    createOrdenController
} from "../controller/ordenesController";

const ordenesRouter = Router();

ordenesRouter.get(`/`, viewOrdenesController);
ordenesRouter.post(`/`, createOrdenController);

export default ordenesRouter;