const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id :{
        type:Number,
        required:true
    },
    titre:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    prix:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    rating: {
        type: Object,
        required: false
    }
});

module.exports = Item = mongoose.model('produit' , ItemSchema);