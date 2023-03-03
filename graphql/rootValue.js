import {  getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById, } from "../resolvers/productosResolver";

    const rootValueFn = () => {
        return {
            getAllProducts, // = getAllProducts: getAllProducts
            getProductById, // = getProductById: getProductById
            addProduct, // = addProduct: addProduct
            updateProductById, // = updateProductById: updateProductById
            deleteProductById // = deleteProductById: deleteProductById
        }
    
    }

export default rootValueFn;