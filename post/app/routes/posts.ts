import express from 'express'
import controller from '../controllers/posts'

const routes = express.Router()

routes.get('/posts', controller.get)
routes.get('/posts/:id', controller.getById)
routes.put('/posts/:id', controller.put)

export = routes