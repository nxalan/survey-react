import faker from '@faker-js/faker'
import { HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({ one: 1, two: 2, three: 3 })
})
