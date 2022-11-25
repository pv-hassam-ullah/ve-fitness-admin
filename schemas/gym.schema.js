const gymSchema = {
    title1: String,
    title2: String,
    title3: String,
    title4: String,
    gymname: String,
    price: Number,
    gymbio: String,
    discountprice: Number,
    state: String,
    city: String,
    zipcode: Number,
    plan: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
};

module.exports = gymSchema