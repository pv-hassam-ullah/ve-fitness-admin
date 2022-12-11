'use strict'

const mongoose = require("mongoose");

const {
    PricingInfo1,
    PricingInfo2,
    FitnessInfo,
    AffilateInfo,
    SocialInfo,
    UserInfo,
    MoreInfo,
    GymInfo,
    gymLogo,
    imgModel,
    OtherInfo,
    adminInfo,
    TaxInfo
} = require('../services/models.service')

// DEFAULT DATA
const MORE_INFOS = require("../data/more-infos");
const FITNESS_INFOS = require("../data/fitness-infos");
const AFFILATE_INFOS = require("../data/affilate-infos");
const PRICING_INFOS_1 = require("../data/pricing1-infos")
const PRICING_INFOS_2 = require("../data/pricing2-infos")
const SOCIAL_INFOS = require("../data/social-infos");
const GYM_INFOS = require("../data/gym-infos");
const USER_INFOS = require("../data/user-infos");
const GYM_LOGOS_INFOS = require("../data/gym-logos-infos");
const IMAGE_INFOS = require("../data/image-infos");
const OTHER_INFOS = require("../data/other-infos");
const ADMIN_INFOS = require("../data/admin-infos");
const TAX_INFOS = require("../data/tax-infos");

const configs = require('config');
const dbConfig = configs.get('development.database')

class dbService {

    constructor() {
        this.connect = function () {
            // CHANGE :
            // LOCAL DB: localhost:27017
            // REMOTE DB: 147.182.249.106:27017

            mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`, {
                auth: {
                    username: dbConfig.username,
                    password: dbConfig.password,
                },
                authSource: "admin",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
                .then(() => {
                    console.log(`Successfully connect to MongoDB -> ${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`);
                    this.initial()
                })
        }

        this.initial = function () {

            TaxInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    TAX_INFOS.forEach((element) => {
                        const row = new TaxInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'tax' to TaxInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            adminInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    ADMIN_INFOS.forEach((element) => {
                        const row = new adminInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'admin' to adminInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            OtherInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    OTHER_INFOS.forEach((element) => {
                        const row = new OtherInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'other' to OtherInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            imgModel.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    IMAGE_INFOS.forEach((element) => {
                        const row = new imgModel(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'image' to imgModel collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            gymLogo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    GYM_LOGOS_INFOS.forEach((element) => {
                        const row = new gymLogo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'gymLogo' to GymLogo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            UserInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    USER_INFOS.forEach((element) => {
                        const row = new UserInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'userInfo' to UserInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            GymInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    GYM_INFOS.forEach((element) => {
                        const row = new GymInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'gymInfo' to GymInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${error}`)
                            })
                    })
                }
            });

            SocialInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    SOCIAL_INFOS.forEach((element) => {
                        const row = new SocialInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'socialInfo' to SocialInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });

            MoreInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    MORE_INFOS.forEach((element) => {
                        const row = new MoreInfo(element)
                        row.save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'moreInfo' to MoreInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });

            FitnessInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    FITNESS_INFOS.forEach((element) => {
                        const row = new FitnessInfo(element)
                        row
                            .save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'fitnessInfo' to FitnessInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });

            AffilateInfo.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    AFFILATE_INFOS.forEach((element) => {
                        const row = new AffilateInfo(element)
                        row
                            .save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'athleteInfo' to AthleteInfo collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });

            PricingInfo1.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    PRICING_INFOS_1.forEach((element) => {
                        const row = new PricingInfo1(element)
                        row
                            .save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'pricingInfo' to PricingInfo1 collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });

            PricingInfo2.estimatedDocumentCount((err, count) => {
                if (!err && count === 0) {
                    PRICING_INFOS_2.forEach((element) => {
                        const row = new PricingInfo2(element)
                        row
                            .save()
                            .then((doc) => {
                                if (doc) {
                                    console.log("added 'pricingInfo' to PricingInfo2 collection");
                                }
                            })
                            .catch((error) => {
                                console.log(`error adding ${element}`)
                            })
                    })
                }
            });
        }
    }
}

module.exports = {
    dbService
};