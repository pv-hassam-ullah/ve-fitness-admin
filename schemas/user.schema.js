const userSchema = {
    name: String,
    service: String,
    userbio: String,
    city: String,
    state: String,
    zipcode: Number,
    email: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    status: String
};

module.exports = userSchema