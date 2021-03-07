import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecoration implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    // if (httpResponse.statusCode === 500) {}
    // return httpResponse
    return null
  }
}
