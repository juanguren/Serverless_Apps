# Global Array

This project aims to create a literal Global Array API. Available to small, academic or experimental projects as a realiable and easy to use storage solution. No hosting, no database.

Its purpose: Storing and retrieving data on the go 🤷

### Base URL: https://sparkling-sun-qvwjh.cloud.serverless.com

- Save/Update/Overwrite (POST): `/data`
- Retrieve (GET): `/data/:keyName`
- Delete (DELETE): `/data/:keyName`

#

### Saving, Updating and Overwriting Data

(POST Request: `/data`)

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

#### UPDATE DATA

Resending content using the same key name will append that body to the previously saved key, generating an **update action**.

#### OVERWRITE DATA

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

(GET Request: `/data/:keyName`)

[Check out an example](https://icy-wood-rwis4.cloud.serverless.com/data/testKey)

- Use the following header for the example => [ api_key: test_token2465 ]

### Deleting Data

(DELETE Request: `/data/:keyName`)
