# Axios Data Unpacker

Axios middleware/interceptor that unpacks HTTP responses so that you can focus on actual response

[![Build Status](https://travis-ci.org/anubhavsrivastava/axios-data-unpacker.svg?branch=master)](https://travis-ci.org/anubhavsrivastava/axios-data-unpacker)
[![Coverage Status](https://coveralls.io/repos/github/anubhavsrivastava/axios-data-unpacker/badge.svg?branch=master)](https://coveralls.io/github/anubhavsrivastava/axios-data-unpacker?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub issues](https://img.shields.io/github/issues/anubhavsrivastava/axios-data-unpacker.svg?style=flat-square)](https://github.com/anubhavsrivastava/axios-data-unpacker/issues)

[![NPM](https://nodei.co/npm/axios-data-unpacker.png?downloads=true&stars=true)](https://nodei.co/npm/axios-data-unpacker/)

<!-- toc -->

-   [Introduction](#introduction)
    -   [The Problem](#the-problem)
    -   [Solution](#solution)
-   [Install](#install)
-   [Usage](#usage)
    -   [Configuration](#configuration)
-   [Contribution](#contribution)
-   [License](#license)

<!-- tocstop -->

---

## Introduction

Axios data unpacker is interceptor for axios that unpacks `data` from axios standard response and makes API response content to called so that one can focus on actual response.

### The Problem

Any HTTP request using axios will return into following object that is available to callee function,

    {
        // `data` is the response that was provided by the server
        data: {},

        // `status` is the HTTP status code from the server response
        status: 200,

        // `statusText` is the HTTP status message from the server response
        statusText: 'OK',

        // `headers` the headers that the server responded with
        headers: {},

        // `config` is the config that was provided to `axios` for the request
        config: {}
    }

This would imply that application has to unpack `data` object at all places of consumption something like,

    getUsers() {
        return axios.get('/users').then( function (result) {
            return result.data;
        });
    }

or something like,

    getUsers() {
        return axios.get('/users').then(result => result.data);
    }

### Solution

The above consumption code changes with this module. The above code or all places of consumption would change as below.

    getUsers() {
        return axios.get('/users');
    }

## Install

```
$ npm install axios-data-unpacker --save
```

or

```
yarn add axios-data-unpacker
```

## Usage

Important : This should be last interceptor to be added as response interceptor for your axios instance. This is important because any other response interceptor in chain may use values from complete axios response, like `status` or `headers`.

-   Simple usage

        import axios from 'axios';
        import {axiosResponseDataUnpacker} from 'axios-data-unpacker';

        // after adding other response interceptors
        axiosResponseDataUnpacker(axios)

    `axiosResponseDataUnpacker` function also accepts instance of axios as its parameter.

-   Default Instance

        import axios from 'axios';
        import axiosDataUnpacker from 'axios-data-unpacker';
        ... //other chain of interceptors and config
        axios.interceptors.response.use(axiosDataUnpacker);

-   At instance level

        import axiosDataUnpacker from 'axios-data-unpacker';
        const instance = axios.create();
        ... //other chain of interceptors and config
        instance.interceptors.response.use(axiosDataUnpacker);

### Configuration

One can disable this interceptor by passing `packResponseData` as configuration in axios instance or per axios api call. This configuration can also be set on `axios.default` object.

| Setting Name     | type      | description                    | default value |
| ---------------- | --------- | ------------------------------ | ------------- |
| packResponseData | `Boolean` | Flag to disable data unpacking | `false`       |

1. To disable unpacking for specific call (in case API layer needs to work with header, status, config from standard axios reponse)


        axios.get('/users', { packResponseData;:true } ).then(response=>{
            //response is standard axios response with config, header, status, data, statusText
            response.header('csrf') // sample usage of non-data fields
        })

    This config as parameter is available for all calls(get, post, put, etc) in axios, refer [here](https://www.npmjs.com/package/axios#request-method-aliases).

2.  To disable interceptor for all calls

        const instance = axios.create({packResponseData: true});
        ... //other chain of interceptors and config
        instance.interceptors.response.use(axiosDataUnpacker);

---

<!-- References
https://laracasts.com/discuss/channels/servers/get-data-out-from-axios-javascript -->

## Contribution

Suggestions and PRs are welcome!

Please read the [contribution guidelines](CONTRIBUTING.md) to get started.

<!-- Change contributing.md -->

---

## License

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](LICENSE)

refer `LICENSE` file in this repository.

---
