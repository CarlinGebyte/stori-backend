# Storicard Newsletters API

This is the API for the Storicard Newsletters project. It is an API that allows users to create, read, update, and delete newsletters, also admin can send the newsletter to all the subscribers.

## Installation and Running

You have to have Docker and Docker Compose installed on your machine to run this project.

For this project, we are using MongoDB as the database, but you don't have to provide the Mongo URI cause it's running inside the docker project.

Please create a `.env.local` file in the root directory of the project and add the following environment variables:

We are using MongoDB as the database, so you have to provide the MongoDB URI in the `.env.local` file.

For sending emails we are using Resend but don't allows to send test emails to multiple emails, you don't have to provide the Resend API key in the `.env.local` file.

For sending emails using Nodemaile and Ethereal, you have to provide the Ethereal email and password in the `.env.local` file, you can create a test email account on Ethereal by visiting [Ethereal](https://ethereal.email/create).

```env
MONGO_URI=
PORT=
RESEND_API_KEY=
ETHEREAL_EMAIL=
ETHEREAL_PASSWORD=
```

**Note: Before starting the project, check the docker-compose in your machine by running `docker compose --version` or `docker-compose --version` if you don't have docker-compose installed, you can install it by following the instructions on the [Docker Compose](https://docs.docker.com/compose/install/) website.**

1. Clone the repository and navigate to the project directory.
2. Run `docker compose/docker-compose --env-file .env.local build` to build the project.
3. Run `docker compose/docker-compose --env-file .env.local up` to run the project.
4. The API will be running on `http://localhost:PORT/api/v1/newsletters` where `PORT` is the port you provided in the `.env.local` file.
