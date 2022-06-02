'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
const neo4j = require('./neo4j')
const constants = require('./constants')

dotenv.config()

const genresRoutes = require('./routes/genres.routes')
const seriesRoutes = require('./routes/series.routes')
const peopleRoutes = require('./routes/people.routes')
const platformRoutes = require('./routes/platform.routes')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

neo4j.initDriver(constants.NEO4J_URI, constants.NEO4J_USERNAME, constants.NEO4J_PASSWORD)

app.use('/api/genres', genresRoutes)
app.use('/api/series', seriesRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/platforms', platformRoutes)

app.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = app
