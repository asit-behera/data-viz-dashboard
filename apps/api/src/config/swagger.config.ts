import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    validatorUrl: null,
    info: {
      title: "Data Viz API Documentation",
      version: "0.1.0",
      /* description: "", */
    },
    basePath: "/api-docs",
    staticCSP: true,
    servers: [
      {
        url: "/api",
      },
    ],
  },
  apis: [__dirname + "/../api/**/*routes.ts"],
};

export const specs = swaggerJsdoc(options);
