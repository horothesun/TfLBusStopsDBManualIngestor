# TfL bus stops DB manual ingestor

[![CI](https://github.com/horothesun/TfLBusStopsDBManualIngestor/actions/workflows/ci-linux.yml/badge.svg)](https://github.com/horothesun/TfLBusStopsDBManualIngestor/actions/workflows/ci-linux.yml)

TfL bus stops PostgreSQL DB ingestor.

## Pre-requisites

Create a `.env` file like the following:

```bash
DB_USERNAME=__________
DB_PASSWORD=__________
DB_SERVER_NAME=_______
DB_PORT=______________
```

## Setup

```bash
nvm use
npm install
```

### Run

```bash
npm start
```
