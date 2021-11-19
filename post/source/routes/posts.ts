import express from 'express'
import controller from '../controllers/posts'

const routes = express.Router()

routes.get('/posts', controller.get)
routes.get('/posts/:id', controller.getById)

export = routes