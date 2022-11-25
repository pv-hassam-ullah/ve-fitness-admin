const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    color1: String,
    color2: String,
    color3: String,
    color4: String
});

module.exports = colorSchema