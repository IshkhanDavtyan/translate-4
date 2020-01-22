const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})
app.use(express.json())



app.post('/sendEnglishData', async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync("en.json"))
        for (let [key, val] of Object.entries(req.body)) {
            file[key] = val
        }

        fs.writeFileSync('en.json', JSON.stringify(file))
        res.send(file)
        console.log(file)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/sendRussianData', async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync("ru.json"))
        for (let [key, val] of Object.entries(req.body)) {
            file[key] = val
        }

        fs.writeFileSync('ru.json', JSON.stringify(file))
        res.send(file)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

app.post('/sendArmenianData', async (req, res) => {
console.log(req.body)
    const file = JSON.parse(fs.readFileSync("arm.json"))
        for (let [key, val] of Object.entries(req.body)) {
            file[key] = val
        }
        // console.log(file)

        fs.writeFileSync('arm.json', JSON.stringify(file))
        res.send(file)
    try {
        
    } catch (e) {
        res.status(500).send(e)
    }
})


app.get('/getEnglishData',async (req,res)=>{
    try{
        const contentObj = JSON.parse(fs.readFileSync("en.json"))
        res.send(contentObj)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/getRussianData',async (req,res)=>{
    try{
        const contentObj = JSON.parse(fs.readFileSync("ru.json"))
        res.send(contentObj)
    }catch(e){
        res.status(500).send(e)
    }
})





app.listen(8080, () => {
    console.log("Server run!!")
})