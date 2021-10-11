const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: { type: String, required: true },
    sexo: { type: String, required: true },
    idade: { type: Number, required: true },
    hobby: { type: String },
    datanascimento: { type: Date, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('developers', schema);