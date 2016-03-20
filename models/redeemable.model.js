var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var redeemableSchema = new Schema({
 code_gen: {type:String, unique: true},
 assigned_specs: [String],
 status: String,
 redeem_date: Date,
 expiration_date: Date
});

var Redeemable = mongoose.model('Redeemable', redeemableSchema);

module.exports = Redeemable;
