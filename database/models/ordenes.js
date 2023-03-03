import { Schema, model } from "mongoose";

const ordenesSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
    idOwner: { type: Object, require: true }
});

export default model(`Ordenes`, ordenesSchema);