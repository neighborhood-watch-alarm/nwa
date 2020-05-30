# NWA

Neighborhood Watch Alarm System. 

Open source LoRa-based neighborhood security system.

## Alarm System

The alarm system is split into **alarms** and **servers**.

The alarm components are build with **arduino** code, and the server is build using **java**.

The respective source code for alarms and server can be found in the two subfolders inside *alarm-system*.

## Site

The site "..." is build with **Node.js** and split into two servers: **frontend** and **backend**.

The frontend is build using **React.js** and the backend is build with **Express.js**.

The two servers connect to each other using API calls.

Both servers are hosted on [Heroku](https://www.Heroku.com)

The source code regarding both the frontend and backend can be found in the respective subfolders inside *site*.

# Code Status

All accepted source coude goes through a **Continues Integration** pipeline using *Github Actions*.

The current status for the different pipelines can be seen below:

Alarm status:
*N/A*

Server status:

![Java/Maven alarm-system/server CI](https://github.com/simoneengelbr/nwa/workflows/Java/Maven%20alarm-system/server%20CI/badge.svg)

Frontend status:

![Node.js site/frontend CI](https://github.com/simoneengelbr/nwa/workflows/Node.js%20site/frontend%20CI/badge.svg)

Backend s´tatus:

![Node.js site/backend CI](https://github.com/simoneengelbr/nwa/workflows/Node.js%20site/backend%20CI/badge.svg)