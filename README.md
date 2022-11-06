![Altschool Logo](https://raw.githubusercontent.com/Oluwasetemi/altschool-opensource-names/d5d87d27629fdd83b4a1d601afee0248f69cb25e/AltSchool-dark.svg)

# Altschool Blogging API
This is an API for a blogging app. This was built as my NodeJS second semester examination given by Altschool Africa to quantify how much I have learned at the end of the semester.

---

## Requirements
1. Users can register 
2. Users can login using JWT
3. Users can update their details
4. Users can delete their account
5. Users can get blogs
6. Users can create a blog
7. Users can delete a blog
8. Users can update a blog
9. Users can test the API

---

## Setup
- Install NodeJS, Mongodb, and Python
  > Libraries like `bcrypt` need Python to function
- Pull this repo
- Update `.env` with `example.env`
- To start the app:
  - Uncomment all `console.log` in `/src/configs/db.config.js` and `index.js` file
  - If you are using your local Mongodb server, don't forget to start it
  - Then run
  
    ```bash
    npm run start:dev
    ```
- To run test script:
  - Comment out this code in `index.js` file
  
    ```javascript
    app.listen(PORT, () => {
        console.log('Server listening on port, ', PORT);
    });
    ```
  - Then run
  
    ```bash
    npm run test
    ```
---

## Base URL
- [https://www.myapi_hostsite.com]()

---

## Models

### User
|  field     |  data_type |  constraints  |
|   ---      |  ---       |  ---          |
|  id        |  objectid  |  required     |
|  firstName |  string    |  required     |
|  lastName  |  string    |  required     |
|  email     |  string    |  required     |
|  password  |  string    |  required     |
|  createdAt |  date      |  required     |



### Blog
|  field       |  data_type |  constraints           |
|  ---         |  ---       |  ---                   |
|  id          |  objectid  |  required              |
|  title       |  string    |  unique, required      |
|  description | string     |  optional              |
|  author      |  string    |  required              |
|  authorId    |  objectid  |  required              |
|  body        | string     |  required              |
|  state       |  string    |  required, enum: ['draft', 'published'], default: 'draft' |
|  readCount   |  number    |  required, default: 0 |
|  readTime    | number     |  required, default: 0 |
|  createdAt   |  date      |  required             |
|  updatedAt   |  date      |  required             |



## APIs
---

### Sign-Up User

- Route: /auth/signup
- Method: POST
- Body: 
  
    ```json
    {
        "firstName": "David",
        "lastName": "Udo",
        "email": "udodavid46.ud@gmail.com",
        "password": "davidudo"
    }
    ```

- Responses

    Success

    ```json
    {
        "message": "Signup successful",
        "user": {
            "firstName": "David",
            "lastName": "Udo",
            "email": "udodavid46.ud@gmail.com",
            "password": "$2b$10$XRnjWOd7yosf6EfMrMF/h.YaukrNF1.j8WshSDJtaZF6cs.6GyYS.",
            "createdAt": "2022-11-05T04:14:33.837Z",
            "_id": "6365e3290837e1ec02e582ac",
            "__v": 0
        }
    }
    ```
---
### Login User

- Route: /auth/login
- Method: POST
- Body: 
  
    ```json
    {
        "email": "udodavid46.ud@gmail.com",
        "password": "davidudo"
    }
    ```

- Responses

    Success

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjVlMzI5MDgzN2UxZWMwMmU1ODJhYyIsImVtYWlsIjoidWRvZGF2aWQ0Ni51ZEBnbWFpbC5jb20ifSwiaWF0IjoxNjY3NjIxODQ4fQ.D_-9BccIKmv3w8ExEMMxC7_dDDxO7HNRXgyEesyXf-c"
    }
    ```
---
### Update User

- Route: /user/:id
- Method: PUT
- Header
  - Authorization: Bearer {token}
- Body: 
  
    ```json
    {
        "lastName": "Johnson",
        "email": "udodavid46@gmail.com",
        "password": "davidudo"
    }
    ```

- Responses

    Success

    ```json
    {
        "status": true,
        "user": {
            "_id": "6365e3290837e1ec02e582ac",
            "firstName": "David",
            "lastName": "Johnson",
            "email": "udodavid46@gmail.com",
            "password": "$2b$10$iymosSxA7A9AWbNBOrDqSe29.4AaMiV8hQKQikcwzEzxK9W6lLI4e",
            "createdAt": "2022-11-05T04:14:33.837Z",
            "__v": 0
        }
    }
    ```
---
### Delete User

- Route: /user/:id
- Method: DELETE
- Header
  - Authorization: Bearer {token}
  
- Responses

    Success

    ```json
    {
        "status": true,
        "user": {
            "acknowledged": true,
            "deletedCount": 1
        }
    }
    ```

---
### Create Blog

- Route: /blog
- Method: POST
- Header
  - Authorization: Bearer {token
- Body: 
    ```json
    {
        "title": "JavaScript Tutorial",
        "description": "JavaScript Basics for Beginners",
        "body": "This is the content of the blog.",
        "tags": ["JavaScript", "Beginners"]
    }
    ```

- Responses

    Success

    ```json
    {
        "status": true,
        "blogData": {
          "title": "JavaScript Tutorial",
          "description": "JavaScript Basics for Beginners",
          "author": "David Udo",
          "authorId": "636732cb74766d2d63f2dde2",
          "body": "This is the content of the blog.",
          "state": "draft",
          "readCount": 0,
          "readTime": 1,
          "tags": [
            "JavaScript",
            "Beginners"
          ],
          "createdAt": "2022-11-06T04:19:08.945Z",
          "updatedAt": "2022-11-06T04:19:08.946Z",
          "_id": "636735bc74766d2d63f2ddef",
          "__v": 0
      }
    }
    ```
---
### Get Blog

- Route: /blog/:id
- Method: GET
- Responses

    Success

    ```json
    {
        "status": true,
        "blogData": {
          "_id": "636735bc74766d2d63f2ddef",
          "title": "JavaScript Tutorial",
          "description": "JavaScript Basics for Beginners",
          "author": "David Udo",
          "authorId": "636732cb74766d2d63f2dde2",
          "body": "This is the content of the blog.",
          "state": "draft",
          "readCount": 1,
          "readTime": 1,
          "tags": [
            "JavaScript",
            "Beginners"
          ],
          "createdAt": "2022-11-06T04:19:08.945Z",
          "updatedAt": "2022-11-06T04:19:08.946Z",
          "__v": 0
        },
        "authorInfo": {
          "id": "636732cb74766d2d63f2dde2",
          "firstName": "David",
          "lastName": "Udo",
          "email": "udodavid46.ud@gmail.com"
        }
    }
    ```
---
### Get Blogs

- Route: /blog
- Method: GET
- Query params: 
    - pageNumber (default: 0)
    - state (options: draft | published)
    - author
    - authorId
    - title
    - tag (accepts only one tag e.g nodejs)
    - orderBy (e.g createdAt,updatedAt,readTime,readCount)
    - order (options: asc | desc, default: desc)

- Responses

    Success
    ```json
    {
        "status": true,
        "blogs": [
          {
            "_id": "63673ec91963893bbe5cbe89",
            "title": "JavaScript Tutorial",
            "description": "JavaScript Basics for Beginners",
            "author": "David Udo",
            "authorId": "636732cb74766d2d63f2dde2",
            "body": "This is the content of the blog.",
            "state": "draft",
            "readCount": 0,
            "readTime": 1,
            "tags": [
              "JavaScript",
              "Beginners"
            ],
            "createdAt": "2022-11-06T04:57:45.157Z",
            "updatedAt": "2022-11-06T04:57:45.157Z",
            "__v": 0
          },
          {
            "_id": "63673b181963893bbe5cbe7c",
            "title": "NodeJS Tutorial",
            "description": "NodeJS Basics for Beginners",
            "author": "David Udo",
            "authorId": "636732cb74766d2d63f2dde2",
            "body": "This is the content of the blog.",
            "state": "draft",
            "readCount": 0,
            "readTime": 1,
            "tags": [
              "NodeJS",
              "Beginners"
            ],
            "createdAt": "2022-11-06T04:42:00.127Z",
            "updatedAt": "2022-11-06T04:42:00.130Z",
            "__v": 0
          }
        ],
        "page": 0
    }
    ```
---
### Update Blog

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}

- Responses

    Success
    
    ```json
    {
        "status": true,
        "blog": {
          "_id": "636735bc74766d2d63f2ddef",
          "title": "NodeJS Tutorial For Newbies",
          "description": "JavaScript Basics for Beginners",
          "author": "David Udo",
          "authorId": "636732cb74766d2d63f2dde2",
          "body": "This is the content of the blog.",
          "state": "draft",
          "readCount": 1,
          "readTime": 1,
          "tags": [
            "NodeJS",
            "Beginners",
            "JavaScript"
          ],
          "createdAt": "2022-11-06T04:19:08.945Z",
          "updatedAt": "2022-11-06T04:19:08.946Z",
          "__v": 0
        }
    }
    ```
---
### Delete Blog

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}

- Responses

    Success
    ```json
    {
        "status": true,
        "blog": {
          "acknowledged": true,
          "deletedCount": 1
        }
    }
    ```
---

...

## Contributor
- David Udo
