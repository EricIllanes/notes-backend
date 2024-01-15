const Note = require("../models/Notes");
const Tag = require("../models/Tags");

async function getAllNotes(req, res) {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: Tag,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    let response =[]
    notes.forEach((notes)=>{
        return response.push({
            id: notes.id,
            title: notes.title,
            content:notes.content,
            archived:notes.archived,
            tags: notes.tags.map((tags)=>tags.name)
        })
    })
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

async function createNote(req, res) {
    const { content, tags, title} = req.body;
  try {
    console.log(content, tags, title)
    if (!content || !tags || !title) {
      return res.status(400).send({
        Result: false,
        Description: "Content or tags are required",
        Data: [],
      });
    }

    for (const elements of tags) {
      await Tag.findOrCreate({
        where: {
          name: elements,
        },
      });
    }

    const allTag = await Tag.findAll({
      where: {
        name: tags,
      },
    });

    const newNote = await Note.create({ content, title});
    for(const tag of allTag){
        await newNote.addTag(tag.id)
    }
 
    const associatedTags = await newNote.getTags()
    const tagsForSend = associatedTags.map((tag)=>tag.name)
    const response = {
        id: newNote.id,
        content: newNote.content,
        title: newNote.title,
        archived: newNote.archived,
        tags: tagsForSend

    }

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteNote(req, res) {
  const { id } = req.params;

  await Note.destroy({
    where: {
      id,
    },
  });

  res.status(200).send("Note delete");
}

async function updateNote(req, res) {

  const { id, content, title, archived, tags } = req.body;
  try {
    const existingNote = await Note.findByPk(id,{
        include: [
            {
              model: Tag,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
    });

    if (!existingNote) {
      return res.status(400).send({
        Result: 0,
        Description: "Note not found",
        Data: null,
      });
    }

    const oldTags = existingNote.tags.map((tags)=> tags.name) 
    const tagsToRemove = await Tag.findAll({
      where: {
        name: oldTags,
      },
    });

    for (const tagToRemove of tagsToRemove) {
      await existingNote.removeTag(tagToRemove);
    }

    for (const elements of tags) {
        await Tag.findOrCreate({
          where: {
            name: elements,
          },
        });
      }
  
      const allTag = await Tag.findAll({
        where: {
          name: tags,
        },
      });

      allTag.forEach(async (element) => {
        await existingNote.addTag(element.id);
      });

      await Note.update({content, title, archived},{
        where:{
            id
        }
      })

    res.status(200).send({
      Result: 1,
      Description: "Note updated",
      Data: existingNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getAllNotes, createNote, deleteNote, updateNote };
