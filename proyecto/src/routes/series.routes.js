'use strict'

const express = require('express')
const seriesController = require('../controllers/series.controller')
const api = express.Router()

api.get('/name/:name', seriesController.findByName)
api.get('/similar/:name', seriesController.getSimilar)

module.exports = api
