const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Ingredient = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    origin: {type: String, default: 'unknown'},/*,
    subsitutes: [Ingredients],
    image */
    type : {type : String, enum : 
        [
            'vegetarian',
            'vegan',
            'carniste'
        ]
    }
});


module.exports = mongoose.model('Ingredient', Ingredient);