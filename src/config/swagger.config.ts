import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Center API",
      version: "1.0.0",
      description: "Authentication and Authorization API documentation",
    },
    servers: [
      {
        url: "/api/v1",
        description: "API v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password", "clientId"],
          properties: {
            email: { type: "string", format: "email", example: "user@example.com" },
            password: { type: "string", minLength: 6, example: "password123" },
            clientId: { type: "string", example: "60d5ec49f8d2e30015c4e8b1" },
            name: { type: "string", example: "John Doe" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password", "clientId"],
          properties: {
            email: { type: "string", format: "email", example: "user@example.com" },
            password: { type: "string", example: "password123" },
            clientId: { type: "string", example: "60d5ec49f8d2e30015c4e8b1" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            clientId: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Client: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Permission: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

