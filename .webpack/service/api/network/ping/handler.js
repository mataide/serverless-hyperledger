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
/******/ 	return __webpack_require__(__webpack_require__.s = "./api/network/ping/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/network/ping/get/action.js":
/*!****************************************!*\
  !*** ./api/network/ping/get/action.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respond = undefined;

let respond = exports.respond = (() => {
  var _ref = _asyncToGenerator(function* (event, cb) {
    try {
      ncp.limit = 16;
      yield ncp('.composer', '/tmp/.composer');
      const instance = getInstance('network', 'cardname');
      const network = new Network(instance);
      const result = yield network.ping();
      return cb(null, _response.Api.response(result));
    } catch (err) {
      const message = get(err, '0.message', err.message);
      return cb(null, _response.Api.errors(200, { 5: message }));
    }
  });

  return function respond(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _response = __webpack_require__(/*! ../../../../lib/response */ "./lib/response.js");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const {
  Connection,
  Network
} = __webpack_require__(/*! ../../../../packages/composer-serverless */ "./packages/composer-serverless/index.js");

const promisify = __webpack_require__(/*! util */ "util").promisify;
var ncp = promisify(__webpack_require__(/*! ncp */ "ncp").ncp);
const { get } = __webpack_require__(/*! lodash */ "lodash");

const { getInstance } = Connection;

/***/ }),

/***/ "./api/network/ping/handler.js":
/*!*************************************!*\
  !*** ./api/network/ping/handler.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _action = __webpack_require__(/*! ./get/action */ "./api/network/ping/get/action.js");

var get = _interopRequireWildcard(_action);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (event, context) => {
  let behavior = event.requestContext.httpMethod;
  switch (behavior) {
    case 'GET':
      return get.respond(event, (error, response) => {
        return context.done(error, response);
      });
  }
};

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

/***/ "./packages/composer-serverless/index.js":
/*!***********************************************!*\
  !*** ./packages/composer-serverless/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

const Connection = __webpack_require__(/*! ./lib/connection */ "./packages/composer-serverless/lib/connection.js");
const Network = __webpack_require__(/*! ./lib/network */ "./packages/composer-serverless/lib/network.js");
const Query = __webpack_require__(/*! ./lib/query */ "./packages/composer-serverless/lib/query.js");
const Transaction = __webpack_require__(/*! ./lib/transaction */ "./packages/composer-serverless/lib/transaction.js");

module.exports = {
  Connection,
  Network,
  Query,
  Transaction
};

/***/ }),

/***/ "./packages/composer-serverless/lib/connection.js":
/*!********************************************************!*\
  !*** ./packages/composer-serverless/lib/connection.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { join } = __webpack_require__(/*! path */ "path");
const { merge } = __webpack_require__(/*! lodash */ "lodash");

const mapConnections = new Map();

class BusinessNetworkConnection {
  connect() {
    return _asyncToGenerator(function* () {
      return new Promise(function (resolve) {
        console.log('open connection');
        console.log(mapConnections);
        setTimeout(function () {
          return resolve({ name: 'connected' });
        }, 5000);
      });
    })();
  }

  ping() {
    return _asyncToGenerator(function* () {
      return { name: 'pong' };
    })();
  }
}

const DEFAULT_OPTS = {
  NETWORK: process.env.NETWORK,
  CARDNAME: process.env.CARDNAME,
  LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
  CONNECTION: {
    wallet: {
      type: 'composer-wallet-filesystem',
      options: {
        storePath: `/tmp/.composer`
      }
    }
  }
};

class Connection {
  constructor(network, cardname) {
    const options = this._getOptionsByEnvironment();
    this.bizNetworkConnection = new BusinessNetworkConnection(options);
    this.network = network;
    this.cardname = cardname;
    this._doAllChecks().catch(err => {
      throw err;
    });
  }

  static getInstance(network, cardname) {
    const instance = mapConnections.get(cardname);
    if (instance) {
      return instance;
    }
    const connection = new Connection(network, cardname);
    mapConnections.set(cardname, connection);
    return connection;
  }

  _getOptionsByEnvironment() {
    if (DEFAULT_OPTS.LAMBDA_TASK_ROOT) {
      return DEFAULT_OPTS.CONNECTION;
    }
    return merge({}, DEFAULT_OPTS.CONNECTION, {
      wallet: {
        options: {
          storePath: join(process.cwd(), '.composer')
        }
      }
    });
  }

  _doAllChecks() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.network) {
        throw new Error('[network] is required');
      }
      if (!_this.cardname) {
        throw new Error('[cardname] is required');
      }
      yield _this._establishConnection();
    })();
  }

  _establishConnection() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.businessNetworkDefinition = yield _this2.bizNetworkConnection.connect(_this2.cardname);
    })();
  }

  set network(value) {
    if (DEFAULT_OPTS.NETWORK) {
      return this._network = DEFAULT_OPTS.NETWORK;
    }
    return this._network = value;
  }

  set cardname(value) {
    if (DEFAULT_OPTS.CARDNAME) {
      return this._cardname = DEFAULT_OPTS.CARDNAME;
    }
    return this._cardname = value;
  }

  get network() {
    return this._network;
  }

  get cardname() {
    return this._cardname;
  }
}

module.exports = {
  create(...args) {
    return new Connection(...args);
  },
  getInstance(...args) {
    return Connection.getInstance(...args);
  }
};

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

/***/ "./packages/composer-serverless/lib/network.js":
/*!*****************************************************!*\
  !*** ./packages/composer-serverless/lib/network.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const AbstractCore = __webpack_require__(/*! ./core */ "./packages/composer-serverless/lib/core.js");

class Network extends AbstractCore {
  constructor(connection) {
    super(connection);
  }

  ping() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this.bizNetworkConnection.ping();
    })();
  }
}

module.exports = Network;

/***/ }),

/***/ "./packages/composer-serverless/lib/query.js":
/*!***************************************************!*\
  !*** ./packages/composer-serverless/lib/query.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const AbstractCore = __webpack_require__(/*! ./core */ "./packages/composer-serverless/lib/core.js");

class Query extends AbstractCore {
  constructor(connection) {
    super(connection);
  }

  get(asset, assetId, value) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const query = _this.bizNetworkConnection.buildQuery(`SELECT ${_this.network}.${asset} WHERE (${assetId} == _$inputValue)`);
      return yield _this.bizNetworkConnection.query(query, { inputValue: value });
    })();
  }

  queryByResource(resource, filter) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return yield _this2.bizNetworkConnection.query(resource, filter);
    })();
  }
}

module.exports = Query;

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=handler.js.map