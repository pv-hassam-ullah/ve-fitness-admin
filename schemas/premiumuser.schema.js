const premimumuserSchema = {
    firstname: String,
    last: String,
    email: String,
    phoneno: String,
    address: String,
    date: String,
    gender: String,
    zipcode: String,
    emame: String,
    ephone: String,
    eemail: String,
    apt: String,
    password: String,
    confirmpassword: String,
    bio: String,
    plan: String,
    months: String,
    gyms: Array,
    state: String,
    city: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
};

module.exports = premimumuserSchema