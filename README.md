
## Implementation of microservices using serverless framework

Auction service is a service that enables to participate on a auction , place a bid and to send mails to seller and buyer.

This service is implimented through serverless architecture in which each micro service can be deployed using lambda functions and 

### Serverless

- We can only focus on delivering functionality.
- Pay as u go model
- Might not be the best for all the solutions
- No need to worry about scaling
- There are servers but we dont manage them.
- These follows microservices (de-coupled architecture)
- Faas(Function as a service)

## Serverless.yml

**Serverless.yml** file is the heart of serverless framework application and can be found on any serverless framework application.

Serverless supports a very rich ecosystem of plugins .
Such as :
- serverless-webpack
- serverless-domain-manager
- serverless-offline
- serverless-plugin-typescript
- ...more

Follows infrastructure as code (Iac) in which we can define the application infrastructure as code.

### Monolithic Architecture

### Micro-services Architecture

### Communication between micro services
- Http
- Publisher and subscriber
- Message queue (to deal with large amount og data)
- Event stream (apahe kafka and kinesis) (advanced tech)

### Anatomy of a serverless project 

service: \n
	name : (name of the service we r providing) \n
plugins: (list of plugins that we r going to use) \n
	- serverless-bundle \n
provider: (service provider like aws,azure,gcp) \n
	name : aws \n
	runtime :  (runtime of the function like node,python,...) \n
	memorySize: \n
	stage:(stage of the application like dev , test and prod) \n
	region : (region of the deployment of the function) \n
functions :(details of the function) \n
	hello : (name of the function) \n
		handler : (function handler path) \n
		events : (events of invocation of the perticular function) \n
			- http :  \n
				method : (name of the event method like get,put,post,etc..) \n
				path: (end point) \n
