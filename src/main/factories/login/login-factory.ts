import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptografy/bcrypt-adapter/bcrypter-adapter'
import { JwtAdapter } from '../../../infra/criptografy/jwt-adapter/jwt-adapter'

import env from '../../config/env'

export const makeSignUpLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
