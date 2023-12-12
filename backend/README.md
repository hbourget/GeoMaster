# Documentation API

Les ports des différents services sont les suivants :

- Frontend : **80**
- Proxy & Auth Service : **8080**
- User Service : **8081**
- Country Service : **8082**
- Game Service : **8083**

#### Proxy Auth Endpoints

| Endpoint          | HTTP Method | Request Body    | Success Response | Failure Response       | Description             |
|-------------------|-------------|-----------------|------------------|------------------------|-------------------------|
| /auth/register    | POST        | RegisterRequest | 200 OK           | 409 Conflict           | Registers a new user.   |
| /auth/login       | POST        | AuthRequest     | 200 OK           | 401 Unauthorized       | Authenticates a user.   |


RegisterRequest Class / AuthRequest Class:

| Champ     | Type   | Description                  |
|-----------|--------|------------------------------|
| username  | String | Nom d'utilisateur de l'authentification. |
| password  | String | Mot de passe de l'utilisateur.           |


#### Country Endpoints

| Endpoint                          | HTTP Method | Success Response | Failure Response | Description                                                   |
|-----------------------------------|-------------|------------------|------------------|---------------------------------------------------------------|
| /countries/name/{countryName}     | GET         | 200 OK           | 404 Not Found    | Retrieves country information by name.                        |
| /countries/capital/{capitalName}  | GET         | 200 OK           | 404 Not Found    | Retrieves country information by capital name.                |
| /countries/flag/{flagName}        | GET         | 200 OK           | 404 Not Found    | Retrieves country information by flag name.                   |
| /countries                        | GET         | 200 OK           | N/A              | Retrieves information of all countries.                       |

#### Game Service Endpoints

| Endpoint                | HTTP Method | Request Body    | Success Response | Failure Response | Description                                                 |
|-------------------------|-------------|-----------------|------------------|------------------|-------------------------------------------------------------|
| /game                   | POST        | Integer (userId) | 200 OK           | 404 Not Found    | Creates a new game for the specified user.                   |
| /game/addMember         | PUT         | Integer (gameId), Integer (userId) | 200 OK | 404 Not Found | Adds a member to an existing game.                          |
| /game/removeMember      | PUT         | Integer (gameId), Integer (userId) | 200 OK | 404 Not Found | Removes a member from an existing game.                     |

#### User Service Endpoints

| Endpoint                | HTTP Method | Request Body | Success Response | Failure Response | Description                                              |
|-------------------------|-------------|--------------|------------------|------------------|----------------------------------------------------------|
| /users/{idOrUsername}   | GET         | -            | 200 OK           | 404 Not Found    | Retrieves a user by ID or username.                       |
| /users                  | GET         | -            | 200 OK           | 204 No Content   | Retrieves a list of all users.                            |
| /users/{id}             | PUT         | User         | 200 OK           | 404 Not Found    | Updates a user's information by their ID.                 |
| /users/{id}             | DELETE      | -            | 204 No Content   | 404 Not Found    | Deletes a user by their ID.                               |
| /users                  | DELETE      | -            | 204 No Content   | N/A              | Deletes all users.                                        |


User Class

| Champ     | Type    | Description                   |
|-----------|---------|-------------------------------|
| id        | Integer | Identifiant de l'utilisateur (généré automatiquement). |
| username  | String  | Nom d'utilisateur.            |
| password  | String  | Mot de passe de l'utilisateur.|
| balance   | double  | Solde de l'utilisateur.       |

UserDTO Class

| Champ     | Type    | Description                  |
|-----------|---------|------------------------------|
| id        | int     | Identifiant de l'utilisateur.|
| username  | String  | Nom d'utilisateur.           |
| balance   | double  | Solde de l'utilisateur.      |