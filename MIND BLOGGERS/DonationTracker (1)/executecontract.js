module.exports = async function (callback) {
    try {
      const DonationTracker = artifacts.require('DonationTracker');
      const donationTracker = await DonationTracker.deployed();
  
      // Set the donation target to 1000
      await donationTracker.setDonationTarget(1000);
  
      console.log('Donation target set to 1000');
      callback();
    } catch (error) {
      console.error(error);
      callback(error);
    }
  };
  
  module.exports.tags = ['DonationTracker'];