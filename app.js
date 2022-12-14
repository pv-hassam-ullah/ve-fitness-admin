const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const md5 = require("md5");
var fs = require('fs');
var multer = require('multer');
// var imgModel = require('./model');
// const { userInfo } = require("os");

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// CONFIGS
const configs = require('config');
const dbConfig = configs.get('development.database')
const serverConfig = configs.get('development.server')
// const paypalConfig = configs.get('development.paypal')

// DATABASE CONNECTION
const { dbService } = require('./services/db.service')
const db = new dbService()
db.connect()


app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json());

const {
    PricingInfo1,
    PricingInfo2,
    payInfo,
    PaidInfo,
    TaxInfo,
    PremumuserInfo,
    MassageInfo,
    ArrayInfo,
    EmailInfo,
    FitnessInfo,
    OtherInfo,
    AffilateInfo,
    adminInfo,
    SocialInfo,
    UserInfo,
    PromoInfo,
    PersonalTrainer,
    MoreInfo,
    color,
    imgModel,
    gymLogo,
    GymInfo,
} = require('./services/models.service')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });



app.get("/tax", function (req, res) {
    TaxInfo.find().then(result => {
        res.render("tax", { tax: result[0].tax });
    });
})
app.post("/tax", function (req, res) {
    let tax = req.body.tax;
    TaxInfo.updateOne({ $set: { tax: `${tax}` } }).then(result => {
        res.redirect("/tax");
    });

})
app.post("/addmassage", function (req, res) {
    let massage = req.body.massage;
    MassageInfo.updateOne({ $set: { massage: `${massage}` } }).then(result => {
        res.render("addemail");
    });
})
app.get("/addmassage", function (req, res) {
    res.render("addmessage");
})
app.post("/addmail", function (req, res) {
    let email = req.body.email;
    console.log(email);
    EmailInfo.updateOne({ $set: { email: `${email}` } }).then(result => {
        res.render("addemail");
    });
})
app.get("/addemail", function (req, res) {
    res.render("addemail");
})
app.get("/footer", function (req, res) {
    res.render("footer");
})
app.post("/editfoot", function (req, res) {
    let top1 = req.body.top1;
    let top2 = req.body.top2;
    let top3 = req.body.top3;

    let facebook = req.body.facebook;
    let instagram = req.body.instagram;
    let twitter = req.body.twitter;
    let pintrest = req.body.pintrest;

    let why = req.body.why;
    let training = req.body.training;
    let tip = req.body.tip;

    let app = req.body.app;

    OtherInfo.updateOne({ $set: { app: `${app}` } }).then(result => {
        FitnessInfo.updateOne({ $set: { why: `${why}`, training: `${training}`, tip: `${tip}` } }).then(result => {
            SocialInfo.updateOne({ $set: { facebook: `${facebook}`, instagram: `${instagram}`, twitter: `${twitter}`, pintrest: `${pintrest}` } }).then(result => {
                AffilateInfo.updateOne({ $set: { top1: `${top1}`, top2: `${top2}`, top3: `${top3}` } }).then(result => {
                    res.render("footer");
                });
            });
        });
    });
})

app.get("/gyms", function (req, res) {
    // let newmassage = new MassageInfo({
    //     massage : "Welcome "
    // })
    // newmassage.save();
    GymInfo.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('admin', { item: items });
        }
    });
});

//ADD GYMS
app.post('/addgyms', upload.single('image'), (req, res, next) => {
    console.log('req.body -> ', req.body);

    let plan2Obj = req.body.plan2
    let plan2Array = plan2Obj.split(",")
    console.log('plan2Array -> ', plan2Array)
    var obj = {
        title1: req.body.title1,
        title2: req.body.title2,
        title3: req.body.title3,
        title4: req.body.title4,
        gymname: req.body.gymname,
        plan: req.body.plan,
        plan2: plan2Array,
        price: req.body.price,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    GymInfo.create(obj, (err, item) => {
        if (err) {
            console.log(`error line 190-> `, err);
        }
        else {
            // item.save();
            console.log('saved new gym -> ', item.plan2)
            res.redirect('/addgyms');
        }
    });
});


app.post("/color", function (req, res) {
    let color1 = req.body.color1;
    let color2 = req.body.color2;
    let color3 = req.body.color3;
    let color4 = req.body.color4;

    color.updateOne({ $set: { color1: `${color1}`, color2: `${color2}`, color3: `${color3}`, color4: `${color4}` } }).then(result => {
        console.log(result);
    });
    res.redirect("/color");
});
app.get("/color", function (req, res) {
    res.render("color");
})

app.get('/addgymlogo', (req, res) => {
    gymLogo.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('addgymlogo', { items: items });
        }
    });
});

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT ->', reader.result)
    }
    reader.readAsDataURL(file);
}

app.post('/uploadgymlogo', upload.single('image'), (req, res, next) => {
    const file = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
    encodeImageFileAsURL(file)
    var obj = {
        firsttitle: req.body.firsttitle,
        secondtitle: req.body.secondtitle,
        thirdtitle: req.body.thirdtitle,
        fourthtitle: req.body.fourthtitle,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(req.file.filename);
    gymLogo.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/addgymlogo');
        }
    });
});

app.get('/upload', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagePage', { items: items });
        }
    });
});
// "img": {
//     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//     contentType: 'image/png'
// }
app.post("/up", upload.single('image'), function (req, res) {
    imgModel.updateMany({ firstname: "Empire Gaming" }, {
        $set:
        {
            "img": ""
        }
    }).then(result => {
        console.log(result);
    })
})
app.get("/up", function (req, res) {
    res.render("aademo")
})
app.post('/upload', upload.single('image'), (req, res, next) => {

    imgModel.updateOne({ _id: "6358d274401a0183d4ef82bd" },
        {
            $set:
            {
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
        }).then(result => {
            console.log(result);
        });
    res.redirect("/moreinfo");
    // var obj = {
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     firsttitle: req.body.firsttitle,
    //     secondtitle: req.body.secondtitle,
    //     thirdtitle: req.body.thirdtitle,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
    // imgModel.create(obj, (err, item) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         // item.save();
    //         res.redirect('/upload');
    //     }
    // });
});



app.post("/moreinfo", function (req, res) {
    let name = req.body.username;
    let password = req.body.adminpassword;
    console.log(name);
    console.log(password);
    adminInfo.find().then(result => {
        console.log(result);
        for (var i = 0; i < 1; i++) {
            if (password == result[i].password && name == result[i].username) {
                let newinfo = new MoreInfo({
                    title: req.body.title,
                    title1: req.body.title1,
                    title2: req.body.title2,
                    title3: req.body.title3,
                    title4: req.body.title4,
                })
                newinfo.save();
            }
            res.redirect("/moreinfo");
        }
    }).catch(err => console.log(err));
})
app.post("/addpersonaltrainer", function (req, res) {
    let name = req.body.username;
    let password = req.body.adminpassword;
    console.log(name);
    console.log(password);
    adminInfo.find().then(result => {
        console.log(result);
        for (var i = 0; i < 1; i++) {
            if (password == result[i].password && name == result[i].username) {
                let newtrainer = new PersonalTrainer({
                    trainername: req.body.trainername,
                    trainerbio: req.body.trainerbio
                })
                newtrainer.save();
            }
            res.redirect("/addpersonaltrainer");
        }
    }).catch(err => console.log(err));
})

app.post("/addbusiness", function (req, res) {
    let name = req.body.username;
    let password = req.body.adminpassword;
    adminInfo.find().then(result => {
        console.log(result);
        for (var i = 0; i < 1; i++) {
            if (password == result[i].password && name == result[i].username) {
                let newbusiness = new BusinessInfo({
                    businessname: req.body.businessname,
                    bio: req.body.bio
                })
                newbusiness.save();
            }
            res.redirect("/addbusiness");
        }
    }).catch(err => console.log(err));
})

app.post("/addusers", function (req, res) {
    let name = req.body.username;
    let password = req.body.adminpassword;
    adminInfo.find().then(result => {
        console.log(result);
        for (var i = 0; i < 1; i++) {
            if (password == result[i].password && name == result[i].username) {
                let newuser = new UserInfo({
                    name: req.body.username,
                    service: req.body.service,
                    userbio: req.body.userbio,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zip,
                    image: req.body.gymimg
                })

                newuser.save();
            }
            res.redirect("/addusers");
        }
    }).catch(err => console.log(err));
})

// app.post("/addusers",function(req, res){
//     let name = req.body.username;
//     let password = req.body.adminpassword;
//     adminInfo.find().then(result =>{
//         console.log(result);
//         for(var i=0; i<1; i++) {
//                 if(password == result[i].password && name == result[i].username){
//                     let newuser = new UserInfo({
//                         name : req.body.username,
//                         service: req.body.service
//                     })
//                     newuser.save();
//             }
//             res.redirect("/addusers");
//         }
//     }).catch(err => console.log(err));
// })




app.get("/addpromo", function (req, res) {
    res.render("addpromo");
})

app.get("/personaltrainer", function (req, res) {
    PersonalTrainer.find().then(result => {
        res.render('personaltrainer', { item: result });
    }).catch(err => console.log(err));
})

app.get("/businessdetails", function (req, res) {
    // GymInfo.find({}, function(err, foundItems){
    //         return foundItems;
    //     });
    BusinessInfo.find().then(result => {
        // console.log(result);
        res.render('businessdetails', { item: result });
    }).catch(err => console.log(err));
})

app.get("/users", function (req, res) {
    // GymInfo.find({}, function(err, foundItems){
    //         return foundItems;
    //     });
    UserInfo.find().then(result => {
        res.render('usersdetails', { item: result });
    }).catch(err => console.log(err));
})

app.get("/addusers", function (req, res) {
    res.render('userform');
})
app.get("/login", function (req, res) {
    res.render("login");
})
app.get("/moreinfo", function (req, res) {
    MoreInfo.find().then(result => {
        console.log(result);
        res.render("moreinfo", { item: result });
    }).catch(err => console.log(err));
})


app.post("/addpromo", function (req, res) {
    let codee = req.body.code;
    let valuee = req.body.value;
    let passwordd = req.body.adminpassword;
    let namee = req.body.username;

    console.log(req.body.adminpassword);
    console.log(namee);
    console.log(req.body.code);
    console.log(valuee);

    adminInfo.find().then(result => {
        console.log(result);
        for (var i = 0; i < 1; i++) {
            console.log(result[i].password);
            console.log(result[i].username);

            // if(passwordd == result[i].password && namee == result[i].username){
            if (true) {
                console.log("YES");
                let newpromo = new PromoInfo({
                    promocode: codee,
                    value: valuee
                })

                newpromo.save();
            }
            res.redirect("/addpromo");
        }
    }).catch(err => console.log(err));

})
app.post("/login", async function (req, res) {
    let email = req.body.email;
    let password = md5(req.body.password);
    Id.find({}, function (err, foundItems) {
        let page = 0;
        for (var i = 0; i < foundItems.length; i++) {
            // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
            if ((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")) {

                page++;
                console.log(page);
                break;
            }
        }
        if (page >= 1) {
            // res.redirect(`/index?name=${email}`)
            res.redirect("/index");
        }
        else {
            res.redirect("/login");
        }
    });
})

app.post("/signup", function (req, res) {
    let newId = new Id({
        firstName: `${req.body.firstname}`,
        lastName: `${req.body.lastname}`,
        email: `${req.body.email}`,
        screenName: `${req.body.screenname}`,
        password: md5(req.body.password),
        confirmPassword: md5(req.body.confirmpassword),
        dateOfBirth: req.body.bday,
        zipCode: req.body.zipcode,
        gender: "male"
    })
    if (md5(req.body.password) === md5(req.body.confirmpassword)) {
        newId.save();
    }
    res.redirect("/login");
})

app.post("/login", async function (req, res) {
    let email = req.body.email;
    let password = md5(req.body.password);
    Id.find({}, function (err, foundItems) {

        let page = 0;
        for (var i = 0; i < foundItems.length; i++) {
            // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
            if ((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")) {
                page++;
                console.log(page);
                break;
            }
        }
        if (page >= 1) {
            // res.redirect(`/index?name=${email}`)
            res.redirect("/index");
        }
        else {
            res.redirect("/login");
        }
    });
})

app.post("/filtersearch", function (req, res) {

    console.log('req.body', req.body)
    const filters = {
        all: req.body.all, //all checkbox
        economical: req.body.economical, //150 checkbox
        premium: req.body.premium, //500 checkbox
        economical1: req.body.economical1, // economical checkbox
        premium1: req.body.premimum1 //premium checkbox
    }

    // ALL GYMS
    if (filters.all == 'on' || (filters.economical == 'on' && filters.preimum == 'on')) {
        console.log(`filters.all == 'on' || (filters.economical == 'on' && filters.preimum == 'on')`)
        GymInfo.find().then(result => {
            console.log('gyms found: ', result.length)
            res.render('admin', { item: result, type: "gyms" });
        }).catch(err => console.log(err));
        return
    }

    else {
        if (filters.economical == 'on') {
            if (filters.economical1 != 'on' && filters.premium1 != 'on') {
                console.log(`filters.economical == 'on' -> filters.economical1 != 'on' && filters.premium1 != 'on'`)
                GymInfo.find({ price: { $lte: 150 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            if (filters.economical1 == 'on') {
                console.log(`filters.economical == 'on' -> filters.economical1 == 'on'`)
                GymInfo.find({ plan2: { $in: ['Economical'] }, price: { $lte: 150 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            if (filters.premium1 == 'on') {
                console.log(`filters.economical == 'on' -> filters.economical1 == 'on'`)
                GymInfo.find({ plan2: { $in: ['Premium'] }, price: { $gte: 150, $lte: 500 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            return
        }
        else if (filters.premium == 'on') {
            if (filters.economical1 != 'on' && filters.premium1 != 'on') {
                console.log(`filters.premium == 'on' -> filters.economical1 != 'on' && filters.premium1 != 'on'`)
                GymInfo.find({ price: { $lte: 500 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            if (filters.economical1 == 'on') {
                console.log(`filters.premium == 'on' -> filters.economical1 == 'on'`)
                GymInfo.find({ plan2: { $in: ['Economical'] }, price: { $lte: 150 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            if (filters.premium1 == 'on') {
                console.log(`filters.premium == 'on' -> filters.premium1 == 'on'`)
                GymInfo.find({ plan2: { $in: ['Premium'] }, price: { $lte: 500 } }).then(result => {
                    console.log('gyms found: ', result.length)
                    res.render('admin', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
                return
            }
            return
        }
    }

    // if (all == 'on' || (economical == 'on' && premimum == 'on')) {
    //     GymInfo.find().then(result => {
    //         res.render('admin', { item: result, type: "gyms" });
    //     }).catch(err => console.log(err));
    // }
    // else {
    //     if (economical == 'on') {
    //         if (economical1 == 'on') {
    //             GymInfo.find({ discountprice: { $lte: 50 } }).then(result => {
    //                 res.render('admin', { item: result, type: "gyms" });
    //             }).catch(err => console.log(err));
    //         }
    //         if (premimum1 == 'on') {
    //             GymInfo.find({ discountprice: { $lte: 150, $gt: 50 } }).then(result => {
    //                 res.render('admin', { item: result, type: "gyms" });
    //             }).catch(err => console.log(err));
    //         }
    //         GymInfo.find({ discountprice: { $lte: 100 } }).then(result => {
    //             res.render('admin', { item: result, type: "gyms" });
    //         }).catch(err => console.log(err));
    //     }
    //     else {
    //         if (premimum == 'on') {
    //             if (economical1 == "on") {
    //                 GymInfo.find({ discountprice: { $lte: 300, $gt: 150 } }).then(result => {
    //                     res.render('admin', { item: result, type: "gyms" });
    //                 }).catch(err => console.log(err));
    //             }
    //             if (premimum1 == 'on') {
    //                 GymInfo.find({ discountprice: { $lte: 501, $gt: 300 } }).then(result => {
    //                     res.render('admin', { item: result, type: "gyms" });
    //                 }).catch(err => console.log(err));
    //             }
    //         }
    //         GymInfo.find({ discountprice: { $lte: 300, $gt: 100 } }).then(result => {
    //             res.render('admin', { item: result, type: "gyms" });
    //         }).catch(err => console.log(err));
    //     }
    // }
})


app.post("/filterusers", function (req, res) {
    let all = req.body.all;
    let m = req.body.msg;
    let t = req.body.train;
    // console.log(all);
    if (all == 'on' || (m == 'on' && t == 'on')) {
        UserInfo.find().then(result => {
            // console.log(result);

            res.render('usersdetails', { item: result });
        }).catch(err => console.log(err));
    }
    else {
        // console.log(m);
        if (m == 'on') {
            UserInfo.find({ service: 'Message' }).then(result => {
                console.log(result);
                res.render('usersdetails', { item: result, type: "gyms" });
            }).catch(err => console.log(err));
        }
        else {
            console.log(t);
            if (t == 'on') {
                UserInfo.find({ service: 'Training' }).then(result => {
                    console.log(result);
                    res.render('usersdetails', { item: result, type: "gyms" });
                }).catch(err => console.log(err));
            }
        }
    }
})


app.post("/editmoreinfo", function (req, res) {
    let editid = req.body.changeid;
    let titlee = req.body.title;
    let diss = req.body.dis;
    console.log(editid);
    MoreInfo.updateOne({ _id: editid }, { $set: { title: `${titlee}`, dis: `${diss}` } }).then(result => {
        console.log(result);
    });
    res.redirect("/moreinfo");
})
app.post("/editgyms", function (req, res) {
    let editid = req.body.changeid;
    let pricee = req.body.price;
    let title2 = req.body.title2;
    let title3 = req.body.title3;
    let gymnamee = req.body.title1;
    let discountpricee = req.body.discountprice;
    let statee = req.body.state;
    let cityy = req.body.city;
    let zipcodee = req.body.zipcode;
    let title4 = req.body.title4;
    let price = req.body.price;
    let plan = req.body.plan;
    let plan2 = req.body.plan2;

    console.log(editid);
    GymInfo.updateOne({ _id: editid },
        {
            $set: {
                title1: `${gymnamee}`,
                title2: title2,
                title3: title3,
                title4: title4,
                price: price,
                plan: plan,
                plan2: plan2
            }
        }).then(result => {
            console.log(result);
        });
    res.redirect("/gyms");
})
app.post("/editpersonaltrainer", function (req, res) {
    let editid = req.body.changeid;
    let trainernamee = req.body.trainername;
    console.log(editid);
    PersonalTrainer.updateOne({ _id: editid }, { $set: { trainername: `${trainernamee}` } }).then(result => {
        console.log(result);
    });
    res.redirect("/personaltrainer");
})
app.post("/gymschange", function (req, res) {
    console.log("thten");
    console.log(req.body.tenth);
    PricingInfo1.updateMany({
        $set:
        {
            first: req.body.first,
            second: req.body.second,
            third: req.body.third,
            forth: req.body.forth,
            fifth: req.body.fifth,
            sixth: req.body.sixth,
            seventh: req.body.seventh,
            eightth: req.body.eightth,
            nineth: req.body.nineth,
            tenth: req.body.tenth
        }
    }).then(ecogyms => {
        PricingInfo2.updateMany({
            $set:
            {
                first: req.body.firstp,
                second: req.body.secondp,
                third: req.body.thirdp,
                forth: req.body.forthp,
                fifth: req.body.fifthp,
                sixth: req.body.sixthp,
                seventh: req.body.seventhp,
                eightth: req.body.eightthp,
                nineth: req.body.ninethp,
                tenth: req.body.tenthp
            }
        }).then(pregyms => {
            PricingInfo1.find().then(ecogyms => {
                PricingInfo2.find().then(pregyms => {
                    res.render("pricinggyms", { ecogyms: ecogyms[0], pregyms: pregyms[0] });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
            // res.render("pricinggyms",{ecogyms:ecogyms[0],pregyms:pregyms[0]/
        })
    })
})
app.get("/pricinggyms", function (req, res) {
    PricingInfo1.find().then(ecogyms => {
        PricingInfo2.find().then(pregyms => {
            res.render("pricinggyms", { ecogyms: ecogyms[0], pregyms: pregyms[0] });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})
app.post("/editbusiness", function (req, res) {
    let editid = req.body.changeid;
    let businessnamee = req.body.businessname;
    let trainerbio = req.body.trainerbio;
    console.log(editid);
    BusinessInfo.updateOne({ _id: editid }, { $set: { businessname: `${businessnamee}` } }).then(result => {
        console.log(result);
    });
    res.redirect("/businessdetails");
})

app.post("/editusers", function (req, res) {
    let editid = req.body.changeid;
    let usernamee = req.body.username;
    console.log(editid);
    UserInfo.updateOne({ _id: editid }, { $set: { name: `${usernamee}` } }).then(result => {
        console.log(result);
    });
    res.redirect("/usersdetails");
})

app.post("/searchbyname", function (req, res) {
    let name = req.body.username;
    UserInfo.find({ trainername: `${name}` }).then(result => {
        res.render('usersdetails', { item: result });
    }).catch(err => console.log(err));
})
app.post("/searchbycity", function (req, res) {
    let name = req.body.usercity;
    UserInfo.find({ city: `${name}` }).then(result => {
        res.render('usersdetails', { item: result });
    }).catch(err => console.log(err));
})
app.post("/searchbystate", function (req, res) {
    let name = req.body.userstate;
    UserInfo.find({ state: `${name}` }).then(result => {
        res.render('usersdetails', { item: result });
    }).catch(err => console.log(err));
})
app.post("/searchbyzip", function (req, res) {
    let name = req.body.userzip;
    UserInfo.find({ zipcode: `${name}` }).then(result => {
        res.render('usersdetails', { item: result });
    }).catch(err => console.log(err));
})





app.post("/changeadmin", function (req, res) {
    let newusername = req.body.newusername;
    let newpassword = req.body.newpassword;
    let confirmpassword = req.body.confirmpassword;
    console.log(newpassword);
    console.log(confirmpassword);

    if (newpassword == confirmpassword) {
        adminInfo.updateOne({ id: 'admin' }, { $set: { password: `${newpassword}` } }).then(result => {
            console.log(result);
        });
        adminInfo.updateOne({ id: 'admin' }, { $set: { username: `${newusername}` } }).then(result => {
            console.log(result);
        });
    }
    GymInfo.find().then(result => {
        res.render('admin', { item: result, type: "gyms" });
    }).catch(err => console.log(err));
})




app.post("/setmax", function (req, res) {
    let maxeco = req.body.ecovalue;
    let maxpre = req.body.prevalue;

    adminInfo.updateOne({ $set: { less: `${maxeco}` } }).then(result => {
        console.log(result);
        adminInfo.updateOne({ $set: { large: `${maxpre}` } }).then(result => {
            console.log(result);
            res.render("setmax");
        });
    });
})

app.get("/email", function (req, res) {
    UserInfo.find().then(result => {
        res.render('email', { item: result });
    }).catch(err => console.log(err));
})
app.get("/setmax", function (req, res) {
    res.render("setmax");
})
app.get("/changeadmin", function (req, res) {
    res.render('changeadmin');
})
app.get("/addpersonaltrainer", function (req, res) {
    res.render('addpersonaltrainer');
})
app.get("/addbusiness", function (req, res) {
    res.render('addbusiness');
})
app.get("/forms", function (req, res) {
    res.render("forms");
})
app.get("/", function (req, res) {
    res.render("login");
})
app.get("/signup", function (req, res) {
    res.render("signup");
})
app.get("/admin", function (req, res) {
    res.render("admin");
})
app.get("/addgyms", function (req, res) {
    res.render("forms");
})
app.get("/graph", function (req, res) {
    res.render('graph')
})

app.listen(serverConfig.port, function () {
    console.log(`Server started on ${serverConfig.host}:${serverConfig.port}`);
})