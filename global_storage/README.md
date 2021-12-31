# Global Array

This project aims to create a literal Global Array API. Available to small, academic or experimental projects as a realiable and easy to use storage solution. No hosting, no database.

Its purpose: Storing and retrieving data on the go 🤷

- Save/Update/Overwrite (POST): https://tiny-mud-prr78.cloud.serverless.com/data
- Retrieve (GET): https://tiny-mud-prr78.cloud.serverless.com/data/:keyName
- Delete (DELETE): https://tiny-mud-prr78.cloud.serverless.com/data/:keyName

#

### Saving, Updating and Overwriting Data

(POST Request: https://tiny-mud-prr78.cloud.serverless.com/data)

#### SEND

Make a request using the following JSON-parsed body structure:

```
{
    "content": {
      'object(s) go in here..'
    },
    "instructions": {
        "keyName": "testKey"
    }
}
```

#### UPDATE

Resending content using the same key name will append that body to the previously saved key, generating an **update action**.

#### OVERWRITE

Using the same body, include the `overwrite` boolean attribute inside of **"instructions**. The overwrite should be sent on `true`

```
{
    "content": {
      "newData": "This should overwrite"
    },
    "instructions": {
        "keyName": "testKey",
        "overwrite": true
    }
}
```

### Retrieving Data

(GET Request: https://tiny-mud-prr78.cloud.serverless.com/data/:keyName)

[Check out an example](https://tiny-mud-prr78.cloud.serverless.com/data/keyTest)

### Deleting Data

(DELETE Request: https://tiny-mud-prr78.cloud.serverless.com/data/:keyName)
