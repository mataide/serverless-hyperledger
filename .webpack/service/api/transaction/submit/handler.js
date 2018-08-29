module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./api/transaction/submit/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/transaction/submit/handler.js":
/*!*******************************************!*\
  !*** ./api/transaction/submit/handler.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _action = __webpack_require__(/*! ./transaction/action */ "./api/transaction/submit/transaction/action.js");

var post = _interopRequireWildcard(_action);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (event, context) => {
  let behavior = event.requestContext.httpMethod;
  switch (behavior) {
    case 'POST':
      return post.respond(event, (error, response) => {
        return context.done(error, response);
      });
  }
};

/***/ }),

/***/ "./api/transaction/submit/transaction/action.js":
/*!******************************************************!*\
  !*** ./api/transaction/submit/transaction/action.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respond = respond;

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _response = __webpack_require__(/*! ../../../../lib/response */ "./lib/response.js");

const Transaction = __webpack_require__(/*! ../../../../packages/composer-serverless/lib/transaction */ "./packages/composer-serverless/lib/transaction.js");

var ncp = __webpack_require__(/*! ncp */ "ncp").ncp;

function respond(event, cb) {

  const data = JSON.parse(event.body);

  ncp.limit = 16;
  ncp('.composer', '/tmp/.composer', function (err) {
    if (err) {
      return cb(null, _response.Api.errors(200, { 5: err['message'] }));
    }
    console.log('done!');
    let transaction = new Transaction();
    transaction.submit(data, 'CreateWallet').then(result => {
      return cb(null, _response.Api.response(result));
    }).catch(err => {
      return cb(null, _response.Api.errors(200, { 5: err['message'] }));
    });
  });
}

/***/ }),

/***/ "./lib/response.js":
/*!*************************!*\
  !*** ./lib/response.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

class Api {
  static errors(status, message) {
    switch (status) {
      case 401:
        {
          const response = {
            status: false,
            data: {},
            error: {
              status: status,
              title: 'Missing Attribute',
              detail: message
            }
          };
          return {
            statusCode: 401,
            body: JSON.stringify(response)
          };
        }
        break;
      case 402:
        {
          const response = {
            status: false,
            data: {},
            error: {
              status: status,
              title: 'Request not possible',
              detail: message
            }
          };
          return {
            statusCode: 402,
            body: JSON.stringify(response)
          };
        }
        break;
      case 400:
        {
          const response = {
            status: false,
            data: {},
            error: {
              status: status,
              title: 'Bad Request',
              detail: message
            }
          };
          return {
            statusCode: 400,
            body: JSON.stringify(response)
          };
        }
        break;
      case 200:
        {
          const response = {
            status: false,
            data: {},
            error: {
              status: status,
              title: 'Request Done',
              detail: message
            }
          };
          return {
            statusCode: 200,
            body: JSON.stringify(response)
          };
        }
        break;
      default:
        break;
    }
  }

  static response(data) {
    const response = {
      status: true,
      data: data,
      error: {}
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 4)
    };
  }

  static _isAuthError(error) {
    const errorName = error.name;
    const authErrorNames = ['TokenExpiredError', 'JsonWebTokenError'];
    return errorName && authErrorNames.includes(errorName);
  }

  static _defaultResponse(error) {
    return JSON.stringify({ status: 400, message: error.message || error });
  }

  static _authResponse() {
    return JSON.stringify(this.errors.invalidToken);
  }
}

module.exports.Api = Api;

/***/ }),

/***/ "./packages/composer-serverless/lib/core.js":
/*!**************************************************!*\
  !*** ./packages/composer-serverless/lib/core.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

module.exports = class AbstractCore {
  constructor(connection) {
    const {
      bizNetworkConnection,
      businessNetworkDefinition,
      network,
      cardname
    } = connection;
    this.bizNetworkConnection = bizNetworkConnection;
    this.businessNetworkDefinition = businessNetworkDefinition;
    this.network = network;
    this.cardname = cardname;
  }
};

/***/ }),

/***/ "./packages/composer-serverless/lib/transaction.js":
/*!*********************************************************!*\
  !*** ./packages/composer-serverless/lib/transaction.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const AbstractCore = __webpack_require__(/*! ./core */ "./packages/composer-serverless/lib/core.js");
const { isPlainObject } = __webpack_require__(/*! lodash */ "lodash");

class Transaction extends AbstractCore {
  constructor(connection) {
    super(connection);
  }

  submit(resource, method) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let factory = _this.businessNetworkDefinition.getFactory();
      let transaction = factory.newTransaction(_this.network, method);

      Object.entries(resource).map(function (key, value) {
        if (_this.isObject(key[1])) {
          if (key[1].$concept) {
            let concept = factory.newConcept(_this.network, key[1].$concept);
            delete key[1].$concept;
            Object.assign(concept, key[1]);
            resource[key[0]] = concept;
          }
        }
      });
      Object.assign(transaction, resource);

      const concept = yield _this.bizNetworkConnection.submitTransaction(transaction);
      return concept;
    })();
  }

  isObject(o) {
    return isPlainObject(o);
    return o !== null && typeof o === 'object' && Array.isArray(o) === false;
  }

}
module.exports = Transaction;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "ncp":
/*!**********************!*\
  !*** external "ncp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ncp");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ });
//# sourceMappingURL=handler.js.map