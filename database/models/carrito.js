import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
    owner: { type: Object, require: true }
});

export default model(`Carritos`, carritoSchema)