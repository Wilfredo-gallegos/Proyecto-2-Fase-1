'use strict'

const neo4j = require('neo4j-driver')
const {toNativeTypes} = require("../utils");
const {NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD} = require("../constants");
const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD))

async function findByName (req, res) {
    const name = req.params.name
    const session = driver.session()

    try {
        const result = await session.readTransaction(tx =>
            tx.run(`
              match (s:Serie) where toLower(s.title) CONTAINS toLower($name) return s { 
                serie_poster: s.poster,
                serie_title: s.title,
                serie_episodes: s.Episodes,
                serie_seasons: s.Seasons
               } AS serie
        `, { name }))

        const series = result.records.map(row => toNativeTypes(row.get('serie')))

        return res.status(200).send(series)
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    } finally {
        await session.close()
    }
}

async function getSimilar(req, res) {
    const name = req.params.name
    const session = driver.session()

    try {
        const result = await session.readTransaction(async tx => {
            return tx.run(`
              MATCH (:Serie {title: $name})-[:De_Genero|De_Director|De_Productor|De_Creador|Show_de]->()<-[:De_Genero|De_Director|De_Productor|De_Creador|Show_de]-(m)
              WHERE m.title IS NOT NULL AND m.title <> $name
        
              WITH m, count(*) AS inCommon
              WITH m, inCommon AS score
              ORDER BY score DESC
        
              RETURN m {
                serie_poster: m.poster,
                serie_title: m.title,
                serie_episodes: m.Episodes,
                serie_seasons: m.Seasons,
                score: score
              } AS serie
            `, { name })
        })

        const series = result.records.map(row => toNativeTypes(row.get('serie')))

        return res.status(200).send(series)
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: e.message })
    } finally {
        await session.close()
    }
}

module.exports = {
    findByName,
    getSimilar
}
