# Installation

Nous avons un Dockerfile par micro service permettant de construire l'image du microservice.

Pour lancer le projet il suffit de faire un `docker-compose up` à la racine.

L'application démarre sur le port 80.

Nous avons aussi un containeur pour les tests du microservice `card` (et aussi `inventory` mais il reste a tester). Ce containeur va générer un rapport de couverture de test et le persister dans le dossier `./sonar_tests/data/card` (ou `./sonar_tests/data/inventory`).

Nous avons aussi un containeur sonarqube permettant de faire un rapport de code dans l'interface web de sonarqube. Les rapport sont effectué grace au containeur de test qui va executer un script.sh qui va executer une commande maven dans card et inventory permettant d'envoyer le rapport a sonarqube et de le voir dans l'interface web.

# Schéma d'architecture :
![ Archi](images/archimicro.png)

# Documentation fonctionnelle de l'application

L'application permet aux utilisateurs de jouer à un jeu de cartes en ligne contre d'autres joueurs. Voici les principales fonctionnalités de l'application :

1. **Création de compte** : L'utilisateur peut créer un compte en fournissant un nom d'utilisateur et un mot de passe.


2. **Inventaire de cartes** : Après la création du compte, l'application attribue automatiquement trois cartes aléatoires à l'inventaire de l'utilisateur. Chaque carte est unique et ne peut se retrouver dans deux inventaires différents.


3. **Création de game** : Un utilisateur peut créer une game en lui donnant un nom. Une récompense aléatoire est attribuée au moment de la création de la game, entre 15 et 30 pièces.
![ Game](images/Games.png)

4. **Attente du deuxième joueur** : Lorsqu'un utilisateur a créé la game, cette dernière a son statut en "waiting". En effet, elle attend un deuxième joueur. Une fois que le deuxième joueur a rejoint la game, le statut passe en "ready", personne d'autres ne peut rejoindre.

5. **Sélection de la carte** : À ce moment-là, chaque utilisateur choisit une carte dans son inventaire pour la partie.

6. **Déroulement de la partie** : Une fois les deux joueurs ayant choisi leur carte, le partie commence, le statut passe en "started". Chaque joueur joue chacun son tour.
   Un tour correspond à l'attaque de la carte du joueur X sur celle du joueur Y.
   Les dégâts envoyés sont différents en fonction de l'attribut power et type de la carte. Il existe trois types : Feu, Eau, Terre. Il y a également 30% de chance d'envoyer un coup critique.
   La première carte arrivant à 0 point de vie a perdu. La carte du perdant perd 10 points d'énergie et celle du gagnant perd que 5 points d'énergie.
   Une carte qui a 0 d'énergie ne peut pas participer à une partie.
![ Game](images/Game.png)

8. **Récupération de l'énergie** : Toutes les 30 secondes sur, chaque carte récupère 1 point d'énergie.


9. **Marché** : Il existe un marché où l'on peut acheter des cartes avec ses pièces.
![ Marche](images/Marche.png)

# CI CD

Pour la CI CD nous avons un job qui build toutes les images docker des microservices et les push sur le container registry de gitlab.

Nous avons aussi un deuxième job qui run les containeur pour assurer qu'il n'y a aucun problème lors de l'exécution des microservices.

A terme la CI CD devra déployer les microservices sur un serveur, qui pour l'instant est fait manuellement.

L'utilisation de kubernetes serait un plus car il permettrait de déployer les microservices sur plusieurs serveurs et de les scaler en fonction de la charge. Cela permet aussi de considéré les microservices en running si l'application n'a pas de problème et non dès le démarage du container.


# Documentation API

Les ports des différents services sont les suivants : 

- Frontend : **80**
- Proxy & Auth Service : **8080**
- User Service : **8081**
- Card Service : **8082**
- Inventory Service : **8083**
- Game Service : **8084**


# Card Service

### GET `/cards/{id}`

Récupérer une carte par son ID.

- **Paramètres** :
  - id (int) : L'ID de la carte.

- **Réponse** :
  - 200 OK : La carte est récupérée. Renvoie l'objet `Card`.
  - 404 NOT_FOUND : La carte n'a pas été trouvée.

### GET `/cards`

Récupérer toutes les cartes.

- **Réponse** :
  - 200 OK : Renvoie la liste de tous les objets `Card`.
  - 204 NO_CONTENT : Aucune carte n'est disponible.

### POST `/cards`

Ajouter une nouvelle carte.

- **Corps de la requête** :
  - card (`CardDTO`) : Les données de la carte à ajouter.

- **Réponse** :
  - 201 CREATED : La carte a été créée. Renvoie l'objet `Card` créé.
  - 400 BAD_REQUEST : La demande est incorrecte.

### POST `/cards/bulk`

Ajouter plusieurs cartes en une seule fois.

- **Corps de la requête** :
  - cards (Liste de `CardDTO`) : Les données des cartes à ajouter.

- **Réponse** :
  - 201 CREATED : Les cartes ont été créées. Renvoie la liste des objets `Card` créés.
  - 400 BAD_REQUEST : La demande est incorrecte.

### DELETE `/cards/{id}`

Supprimer une carte par son ID.

- **Paramètres** :
  - id (int) : L'ID de la carte.

- **Réponse** :
  - 204 NO_CONTENT : La carte a été supprimée.
  - 404 NOT_FOUND : La carte n'a pas été trouvée.

### DELETE `/cards`

Supprimer toutes les cartes.

- **Réponse** :
  - 204 NO_CONTENT : Toutes les cartes ont été supprimées.

### PUT `/cards/{id}`

Mettre à jour une carte par son ID.

- **Paramètres** :
  - id (int) : L'ID de la carte.

- **Corps de la requête** :
  - card (`Card`) : Les données de la carte à mettre à jour.

- **Réponse** :
  - 200 OK : La carte a été mise à jour. Renvoie l'objet `Card` mis à jour.
  - 404 NOT_FOUND : La carte n'a pas été trouvée.

# Auth Service

## Endpoints Auth

### POST `/login`

Authentifier un utilisateur.

- **Corps de la requête** :
  - credentials (Map) : Un objet contenant "username" et "password" en clés.

- **Réponse** :
  - 200 OK : Authentification réussie. Renvoie l'objet `UserDTO`.
  - 401 UNAUTHORIZED : Authentification échouée.

### POST `/register`

Inscrire un nouvel utilisateur.

- **Corps de la requête** :
  - credentials (Map) : Un objet contenant "username" et "password" en clés.

- **Réponse** :
  - 200 OK : Inscription réussie. Renvoie l'objet `UserDTO`.
  - 401 UNAUTHORIZED : Inscription échouée.

# User Service

## Endpoints User

### GET `/users/{idOrUsername}`

Récupérer un utilisateur par ID ou nom d'utilisateur.

- **Paramètres** :
  - idOrUsername (String) : ID ou nom d'utilisateur de l'utilisateur.

- **Réponse** :
  - 200 OK : Utilisateur trouvé. Renvoie l'objet `UserDTO`.
  - 404 NOT FOUND : Utilisateur introuvable.

### GET `/users`

Récupérer tous les utilisateurs.

- **Réponse** :
  - 200 OK : Liste des utilisateurs trouvée. Renvoie une liste d'objets `UserDTO`.
  - 204 NO CONTENT : Aucun utilisateur trouvé.

### PUT `/users/{id}`

Mettre à jour un utilisateur.

- **Paramètres** :
  - id (Integer) : ID de l'utilisateur.

- **Corps de la requête** :
  - user (`User`) : L'objet utilisateur mis à jour.

- **Réponse** :
  - 200 OK : Utilisateur mis à jour. Renvoie l'objet `UserDTO`.
  - 404 NOT FOUND : Utilisateur introuvable.

### PUT `/users/{id}/addbalance`

Ajouter un solde à un utilisateur.

- **Paramètres** :
  - id (Integer) : ID de l'utilisateur.

- **Corps de la requête** :
  - balanceToAdd (Integer) : Solde à ajouter.

- **Réponse** :
  - 200 OK : Solde ajouté. Renvoie l'objet `UserDTO`.
  - 404 NOT FOUND : Utilisateur introuvable.

### PUT `/users/{id}/subtractbalance`

Soustraire un solde à un utilisateur.

- **Paramètres** :
  - id (Integer) : ID de l'utilisateur.

- **Corps de la requête** :
  - balanceToSubtract (Integer) : Solde à soustraire.

- **Réponse** :
  - 200 OK : Solde soustrait. Renvoie l'objet `UserDTO`.
  - 404 NOT FOUND : Utilisateur introuvable.

### DELETE `/users/{id}`

Supprimer un utilisateur.

- **Paramètres** :
  - id (Integer) : ID de l'utilisateur.

- **Réponse** :
  - 204 NO CONTENT : Utilisateur supprimé.
  - 404 NOT FOUND : Utilisateur introuvable.

### DELETE `/users`

Supprimer tous les utilisateurs.

- **Réponse** :
  - 204 NO CONTENT : Tous les utilisateurs supprimés.

# Inventory Service

## Endpoints Inventory

### POST `/inventories/users/{userId}/cards/{cardId}`

Ajouter une carte à l'inventaire d'un utilisateur.

- **Paramètres** :
  - `userId` (Integer) : L'ID de l'utilisateur.
  - `cardId` (Integer) : L'ID de la carte.

- **Réponse** :
  - 200 OK : La carte a été ajoutée à l'inventaire. Renvoie l'`InventoryResponse` mis à jour.
  - 409 CONFLICT : La carte n'a pas pu être ajoutée à l'inventaire.

### DELETE `/inventories/users/{userId}/cards/{cardId}`

Supprimer une carte de l'inventaire d'un utilisateur.

- **Paramètres** :
  - `userId` (Integer) : L'ID de l'utilisateur.
  - `cardId` (Integer) : L'ID de la carte.

- **Réponse** :
  - 200 OK : La carte a été supprimée de l'inventaire.
  - 409 CONFLICT : La carte n'a pas pu être supprimée de l'inventaire.

### POST `/inventories/users/{userId}/cards`

Ajouter toutes les cartes à l'inventaire d'un utilisateur.

- **Paramètres** :
  - userId (Integer) : L'ID de l'utilisateur.

- **Réponse** :
  - 200 OK : Toutes les cartes ont été ajoutées à l'inventaire. Renvoie l'`InventoryResponse` mis à jour.
  - 404 NOT_FOUND : L'inventaire de l'utilisateur n'a pas été trouvé.

### DELETE `/inventories/users/{userId}/cards`

Supprimer toutes les cartes de l'inventaire d'un utilisateur.

- **Paramètres** :
  - `userId` (Integer) : L'ID de l'utilisateur.

- **Réponse** :
  - 200 OK : Toutes les cartes ont été supprimées de l'inventaire.

### GET `/inventories/users/{userId}`

Récupérer l'inventaire d'un utilisateur.

- **Paramètres** :
  - `userId` (Integer) : L'ID de l'utilisateur.

- **Réponse** :
  - 200 OK : L'inventaire de l'utilisateur est récupéré. Renvoie l'`InventoryResponse`.
  - 404 NOT_FOUND : L'inventaire de l'utilisateur n'a pas été trouvé.

### GET `/inventories`

Récupérer tous les inventaires.

- **Réponse** :
  - 200 OK : Renvoie une liste de tous les objets `Inventory`.

### POST `/inventories/buy/users/{idUser}/cards/{cardId}`

Acheter une carte pour un utilisateur.

- Paramètre du chemin :
  - idUser (Integer) : ID de l'utilisateur.
  - cardId (Integer) : ID de la carte à acheter.

- Réponse :
  - 200 OK : Achat réussi. Renvoie l'objet `Card`.
  - 409 CONFLICT : Conflit, probablement parce que l'utilisateur n'a pas assez de solde pour acheter la carte.

### POST `/inventories/sell/users/{idUser}/cards/{cardId}`

Vendre une carte d'un utilisateur.

- Paramètre du chemin :
  - idUser (Integer) : ID de l'utilisateur.
  - cardId (Integer) : ID de la carte à vendre.

- Réponse :
  - 200 OK : Vente réussie. Renvoie l'objet `Card`.
  - 409 CONFLICT : Conflit, probablement parce que l'utilisateur ne possède pas la carte à vendre.

### POST `/inventories/sell/users/{idUser}`

Vendre toutes les cartes d'un utilisateur.

- Paramètre du chemin :
  - idUser (Integer) : ID de l'utilisateur.

- Réponse :
  - 200 OK : Toutes les cartes vendues avec succès.
  - 409 CONFLICT : Conflit, probablement parce que l'utilisateur ne possède pas de cartes à vendre.

# Game Service

## Endpoints Game

### GET `/games/{idOrName}`

Récupérer une game par son ID ou son nom.

- Paramètre :
  - idOrName (String) : ID ou nom de la game.

- Réponse :
  - Objet `Game` si la game est trouvée.
  - null si la game n'est pas trouvée.

### GET `/games`

Récupérer toutes les game.

- Réponse :
  - Liste d'objets `Game`.

### POST `/games`

Ajouter une game.

- Corps de la requête :
  - Objet `Game` à ajouter.

- Réponse :
  - 201 CREATED : Game créée avec succès. Renvoie l'objet `Game`.
  - 400 BAD_REQUEST : Erreur lors de la création de la game.

### POST `/games/bulk`

Ajouter plusieurs game.

- Corps de la requête :
  - Liste d'objets `Game` à ajouter.

- Réponse :
  - 201 CREATED : Games créées avec succès. Renvoie la liste des objets `Game`.
  - 400 BAD_REQUEST : Erreur lors de la création des games.

### DELETE `/games/{idGame}`

Supprimer une game.

- Paramètre du chemin :
  - idGame (int) : ID de la game.

- Réponse :
  - Objet renvoyé par la méthode `deleteGame` du service `GameService`.

### DELETE `/games`

Supprimer toutes les games.

- Réponse :
  - Objet renvoyé par la méthode `deleteAllGames` du service `GameService`.

### PUT `/games/join/{idGame}/users/{playerId}`

Rejoindre une game.

- Paramètre :
  - idGame (int) : ID de la game.
  - playerId (int) : ID du joueur.

- Réponse :
  - Objet Game renvoyé par la méthode `joinGame` du service `GameService`.

### PUT `/games/leave/{idGame}/users/{playerId}`

Quitter une game.

- Paramètre :
  - idGame (int) : ID de la game.
  - playerId (int) : ID du joueur.

- Réponse :
  - Objet Game renvoyé par la méthode `leaveGame` du service `GameService`.

### PUT `/games/{idGame}/users/{playerId}/cards/{cardId}`

Ajouter une carte à une game.

- Paramètre :
  - idGame (int) : ID de la game.
  - cardId (int) : ID de la carte.
  - playerId (int) : ID du joueur.

- Réponse :
  - Objet Game renvoyé par la méthode `addCardToGame` du service `GameService`.

### PUT `/games/play/{idGame}/users/{idUser}`

Jouer un tour dans une game.

- Paramètre :
  - idGame (int) : ID de la game.
  - idUser (int) : ID de l'utilisateur.

- Réponse :
  - Objet Game renvoyé par la méthode `playRound` du service `GameService`.
