import express from 'express'
import controller from '../controllers/posts'
import validator from '../middleware/posts'

const routes = express.Router()

routes.get('/posts', controller.get)
routes.get('/posts/:id', controller.getById)
routes.put('/posts/:id', validator.createValidationFor('posts_put'), validator.checkValidationResult, controller.put)
routes.post('/posts', validator.createValidationFor('posts'), validator.checkValidationResult, controller.post)
routes.delete('/posts/:id', controller.deletePost)

export = routes