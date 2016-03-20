var RedeemableRequests = require('./lib/redeemable.requests')

module.exports = [{
  method: 'GET',
  path: '/api/redeemables',
  handler: RedeemableRequests.findAllRedeemables
},{
  method: 'POST',
  path: '/api/redeemables',
  handler: RedeemableRequests.saveRedeemable
},{
  method: 'GET',
  path: '/api/redeemables/{code}',
  handler: RedeemableRequests.findRedeemable
},{
  method: 'PATCH',
  path: '/api/redeemables/{code}',
  handler: RedeemableRequests.updateRedeemable
},{
  method: 'DELETE',
  path: '/api/redeemables/{code}',
  handler: RedeemableRequests.deleteRedeemable
}];
