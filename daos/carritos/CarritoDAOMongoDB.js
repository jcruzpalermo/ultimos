import mongoDB from "../../database/options/mongoDB";
import carritoModel from "../../database/models/carrito";
import productsModel from "../../database/models/producto";
import userModel from "../../database/models/user";
import CrudMongoDB from "../../database/crudMongoDB/crudCarritos";

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel, userModel);
    };
};

export default CarritoDAOMongoDB;