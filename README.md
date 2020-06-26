# Neighborhood Watch Alarm (NWA)
NWA is an open source neighborhood security movement with an alarm system that anyone can assemble and manage locally. NWA is published under the [MIT License](https://github.com/neighborhood-watch-alarm/nwa/blob/master/LICENSE).

The client-server system consists of Arduino-based **alarms** outfitted with sensors, and a Raspberry Pi **server**. The devices communicate via LoRa signals and a TTN Gateway. The server sends text-messages when an alarm is triggered.

For general and installation related information, please see the [**main site**](https://nwa-site.herokuapp.com/).

For system details and architecture descriptions, please see the [wiki](https://github.com/neighborhood-watch-alarm/nwa/wiki).

# Code Status

Accepted source code for the server and the website goes through a **Continues Integration** pipeline using *Github Actions*.

The current status for the different pipelines can be seen below:

Server status:

[![Java/Maven alarm-system/server CI](https://github.com/simoneengelbr/nwa/workflows/Java/Maven%20alarm-system/server%20CI/badge.svg)](https://github.com/neighborhood-watch-alarm/nwa/actions?query=workflow%3A%22Java%2FMaven+alarm-system%2Fserver+CI%22)

Frontend status:

[![Node.js site/frontend CI](https://github.com/simoneengelbr/nwa/workflows/Node.js%20site/frontend%20CI/badge.svg)](https://github.com/neighborhood-watch-alarm/nwa/actions?query=workflow%3A%22Node.js+site%2Ffrontend+CI%22)

Backend status:

[![Node.js site/backend CI](https://github.com/simoneengelbr/nwa/workflows/Node.js%20site/backend%20CI/badge.svg)](https://github.com/neighborhood-watch-alarm/nwa/actions?query=workflow%3A%22Node.js+site%2Fbackend+CI%22)


# Current Project Team Members
* [mikkelgthang](https://github.com/mikkelgthang)
* [simoneengelbr](https://github.com/simoneengelbr)
