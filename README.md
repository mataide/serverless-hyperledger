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


