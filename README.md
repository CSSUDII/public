# CSSUDII API
[![Node.js CI](https://github.com/CSSUDII/public/actions/workflows/node-tests.yml/badge.svg)](https://github.com/CSSUDII/public/actions/workflows/node-tests.yml) ![code score badge](https://www.code-inspector.com/project/21868/score/svg) ![Website](https://img.shields.io/website?down_message=offline&label=API&up_message=online&url=https%3A%2F%2Fcssudii.loophole.site) ![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m787949650-67589e69fbffafdf836b1b85) ![example](https://img.shields.io/badge/dynamic/json?label=Example%20API%20Response&query=example&url=https%3A%2F%2Fcssudii.loophole.site%2Fv1%2Fplaceholders) ![license](https://img.shields.io/github/license/CSSUDII/public) ![David](https://david-dm.org/CSSUDII/public.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/CSSUDII/public) [![Heroku App Status](http://heroku-shields.herokuapp.com/cssudii-api)](https://cssudii-api.herokuapp.com)

This Repo is for the CSSUDII Public API

**NOTE** This API is WIP, expect bugs

## Public Version
- Main URL: N/A (Currently Offline)
- Heroku: https://cssudii-api.herokuapp.com (Free Dyno)

## Status
- Coming Soon!

## API Docs
- Coming Soon!

## Quick Start: Self Hosting
- Note: Windows is not supported yet

1. Configure Project
```bash
$ mkdir @env
$ touch @env/.env # Then fill it in based on example.env
$ touch .env # Then add: `DATABASE_URL="your mongodb url here"`
# or to do that automatically
$ ./configure
```

2. Clone Repository
```bash
$ git clone https://github.com/CSSUDII/public.git
```

3. Install Dependencies
```bash
$ make install
```

4. Build Code
```bash
$ make build
```

5. Start API
```bash
$ make start
```
