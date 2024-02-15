const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
const port = 3000

const Movie = mongoose.model('Movie',{
    title:String,
    description: String,
    image_url: String,
    trailer_url: String
})

app.post("/",async (req,res) => {
    const movie1 = new Movie({
        title:req.body.title,
        description:req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    await movie1.save()
   return res.send(movie1)
}) 

app.get("/", async (req,res)=>{
    const movies = await Movie.find()
    return res.send(movies)
})
app.put("/:id", async (req,res)=>{
    const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        description:req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    return res.send(movieUpdate)
})
app.delete("/:id",async (req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    return res.send(movie)
})
app.listen(port, ()=>{
    mongoose.connect("mongodb+srv://igor07082001:95LtxsCOglFhBEeO@cluster0.gmdptjm.mongodb.net/?retryWrites=true&w=majority")
    console.log(`App funcionando na porta ${port}!`)
})