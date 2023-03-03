import mongoDB from "../../database/options/mongoDB";
import productsModel from "../../database/models/producto";
import userModel from "../../database/models/user";
import ordenModel from "../../database/models/ordenes";

import CrudMongoDB from "../../database/crudMongoDB/crudOrdenes";

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

export default OrdenesDAOMongoDB;