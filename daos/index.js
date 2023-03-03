import ProductosDAOMongoDB from "../daos/productos/ProductosDAOMongoDB";
import CarritoDAOMongoDB from "../daos/carritos/CarritoDAOMongoDB";
import OrdenesDAOMongoDB from "./ordenes/OrdenesDAOMongoDB";

const getStorage = () => {
    //const storage = process.env.STORAGE;
    const storage = `MongoDb`; //Prueba: forzar variable para trabajar con la DB deseada.

    switch (storage) {

        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break
    }
}

export default getStorage;