const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ingridients:{
        type: Array,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    // image:{
    //     type:Buffer,
    //     required: true
    // },
    qty:{
        type:Number,
        required: true
    },
    price:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('menuItem', menuItemsSchema, 'items');