'use strict'

const express = require('express')
const platformController = require('../controllers/platform.controller')
const api = express.Router()

api.get('/name/:name', platformController.findByName)

module.exports = api
