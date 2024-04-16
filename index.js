import express from 'express';
import Airtable from 'airtable';
import dotenv from 'dotenv';

//Create express app
const app = express();

//Config
dotenv.config();
app.set('view engine', 'pug');
app.use(express.static('public'));

//Fetch API

const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.AIRTABLE_BASE);

const downloadedImages = [];

base('first').select({
    maxRecords: 30,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        const newImageObj = {
            name: record.get('Name'),
            url: record.get('Image')[0].url
        };
        downloadedImages.push(newImageObj);
    });
    fetchNextPage();
}, function done(err) {
    if (err) {
        console.error(err);
    }
});

//Routes
app.get('/', async (req, res) => {
    res.render('index');
})

app.get('/galery', async (req, res) => {
    res.render('galery', {images: downloadedImages});
})

app.get('/upload', async (req, res) => {
    res.render('upload');
})

//Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});