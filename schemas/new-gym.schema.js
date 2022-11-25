const mongoose = require('mongoose')

const newgymSchema = new mongoose.Schema({
    name: String,
    desc: String,
    gymname: String,
    title: String,
    firsttitle: String,
    secondtitle: String,
    thirdtitle: String,
    fourthtitle: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = newgymSchema