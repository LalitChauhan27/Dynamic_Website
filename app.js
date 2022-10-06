const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactWeb', {useNewUrlParser:true});
const port = 3000;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String
  });

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res)=>{
    res.render("index.pug");
})

app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Data was not saved to the database");
    });
})

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
});