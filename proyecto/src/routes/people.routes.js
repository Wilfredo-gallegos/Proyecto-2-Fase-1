'use strict'

const express = require('express')
const peopleController = require('../controllers/people.controller')
const api = express.Router()

api.get('/producer/:name', peopleController.findByProductorName)
api.get('/creator/:name', peopleController.findByCreatorName)
api.get('/director/:name', peopleController.findByDirectorName)

module.exports = api
