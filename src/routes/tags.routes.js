const {Router} = require('express')
const { getAllTags } = require('../controllers/tags.controllers')
const router = Router()

router.get("/tags", getAllTags)
router.post("/tags")
router.put("/tags/:id")
router.delete("tags/:id")


module.exports = router