NodeJS - Projet Films

Ce projet permet de gérer une liste de films et de les ajouter/supprimer/modifier. Il inclut également la possibilité pour les utilisateurs de marquer des films comme favoris.
Prérequis

    Node.js
    MySQL

Installation

    Clonez le dépôt : git clone https://github.com/iSwamb/Node_Project.git
    Installez les dépendances : npm install
    Copiez le fichier .env.example et renommez-le .env
    Modifiez les variables d'environnement pour correspondre à votre configuration MySQL :

makefile

DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=movie_database
DB_HOST=localhost
DB_PORT=3306

    Créez la base de données MySQL correspondante (dump base "sql_db.sql" dans le dossier "migrations")
    Lancez l'application : npm start

Variables d'environnement

    PORT: Port utilisé par le serveur (par défaut 3000)
    DB_USERNAME: Nom d'utilisateur MySQL
    DB_PASSWORD: Mot de passe MySQL
    DB_DATABASE: Nom de la base de données MySQL
    DB_HOST: Adresse du serveur MySQL (par défaut localhost)
    PORT: Port utilisé par MySQL (par défaut 3306)

Fonctionnalités

    Afficher la liste de tous les films
    Ajouter un film
    Modifier un film
    Supprimer un film
    Ajouter un film aux favoris
    Retirer un film des favoris
