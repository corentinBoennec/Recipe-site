const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Recipe = new Schema({
    name: {type: String, required : true, unique : true},
    description: {type: String},
    origin: {type: String, default: 'unknown'},
    //components: [{ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}, quantity: String, unit: String}],
    ingredients: [
        {
            name: {type: String},
            quantity : {type: String},
            unit : {type : String}
        }
    ],
    nbEaters: Number,
    //tools: [String]
    steps: [String /*, image: */],
    additionalNoteFromAutor: String,
    author: String,
    imgUrl: String
});





module.exports = mongoose.model('Recipe', Recipe);





