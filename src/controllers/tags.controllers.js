async function getAllTags(req, res) {
  res.send("get tag");
}

async function createTag(req, res) {
  res.send("crear tag");
}
module.exports = { getAllTags, createTag };
