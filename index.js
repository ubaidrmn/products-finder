const express = require("express");
let mustacheExpress = require('mustache-express');
const axios = require("axios");
require('dotenv').config();
const { filterEcommerceSites } = require("./functions");

const app = express()

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get("/", (req,res)=>{
    res.render("home", ({
        name:"ubaid"
    }))
})

app.get("/search", async (req,res)=>{

    const location_name = req.query.locationName
    const data_text = await axios.get(`https://customsearch.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${req.query.q + " for sale in " + location_name}`)
    const data = data_text.data

    res.send({
        "status":"success",
        "data":filterEcommerceSites(data.items)
    })
})

app.use(express.static("public"))

app.listen(8080)
