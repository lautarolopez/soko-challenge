export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge Soko API',
      version: '1.0.0',
      description: 'API documentation for the Challenge Soko API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./src/features/*/*.router.ts'],
}
