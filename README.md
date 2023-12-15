# GeoMaster

## Documentation API

Ports des services :

- Frontend : **80**
- Proxy & Auth Service : **8080**
- User Service : **8081**
- Country Service : **8082**
- Game Service : **8083**

### Proxy Auth Endpoints

| Endpoint       | HTTP Method | Request Body | Success Response | Failure Response | Description           |
| -------------- | ----------- |--------------| ---------------- | ---------------- | --------------------- |
| /auth/register | POST        | JSON {"username": String, "password": String}  | 200 OK           | 409 Conflict     | Registers a new user. |
| /auth/login    | POST        | JSON {"username": String, "password": String}  | 200 OK           | 401 Unauthorized | Authenticates a user. |

### Country Endpoints

| Endpoint                         | HTTP Method | Success Response | Failure Response | Description                                    |
| -------------------------------- | ----------- | ---------------- | ---------------- | ---------------------------------------------- |
| /countries/name/{countryName}    | GET         | 200 OK           | 404 Not Found    | Retrieves country information by name.         |
| /countries                       | GET         | 200 OK           | N/A              | Retrieves information of all countries.        |

### Game Service Endpoints

| Endpoint                             | HTTP Method | Request Body                                                                   | Success Response | Failure Response | Description                                 |
|--------------------------------------| ----------- |--------------------------------------------------------------------------------| ---------------- | ---------------- | ------------------------------------------- |
| /game/{userId}                       | POST        | -                                                                              | 200 OK           | 404 Not Found    | Creates a new game for the specified user. |
| /game/addMember/{gameId}/{userId}    | PUT         | -                                                                              | 200 OK           | 404 Not Found    | Adds a member to an existing game.         |
| /game/removeMember/{gameId}/{userId} | PUT         | -                                                                              | 200 OK           | 404 Not Found    | Removes a member from an existing game.    |
| /game/play                           | PUT         | JSON: { "gameId": Integer, "userId": Integer, "countryGuesses": List<String> } | 200 OK           | 404 Not Found    | Updates game scores and guesses.           |
| /game/g/{gameId}                     | GET         | -                                                                              | 200 OK           | 404 Not Found    | Retrieves a game by its ID.                |
| /game/u/{userId}                     | GET         | -                                                                              | 200 OK           | 404 Not Found    | Retrieves a game by user ID.               |
| /games                               | GET         | -                                                                              | 200 OK           | 404 Not Found    | Retrieves a list of all games.             |
| /game/{gameId}                       | DELETE      | -                                                                              | 200 OK           | 404 Not Found    | Deletes a game by its ID.                  |

### User Service Endpoints

| Endpoint              | HTTP Method | Success Response | Failure Response | Description                               |
|-----------------------| ----------- |------------------| ---------------- | ----------------------------------------- |
| /users/{idOrUsername} | GET         | 200 OK           | 404 Not Found    | Retrieves a user by ID or username.       |
| /users                | GET         | 200 OK           | 204 No Content   | Retrieves a list of all users.            |
| /users/{id}/{amount}  | PUT         | 200 OK           | 404 Not Found    | Updates a user's information by their ID. |
| /users/{id}           | DELETE      | 204 No Content   | 404 Not Found    | Deletes a user by their ID.               |
| /users                | DELETE      | 204 No Content   | N/A              | Deletes all users.                        |

## Frontend

```bash
cd frontend
nvm install
nvm use
corepack enable
pnpm i
pnpm dev
# open http://127.0.0.1:5173/
```

### Architecture

- `src/components` UI components
- `src/assets` static assets

### Docker

```bash
docker compose up --build
```
