const AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');
const _ = require('lodash')

AWS.config.update({
    region: "ap-southeast-2",
});

function addContact(contact){
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    params = {
        TableName:"PhoneBook",
        Item:{ //whole row
            "id": uuidv4(),
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "phoneNumber": contact.phoneNumber,
            "instrument": contact.instrument,
        }
    };
    return dynamodb.put(params).promise()
}

function putContact(contact, id){
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("Working fine");
    let currentContact = {};
    return getContact(id).then(result => {
        console.log('**** result', Object.keys(result).length)
        if(Object.keys(result).length != 0){
            params = {
                TableName:"PhoneBook",
                Item:{
                    "id": id,
                    "firstName":contact.firstName,
                    "lastName": contact.lastName,
                    "phoneNumber": contact.phoneNumber,
                    "instrument": contact.instrument
                }
            };
            console.log('**** params', params)
            dynamodb.put(params).promise()
            return { // show info to reader
                "status": 200,
                "data": params.Item
            }
        } else {
            console.log('**** err')
            const err = new Error('Item Not Found');
            return {
                "status": 404,
                "error": err.message
            }
        }

    });
}

function deleteContact(id){
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    params = {
        TableName:"PhoneBook",
        Key:{
            "id": id
        }
    }
    return dynamodb.delete(params).promise()
}

function getContact(id){
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    params = {
        TableName:"PhoneBook",
        Key:{
            "id": id
        }
    }
    return dynamodb.get(params).promise()
}

function searchContact(query){
    console.log(query);
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    params = {
        TableName:"PhoneBook",
        IndexName:"id",
        KeyConditionExpression: "firstName = :a",
        ExpressionAttributeValues: {
            ":a": query
        },
    };
    return dynamodb.scan(params).promise()
}

module.exports = {
    addContact,
    getContact,
    putContact,
    deleteContact,
    searchContact
};