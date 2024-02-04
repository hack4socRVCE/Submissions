// 2_deploy_contracts.js
const DonationTracker = artifacts.require("DonationTracker");


module.exports = function (deployer) {
  deployer.deploy(DonationTracker);
};