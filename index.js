import express from 'express';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

//Create express app
const app = express();

//Config
dotenv.config();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

//Fetch API

const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.AIRTABLE_BASE);

async function updateImages(){
    let downloadedImages = [];
    let table = base.table("Images");
    let query = await table.select().all();
    for(let record of query){
        const url = record.fields.Image[0].url
        const name = record.fields.Name;
        console.log(url, name);
        downloadedImages.push({url, name});
    }
    return downloadedImages;
}

//Routes
app.get('/', async (req, res) => {
    res.render('index');
})

app.get('/galery', async (req, res) => {
    let downloadedImages = await updateImages();
    console.log(downloadedImages);
    res.render('galery', {images: downloadedImages});
})

app.get('/upload', async (req, res) => {
    res.render('upload');
})

app.post('/upload', async (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    console.log(name, url);
    let table = base.table("Images");
    table.create({
        Name: name,
        Image: [{url: url}]
    }, (err, record) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(record.getId());
    });
    res.redirect('/upload');
})

//Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});