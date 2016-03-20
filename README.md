# redeemable_microservice
Microservice for creating and redeeming "redeemables' through use of codes

Install dependancies with
```bash
npm install --save
```

Server and database URLs and ports: edit *config.js* accordingly.

###Endpoints and their methods:

##### GET /api/redeemables

Get all redeemables database entries.

##### POST /api/redeemables

Create a redeemable with a unique code. The payload is expected to contain a property named 'assigned_specs' which contains either a string or an array of strings which are the properties to be redeemed (i.e. '50_percent_off' etcetera).
Also the payload can optionally contain an expiration date in either months, days or hours. Payload should then contain a property (number type) of either 'expiration.month', 'expiration.days' or 'expiration.hours'. Response is the unique 7 character alphanumeric code.

##### GET /api/redeemables/{code}

Search for a specific redeemable code, and if it is available (i.e. not yet redeemed) and not expired, return its 'assigned_specs' database entry data (array type). Code is then subsequentially set to 'redeemed' in the database, and is from then on no longer redeemable.

##### PATCH /api/redeemables/{code}

Needs to be implemented. Change properties associated with existing code

##### DELETE /api/redeemables/{code}

Needs to be implemented. Delete redeemable from the database
