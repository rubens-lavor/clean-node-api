import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypter-adapter'

describe('Bcrypter Adapter', () => {
  test('Should call bcrypter with correct values', async () => {
    const salt = 12
    const sut = new BcrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
  })
})
