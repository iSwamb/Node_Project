NodeJS - Projet Films

Ce projet permet de gérer une liste de films et de les ajouter/supprimer/modifier. Il inclut également la possibilité pour les utilisateurs de marquer des films comme favoris.
Prérequis

    Node.js
    MySQL

Installation

    Clonez le dépôt : git clone https://github.com/username/nodejs-movies-project.git
    Installez les dépendances : npm install
    Copiez le fichier .env.example et renommez-le .env
    Modifiez les variables d'environnement pour correspondre à votre configuration MySQL :

makefile

DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=movie_database
DB_HOST=localhost
DB_PORT=3306

    Créez la base de données MySQL correspondante
    Lancez l'application : npm start

Variables d'environnement

    PORT: Port utilisé par le serveur (par défaut 3000)
    DB_USERNAME: Nom d'utilisateur MySQL
    DB_PASSWORD: Mot de passe MySQL
    DB_DATABASE: Nom de la base de données MySQL
    DB_HOST: Adresse du serveur MySQL (par défaut localhost)
    DB_PORT: Port utilisé par MySQL (par défaut 3306)

Fonctionnalités

    Afficher la liste de tous les films
    Ajouter un film
    Modifier un film
    Supprimer un film
    Ajouter un film aux favoris
    Retirer un film des favoris

Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

    Forker le dépôt
    Créez une branche pour votre fonctionnalité : git checkout -b feature/my-feature
    Faites vos modifications et commit : git commit -am "Add my feature"
    Poussez votre branche : git push origin feature/my-feature
    Créez une pull request pour votre branche

Auteur

    Votre nom et adresse e-mail

Licence

Ce projet est sous licence MIT.
