import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    cantidad: { type: Number }
});

export default model(`Productos`, productoSchema);