export const getAllClientsOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'object' }
                    }
                }
            }
        }
    }
};
export const getClientOps = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                }
            }
        }
    }
};
export const postClientOps = {
    schema: {
        body: {
            type: 'object',
            properties: {
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                address: { type: 'string' },
                phone: { type: 'number' },
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['first_name', 'last_name', 'address', 'email', 'phone', 'password']
        }
    }
};
