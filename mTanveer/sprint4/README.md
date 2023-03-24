# Sprint 4
## Api Documentation

This API allows you to perform CRUD (Create, Read, Update, Delete) operations on a database that stores URLs. You can add new URLs, retrieve existing URLs, update the details of a URL, and delete a URL.

#### Base URL  

```sh
https://8f7dtsp2th.execute-api.us-east-2.amazonaws.com/dev
```

### Endpoints  
#### Get all URLs

```sh
GET /
```
Retrieve all URLs in the database.

#### Create a URL  
```sh
POST /
```
```sh
Request Body
{
    "url": "https://example.com",
    "name": "Example
}
```

#### Update a URL  
```sh
PUT /:id
```
```sh
Request Body
{
    "url": "https://updatedexample.com",
    "name": "Updated Example
}
```

#### Delete a URL  
```sh
DELETE /:id
```
Deletes a URL by it's ID.