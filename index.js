const bodyParser = require("body-parser");
const express = require("express"); //import express from 'express'
const app = express();
var router = require('express').Router();

const repository = require("./src/repository");
const controller = require("./src/controller");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/phonebook/:id', controller.getContact);

app.get('/phonebook/search/:firstName', controller.searchContact);

app.get('/phonebook', controller.listContacts);

app.post('/phonebook', controller.postContact);

app.put('/phonebook/:id', controller.putContact);

app.delete('/phonebook/:id', controller.deleteContact);

//TODO ./studentname also some textboxes with a button called "save"

app.listen(3000);
console.log("Server ready...");

// GET
// POST first time creating data
// PUT editing data
// DELETE