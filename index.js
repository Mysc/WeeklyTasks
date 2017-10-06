const bodyParser = require("body-parser");
const express = require("express"); //import express from 'express'
const app = express();
const repository = require("./repository");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/phonebook/:id', function(req, res) { //request, response
    repository.getContact(req.params.id).then((result) => {
        res.send(
            result.Item
        );
    })
});

app.get('/phonebook/search/:firstName', function(req, res) {
    repository.searchContact(req.params.firstName).then((result) => {
        console.log("HELLOWORLD")
        res.send(
            result.Item
        );
    })
});

app.post('/phonebook', (req, res) => {
    //const test = repository.addContact(req.body)
    repository.addContact(req.body).then((result) => {
        res.send({
            "statusCode": "200"
        });
    })
});

app.put('/phonebook/:id', (req, res) => {
    repository.putContact(req.body, req.params.id).then((result) => {
        console.log('Contact edited',result);
        res.send(
            result
        );
    })
});

app.delete('/phonebook/:id', (req, res) => {
    repository.deleteContact(req.params.id).then((result) => {
        console.log('Contact deleted',result);
        res.send({
            "statusCode": "204"
        });
    })
});


//TODO ./studentname also some textboxes with a button called "save"

app.listen(3000);
console.log("Server ready...");

// GET
// POST first time creating data
// PUT editing data
// DELETE