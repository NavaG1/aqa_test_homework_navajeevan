# My CodeceptJS Project

This project contains automated tests written in JavaScript using CodeceptJS in order to verify psichics in oranum website.

## Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed (for Dockerized testing)

## Clone this repository:

```bash
git clone https://github.com/your-username/my-codeceptjs-tests.git

## Project Structure
my-codeceptjs-project/
|-- Dockerfile
|-- docker-compose.yml
|-- Makefile
|-- features/
| |-- basic.feature
|-- step_definitions/
| |-- steps.js
|-- codecept.conf.js
|-- package.json
|-- README.md



## Running Tests Locally

npx codeceptjs run --steps
##After test runs sucessfully, run below command to generate allure report.

allure serve output

```bash
make test

This command runs CodeceptJS tests locally.

Viewing Allure Report
1. Install Allure Commandline globally:
npm install -g allure-commandline

2. Generate and open the Allure report:
allure serve output






