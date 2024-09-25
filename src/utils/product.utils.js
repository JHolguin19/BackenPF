import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        stock: parseInt(faker.commerce.price())
    }
}

