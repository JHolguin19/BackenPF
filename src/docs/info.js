export const info = {

    definition:{
        openapi: '3.0.0',
        info:{
            title: 'API DOCUMENTATION',
            version: '1.0.0',
            description:'Documentación Proyecto'
        },
        servers:[
            {
                url: 'http://localhost:8080'
            }
        ]
    },

    apis: ["./src/docs/*.yml"],
}

