'use strict'

const express = require('express')
const genreController = require('../controllers/genres.controller')
const api = express.Router()

api.get('/name/:name', genreController.findByName)

module.exports = api
