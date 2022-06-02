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
              MATCH (p:Plataform)
              WHERE toLower(p.title) CONTAINS toLower($name)
          
              CALL {
                WITH p
                MATCH (p)<-[:Show_de]-(s:Serie)
                WHERE s.title IS NOT NULL
                AND s.poster IS NOT NULL
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
              } as platform
        `, { name }))

        const platforms = result.records.map(row => toNativeTypes(row.get('platform')))

        return res.status(200).send(platforms)
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    } finally {
        await session.close()
    }
}

module.exports = {
    findByName
}
