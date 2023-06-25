import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import open from 'open'

import 'colors'
import express from 'express'
import morgan from 'morgan'
import collaborateur from './collaborateur.js'

// Création d'une application ExpressJS
const app = express()

/*
  Configuration
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 9000)

const API_BASE_ROUTE =
  '/' + (process.env.API_BASE_ROUTE ? normalizePath(process.env.API_BASE_ROUTE) + '/' : '')

/**
 * Routeur de l'API
 */
const appRouter = express.Router()

// Analyse les données JSON envoyées par le client
appRouter.use(express.json())
appRouter.use(morgan('dev'))

// Middleware qui permet d'autoriser les requêtes Ajax provenant d'un autre domaine
appRouter.use('/', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Définition des routes de l'application
appRouter.get('/collaborateurs', collaborateur.findAll)
appRouter.get('/collaborateur/:id', collaborateur.findOne)
appRouter.post('/collaborateurs', collaborateur.create)
appRouter.put('/collaborateur/:id', collaborateur.update)
appRouter.delete('/collaborateur/:id', collaborateur.remove)
appRouter.all('/fail/:message', (req, res) =>
  res.status(500).send({ error: 1, message: req.params.message })
)

/**
 * Enregistrement du routeur sur l'App Express
 */

app.use(API_BASE_ROUTE, appRouter)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_, res) => {
  const apiPath = `http://${app.get('host')}:${app.get('port')}${API_BASE_ROUTE}`
  res.render('index', { apiPath })
})

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const startApp = (app) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(app.get('port'), app.get('host'), resolve)
    server.on('error', reject)
  })
}

// Démarrage de l'app Express
;(async () => {
  try {
    await startApp(app)
    console.log(`---------- Server started ----------`.white.bold.bgGreen)
    console.log(`\n\thttp://${app.get('host')}:${app.get('port')}\n`.green)
    console.log(
      `      ${'GET'.red}  ${API_BASE_ROUTE}collaborateurs`.white +
        '        Renvoie la liste de tous les collaborateurs'.gray
    )
    console.log(
      `      ${'GET'.red}  ${API_BASE_ROUTE}collaborateurs/{id}`.white +
        '   Affiche le collaborateur n°{id}'.gray
    )
    console.log(
      `     ${'POST'.red}  ${API_BASE_ROUTE}collaborateurs`.white +
        '        Créer un nouveau collaborateur'.gray
    )
    console.log(
      `      ${'PUT'.red}  ${API_BASE_ROUTE}collaborateurs/{id}`.white +
        '   Modifie le collaborateur n°{id}'.gray
    )
    console.log(
      `   ${'DELETE'.red}  ${API_BASE_ROUTE}collaborateurs/{id}`.white +
        '   Supprime le collaborateur n°{id}'.gray
    )
    console.log(
      `   ${'<ANY*>'.red}  ${API_BASE_ROUTE}fail/{message}`.white +
        '        Renvoie une erreur avec un {message}'.gray
    )
    console.log('')

    if (process.env.NODE_ENV !== 'production' && process.argv.slice(2).includes('--open')) {
      await open(`http://${app.get('host')}:${app.get('port')}`)
    }
  } catch (err) {
    console.log(err.message.red)
  }
})()

function normalizePath(pathString) {
  if (pathString.trim() === '/') return ''
  return path.join(
    ...pathString
      .trim()
      .split('/')
      .filter((segment) => !!segment)
  )
}
