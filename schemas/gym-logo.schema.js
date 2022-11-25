const mongoose = require('mongoose')

const gymlogoSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = gymlogoSchema