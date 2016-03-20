var Mongoose = require('mongoose');
var Moment = require('moment');
var Boom = require('boom');

var Codegen = require('./../lib/codegen');

module.exports.findAllRedeemables = function(request, reply) {
  var redeemables = Mongoose.models.Redeemable.find({});
  redeemables.exec(function(err, docs) {
    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  })
}

module.exports.saveRedeemable = function(request, reply) {
  var pay = request.payload;

  if (typeof pay.assigned_specs != 'undefined') {
    createRedeemable = {};
    createRedeemable.assigned_specs = [].concat(pay.assigned_specs);
    createRedeemable.code_gen = Codegen(7);

    createRedeemable.status = 'available';

    // Set expiration date
    if (typeof pay.expiration != 'undefined') {
      var now = new Date();
      var expirationDate = Moment(now);
      if (typeof pay.expiration.months != 'undefined' && typeof pay.expiration.months == 'number') {
        expirationDate.add(pay.expiration.months, 'months');
      }
      if (typeof pay.expiration.days != 'undefined' && typeof pay.expiration.days == 'number') {
        expirationDate.add(pay.expiration.days, 'days');
      }
      if (typeof pay.expiration.hours != 'undefined' && typeof pay.expiration.hours == 'number') {
        expirationDate.add(pay.expiration.hours, 'hours');
      }
      if (expirationDate != Moment(now)) {
        createRedeemable.expiration_date = expirationDate.toDate();
      }
    }

    processRedeemable();

    function processRedeemable() {
      var redeemable = new Mongoose.models.Redeemable(createRedeemable);
      redeemable.save(function(err, resp) {
        if (!err) {
          return reply(resp.code_gen);
        } else {
          if (err.code == 11000) {
            createRedeemable.code_gen = Codegen(7);
            processRedeemable();
          } else {
            return reply(err);
          }
        }
      });
    }
  } else {
    // no assigned_specs in payload
    return reply(Boom.badRequest('not enough data'));
  }
}

module.exports.findRedeemable = function(request, reply) {
  var par = request.params;
  var redeemable = Mongoose.models.Redeemable.findOne({
    code_gen: par.code
  });
  redeemable.exec(function(err, doc) {
    if (!err) {
      // console.log(Moment());
      if (typeof doc.expiration_date == 'undefined' && doc.status == 'available') {
        doc.status = 'redeemed';
        doc.save(function(errSave, doc) {});
        return reply(doc.assigned_specs);
      } else if(typeof doc.expiration_date != 'undefined' && Moment(doc.expiration_date) > Moment() && doc.status == 'available') {
        doc.status = 'redeemed';
        doc.save(function(errSave, doc) {});
        return reply(doc.assigned_specs);
      }else if(typeof doc.expiration_date != 'undefined' && Moment(doc.expiration_date) <= Moment()) {
        doc.status = 'expired';
        doc.save(function(errSave, doc) {});
        return reply(Boom.badRequest('code expired'));
      } else {
        return reply(Boom.badRequest('code not found'));
      }
    } else {
      return reply(err);
    }
  })
}

module.exports.updateRedeemable = function(request, reply) {
  var par = request.params;
  var pay = request.payload;
  var updateRedeemable = {};
  // update status
  if (typeof pay.status != 'undefined') {
    updateRedeemable.status = pay.status;
  }
  // update expiration date
  if (typeof pay.expiration != 'undefined') {
    var now = new Date();
    var expirationDate = Moment(now);
    if (typeof pay.expiration.months != 'undefined' && typeof pay.expiration.months == 'number') {
      expirationDate.add(pay.expiration.months, 'months');
    }
    if (typeof pay.expiration.days != 'undefined' && typeof pay.expiration.days == 'number') {
      expirationDate.add(pay.expiration.days, 'days');
    }
    if (typeof pay.expiration.hours != 'undefined' && typeof pay.expiration.hours == 'number') {
      expirationDate.add(pay.expiration.hours, 'hours');
    }
    if (expirationDate != Moment(now)) {
      updateRedeemable.expiration_date = expirationDate.toDate();
    }
  }
}

module.exports.deleteRedeemable = function(request, reply) {};
