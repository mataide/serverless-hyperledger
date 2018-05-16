# serverless-hyperledger
Serverless Hyperledger

## Contents

* [Features](#features)

## <a name="features"></a>Features

* Websocket - Doesn't work in Lambda, so this function will not be added in the future.
* API key - It is handled by API Gateway, you only need to provide `private: true` to every function.
* Authentication - It is handled by API Gateway, you only need to provide `authorizer:` to every function.
* TLS - It is handled by API Gateway by default, you can also submit your custom certification.
* Auto Scale - It is handled by API Gateway by default, but you should take care of usage limits with `usagePlan` .


## <a name="licensing"></a>Licensing

Serverless Hyperledger is licensed under the [MIT License](./LICENSE.txt).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.