'use strict'

class Api {
  static errors (status, message) {
    switch (status) {
      case 401: {
        const response = {
          status: false,
          data: {},
          error:
                      {
                        status: status,
                        title: 'Missing Attribute',
                        detail: message
                      }
        }
        return {
          statusCode: 401,
          body: JSON.stringify(response)
        }
      }
        break
      case 402: {
        const response = {
          status: false,
          data: {},
          error:
                      {
                        status: status,
                        title: 'Request not possible',
                        detail: message
                      }
        }
        return {
          statusCode: 402,
          body: JSON.stringify(response)
        }
      }
        break
      case 400: {
        const response = {
          status: false,
          data: {},
          error:
                      {
                        status: status,
                        title: 'Bad Request',
                        detail: message
                      }
        }
        return {
          statusCode: 400,
          body: JSON.stringify(response)
        }
      }
        break
      case 200: {
        const response = {
          status: false,
          data: {},
          error:
                      {
                        status: status,
                        title: 'Request Done',
                        detail: message
                      }
        }
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      }
        break
      default: break
    }
  }

  static response (data) {
    const response = {
      status: true,
      data: data,
      error: {}
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 4)
    }
  }

  static _isAuthError (error) {
    const errorName = error.name
    const authErrorNames = ['TokenExpiredError', 'JsonWebTokenError']
    return errorName && authErrorNames.includes(errorName)
  }

  static _defaultResponse (error) {
    return JSON.stringify({status: 400, message: error.message || error })
  }

  static _authResponse () {
    return JSON.stringify(this.errors.invalidToken)
  }
}

module.exports.Api = Api
