const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

const experienceSchema = new Schema({
    imageUrl: { type: String },
    title: { type: String },
    plan: { type: String }, //just to be able to store some more informations/explanations/ideas/details for the experience I am planning
    locations: [{ type: String }], //city or country, doesn't matter?? don't know the relation to the API at this moment, might be an ObjectId?
    comments: [], // we will update this field a bit later when we create review model
    expireDate: {
        type: String,
        default: () => moment().format('MMM Do YY')
    },
    done: {
        type: Boolean,
        default: false
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
        timestamps: true
    });

module.exports = mongoose.model("Experience", experienceSchema);
