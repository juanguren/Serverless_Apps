# Global Array

This project is a literal Global Array. It's a storage, cloud-hosted API available to experimental, Proof of Concept, academic or hackathon-related projects as a realiable and easy to use storage solution. No hosting, no database.

Its purpose: __Storing, updating, retrieving and also erasing JSON data on the go__ 🤷

---

### Base URL: https://sparkling-sun-qvwjh.cloud.serverless.com

- Save/Update/Overwrite (POST): `/data`
- Retrieve (GET): `/data/:keyName`
- Delete (DELETE): `/data/:keyName`

#### Authentication Headers:
- __key__: `api_key`
- __value__: I will create your own personal token, so [shoot me an email!](https://juanguren.github.io/)
---
### Saving, Updating and Overwriting Data

(POST Request: `/data`)

#### SEND

Make a request using the following JSON-parsed body structure:

```
{
    "content": {
      'your data goes in here..'
    },
    "instructions": {
        "keyName": "testKey"
    }
}
```
![image](https://user-images.githubusercontent.com/34801285/152713399-4151e8a3-d0aa-4f46-b47c-d6a76e318632.png)

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

![image](https://user-images.githubusercontent.com/34801285/152711767-24d40433-22e0-429b-a4dd-0e41309de99e.png)


[Check out an example](https://icy-wood-rwis4.cloud.serverless.com/data/testKey)

- Use the following header for the example => [ api_key: test_token2465 ]

### Deleting Data

(DELETE Request: `/data/:keyName`)

---
## Special Modules:
- Health check cron: A scheduler function running every 2 hours. Checks the status of the app.
- Email Service (optional): If any error is identified on the network, an email may be sent as a "wake-up call". (current recipient: myself 😅)
