'use strict'

const neo4j = require('neo4j-driver')
const {toNativeTypes} = require("../utils");
const {NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD} = require("../constants");
const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD))

async function findByProductorName (req, res) {
    const name = req.params.name
    const session = driver.session()

    try {
        const result = await session.readTransaction(tx =>
            tx.run(`
              MATCH (p:Person)
              WHERE toLower(p.name) CONTAINS toLower($name)
          
              CALL {
                WITH p
                MATCH (p)<-[:De_Productor]-(s:Serie)
                WHERE s.title IS NOT NULL
                RETURN s {
                    .*
                } AS serie
                ORDER BY s.title DESC
              }
              RETURN p {
                .*,
                serie_poster: serie.poster,
                serie_title: serie.title,
                serie_episodes: serie.Episodes,
                serie_seasons: serie.Seasons
              } as person
        `, { name }))

        const person = result.records.map(row => toNativeTypes(row.get('person')))

        return res.status(200).send(person)
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    } finally {
        await session.close()
    }
}

async function findByDirectorName (req, res) {
    const name = req.params.name
    const session = driver.session()

    try {
        const result = await session.readTransaction(tx =>
            tx.run(`
              MATCH (p:Person)
              WHERE toLower(p.name) CONTAINS toLower($name)
          
              CALL {
                WITH p
                MATCH (p)<-[:De_Director]-(s:Serie)
                WHERE s.title IS NOT NULL
                RETURN s {
                    .*
                } AS serie
                ORDER BY s.title DESC
              }
              RETURN p {
                .*,
                serie_poster: serie.poster,
                serie_title: serie.title,
                serie_episodes: serie.Episodes,
                serie_seasons: serie.Seasons
              } as person
        `, { name }))

        const person = result.records.map(row => toNativeTypes(row.get('person')))

        return res.status(200).send(person)
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    } finally {
        await session.close()
    }
}

async function findByCreatorName (req, res) {
    const name = req.params.name
    const session = driver.session()

    try {
        const result = await session.readTransaction(tx =>
            tx.run(`
              MATCH (p:Person)
              WHERE toLower(p.name) CONTAINS toLower($name)
          
              CALL {
                WITH p
                MATCH (p)<-[:De_Creador]-(s:Serie)
                WHERE s.title IS NOT NULL
                RETURN s {
                    .*
                } AS serie
                ORDER BY s.title DESC
              }
              RETURN p {
                .*,
                serie_poster: serie.poster,
                serie_title: serie.title,
                serie_episodes: serie.Episodes,
                serie_seasons: serie.Seasons
              } as person
        `, { name }))

        const person = result.records.map(row => toNativeTypes(row.get('person')))

        return res.status(200).send(person)
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    } finally {
        await session.close()
    }
}

module.exports = {
    findByCreatorName,
    findByProductorName,
    findByDirectorName
}
