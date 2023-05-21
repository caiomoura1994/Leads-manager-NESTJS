import { Lead } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function generateMockLead(withId = true): Lead {
    let fakerPayload = {
        id: withId ? faker.number.int() : null,
        name: faker.person.fullName(),
        mail: faker.internet.email(),
        phone: faker.phone.number(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        gclid: faker.string.alphanumeric(),
        fbclid: faker.string.alphanumeric(),
        utmSource: faker.lorem.word(),
        utmCampaign: faker.lorem.word(),
        utmMedium: faker.lorem.word(),
        utmTerm: faker.lorem.word(),
        utmContent: faker.lorem.word(),
    };
    return fakerPayload
}
