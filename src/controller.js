const repository = require("./repository");

const getContact = ((req, res) => {
    return repository.getContact(req.params.id).then((result) => {
        res.send(
            result.Item
        );
    })
});

const searchContact = ((req, res) => {
    repository.searchContact(req.params.firstName).then((result) => {
        res.send(
            result.Items
        );
    })
});

const listContacts = ((req, res) => {
    repository.listContact().then((result) => {
        res.send(
            result.Items
        );
    })
});

const postContact = ((req, res) => {
    //const test = repository.addContact(req.body)
    repository.addContact(req.body).then((result) => {
        res.send({
            "statusCode": "200"
        });
    })
});

const putContact = ((req, res) => {
    repository.putContact(req.body, req.params.id).then((result) => {
        console.log('Contact edited',result);
        res.send(
            result
        );
    })
});

const deleteContact = ((req, res) => {
    repository.deleteContact(req.params.id).then((result) => {
        console.log('Contact deleted',result);
        res.send({
            "statusCode": "204"
        });
    })
});

module.exports = {
    getContact,
    searchContact,
    listContacts,
    postContact,
    putContact,
    deleteContact
};