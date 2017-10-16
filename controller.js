const repository = require("./repository");

const get = ((req, res) => {
    return repository.getContact(req.params.id).then((result) => {
        res.send(
            result.Item
        );
    })
});


module.exports = get;