const mongoose = require("mongoose");

// SCHEMAS
const Pricing1Schema = require('../schemas/pricing1.schema')
const Pricing2Schema = require('../schemas/pricing2.schema')
const paySchema = require('../schemas/pay.schema')
const paidSchema = require('../schemas/paid.schema')
const taxSchema = require('../schemas/tax.schema')
const premimumuserSchema = require('../schemas/premiumuser.schema')
const arrySchema = require('../schemas/array.schema')
const massageSchema = require('../schemas/massage.schema')
const emailSchema = require('../schemas/email.schema')
const otherSchema = require('../schemas/other.schema')
const fitnessSchema = require('../schemas/fitness.schema')
const affilateSchema = require('../schemas/affilate.schema')
const adminSchema = require('../schemas/admin.schema')
const socialSchema = require('../schemas/social.schema')
const userSchema = require('../schemas/user.schema')
const promoSchema = require('../schemas/promo.schema')
const moreSchema = require('../schemas/more.schema')
const colorSchema = require('../schemas/color.schema')
const imageSchema = require('../schemas/image.schema')
const gymlogoSchema = require('../schemas/gym-logo.schema')
const gymSchema = require('../schemas/gym.schema')
const personalSchema = require('../schemas/personal.schema')

// MODELS
const PricingInfo1 = mongoose.model("PricingInfo1", Pricing1Schema);
const PricingInfo2 = mongoose.model("PricingInfo2", Pricing2Schema);
const payInfo = mongoose.model("payInfo", paySchema);
const PaidInfo = mongoose.model("PaidInfo", paidSchema);
const TaxInfo = mongoose.model("TaxInfo", taxSchema);
const PremumuserInfo = mongoose.model("PremumuserInfo", premimumuserSchema);
const ArrayInfo = mongoose.model("ArrayInfo", arrySchema);
const MassageInfo = mongoose.model("MassageInfo", massageSchema);
const EmailInfo = mongoose.model("EmailInfo", emailSchema);
const OtherInfo = mongoose.model("OtherInfo", otherSchema);
const FitnessInfo = mongoose.model("FitnessInfo", fitnessSchema);
const AffilateInfo = mongoose.model("AffilateInfo", affilateSchema);
const adminInfo = mongoose.model("adminInfo", adminSchema);
const SocialInfo = mongoose.model("SocialInfo", socialSchema);
const UserInfo = mongoose.model("UserInfo", userSchema);
const PromoInfo = mongoose.model("PromoInfo", promoSchema);
const PersonalTrainer = mongoose.model("PersonalTrainer", personalSchema);
const MoreInfo = mongoose.model("MoreInfo", moreSchema);
const color = mongoose.model("color", colorSchema);
const imgModel = mongoose.model("imgModel", imageSchema);
const gymLogo = mongoose.model("gymLogo", gymlogoSchema);
const GymInfo = mongoose.model("GymInfo", gymSchema);

module.exports = {
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
}