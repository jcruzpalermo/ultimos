import { buildSchema } from "graphql";
import { productType } from "../graphql/types/productType";
import { productInput } from "../graphql/inputs/productInput";
import { productsQueries } from "../graphql/querys/productsQueries";
import { productsMutation } from "../graphql/mutations/productsMutation";

//Input: lo que necesitamos para la creación.
//Query: lo relacionado con consulta de lectura. --> get
// Mutation: lo relacionado con consultas de escritura. --> post, put, delete

const schema = buildSchema(`
${productType}
${productInput}
type Query {
    ${productsQueries}
}
type Mutation {
    ${productsMutation}
}
`);

export default schema;