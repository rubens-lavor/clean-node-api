import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Shold return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'rubens',
        email: 'haryon07@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
