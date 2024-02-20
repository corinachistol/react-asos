export const productSchema = {
    name: { type: "string" },
    image: { type: "string" },
    priceId: { type: "integer" },
    priceAmount: { type: "integer" },
    pricceCurrency: { type: "string" }
};
export const postProductSchema = {
    summary: "add a product",
    body: {
        type: "object",
        properties: productSchema,
        required: ["name", "priceAmount", "priceCurrency"],
    },
    response: {
        201: {
            type: "object",
            properties: productSchema
        }
    }
};
