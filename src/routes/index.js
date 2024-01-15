const {Router} =require('express')
const noteRoutes = require('./notes.routes')
const tagRoutes = require('./tags.routes')
const router = Router();

router.use(noteRoutes, tagRoutes)

module.exports = router