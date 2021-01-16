# API Format

* base uri: ```api.automail.henrychao.me```
* general status
  * ```ok(200)```, 代表沒啥問題

## ```backend/routes/account.js```

### Register

>```POST ${baseUri}/account/create```

* Request

```json
{
   "username": string!,
   "email": string!,
   "password": string!
}
```

* Respond

```json
{
    "status": string!
}
```

### Log in

>```POST ${baseUri}/account/read```

* Request

```json
{
   "usernameOrEmail": string!,
   "password": string!
}
```

* Respond

```json
{
    "status": string!,
    "token": string!,
    "username": string!
}
```

### Add user's email

>```POST ${baseUri}/account/email/create```

* Request

```json
{
    "token": string!,
    "address": string!,
    "password": string!
}
```

* Respond

```json
{
    "status": string!,
    "id": string!
}
```

### List user's email

>```POST ${baseUri}/account/email/read```

* Request

```json
{
    "token": string!,
}
```

* Respond

```json
{
    "status": string!,
    "email": [
        {
            "id": string!,
            "address": string!,
            "status": bool!
        },
        ...
    ]
}
```

### Modify email information

>```POST ${baseUri}/account/email/update```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "address": string!,
    "password": string!
}
```

* Respond

```json
{
    "status": string!
}
```

### Delete email

>```POST ${baseUri}/account/email/delete```

* Request

```json
{
    "token": string!,
    "emailId": string!,
}
```

* Respond

```json
{
    "status": string!
}
```

## ```backend/routes/content.js```

### Compose an email content

>```POST ${baseUri}/content/create```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "subject": string!,
    "text": string!,
    "attachments": [
        file_object!,
        ...
    ]
}
```

* Respond

```json
{
    "status": string!,
    "id": string!
}
```

### List email contents

>```POST ${baseUri}/content/read```

* Request

```json
{
    "token": string!,
    "emailId": string!
}
```

* Respond

```json
{
    "status": string!,
    "content": [
        {
            "id": string!,
            "subject": string!
        },
        ...
    ]
}
```

### Show email details

>```POST ${baseUri}/content/detail/read```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "contentId": string!
}
```

* Respond

```json
{
    "status": string!,
    "subject": string!,
    "text": string!,
    "attachments": [
        {
            "id": string!,
            "fileName": string!,
            "thumbnail": string
        },
        ...
    ]
}
```

### Modify email details

>```POST ${baseUri}/content/detail/update```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "contentId": string!,
    "subject": string!,
    "text": string!,
    "attachments": [
        file_object!,
        ...
    ],
    "deleteFiles": [
        {
            "id": string!
        },
        ...
    ]
}
```

* Respond

```json
{
    "status": string!,
}
```

### Delete an email content

>```POST ${baseUri}/content/delete```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "contentId": string!
}
```

* Respond

```json
{
    "status": string!,
}
```

## ```backend/routes/deliver.js```

>```POST ${baseUri}/deliver```

* Request

```json
{
    "token": string!,
    "emailId": string!,
    "contentId": string!,
    "recipients": [
        string!,
        ...
    ],
    "cc": [
        string!,
        ...
    ],
    "bcc": [
        string!,
        ...
    ]
}
```

* Respond

```json
{
    "status": string!,
}
```
