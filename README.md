# GeoMaster

## Backend

### Documentation API

Les ports des différents services sont les suivants :

- Frontend : **80**
- Proxy & Auth Service : **8080**
- User Service : **8081**
- Country Service : **8082**
- Game Service : **8083**

### Proxy Auth Endpoints

| Endpoint          | HTTP Method | Request Body      | Description             |
|-------------------|-------------|-------------------|-------------------------|
| /auth/register    | POST        | RegisterRequest   | Enregistre un nouvel utilisateur. Renvoie une réponse AuthResponse en cas de succès, sinon un statut 409. |
| /auth/login       | POST        | AuthRequest       | Authentifie un utilisateur. Renvoie une réponse AuthResponse en cas de succès, sinon un statut 401.       |

RegisterRequest Class / AuthRequest Class:

| Champ     | Type   | Description                  |
|-----------|--------|------------------------------|
| username  | String | Nom d'utilisateur de l'authentification. |
| password  | String | Mot de passe de l'utilisateur.           |

---

### User Endpoints

| Endpoint                | HTTP Method | Request Body | Response Body       | Description                                              |
|-------------------------|-------------|--------------|---------------------|----------------------------------------------------------|
| /users/{idOrUsername}   | GET         | -            | UserDTO             | Récupère un utilisateur par ID ou nom d'utilisateur.     |
| /users                  | GET         | -            | List\<UserDTO>       | Récupère la liste de tous les utilisateurs.              |
| /users/{id}             | PUT         | User         | UserDTO             | Met à jour les informations d'un utilisateur par son ID. |
| /users/{id}             | DELETE      | -            | -                   | Supprime un utilisateur par son ID.                      |
| /users                  | DELETE      | -            | -                   | Supprime tous les utilisateurs.                          |

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

### Country Endpoints

| Endpoint                          | HTTP Method | Description                                                   |
|-----------------------------------|-------------|---------------------------------------------------------------|
| /countries/name/{countryName}     | GET         | Récupère les informations d'un pays par son nom.              |
| /countries/capital/{capitalName}  | GET         | Récupère les informations d'un pays par le nom de sa capitale.|
| /countries/flag/{flagName}        | GET         | Récupère les informations d'un pays par le nom de son drapeau.|
| /countries                        | GET         | Récupère les informations de tous les pays.                   |

### Game Endpoints

| Endpoint                | HTTP Method | Request Body                         | Description                                                 |
|-------------------------|-------------|--------------------------------------|-------------------------------------------------------------|
| /game                   | POST        | Integer (userId)                     | Crée une nouvelle partie pour l'utilisateur spécifié.       |
| /game/play              | PUT         | Integer (gameId), List\<String> (countryGuesses) | Met à jour une partie existante avec les devinettes de pays. |
| /game                   | GET         | Integer (gameId)                     | Récupère les détails d'une partie spécifique.               |
| /game/{userId}          | GET         | -                                    | Récupère les détails d'une partie basée sur l'ID de l'utilisateur. |
| /game/{gameId}          | DELETE      | -                                    | Supprime une partie spécifique.                             |
| /game/addMember         | PUT         | Integer (gameId), Integer (userId)   | Ajoute un membre à une partie existante.                    |
| /game/removeMember      | PUT         | Integer (gameId), Integer (userId)   | Retire un membre d'une partie existante.                    |

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
docker compose build
```
