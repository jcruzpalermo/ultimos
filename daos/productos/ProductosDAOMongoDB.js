import mongoDB from "../../database/options/mongoDB";
import productsModel from "../../database/models/producto";

import CrudMongoDB from "../../database/crudMongoDB/crudProductos";

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

export default ProductosDAOMongoDB;