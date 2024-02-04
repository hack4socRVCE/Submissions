const DonationTracker = artifacts.require("DonationTracker");

contract("DonationTracker", (accounts) => {
  // Your test cases go here
  it("should increase contract balance after a donation", async () => {
    const instance = await DonationTracker.deployed();
    const initialBalance = await instance.getContractBalance();

    await instance.donate({ value: web3.utils.toWei("1", "ether"), from: accounts[0] });

    const finalBalance = await instance.getContractBalance();

    assert.isAbove(Number(finalBalance), Number(initialBalance), "Balance should increase after donation");
  });

  it("should allow the owner to withdraw funds", async () => {
    const instance = await DonationTracker.deployed();
    const initialBalance = await instance.getContractBalance();
  
    await instance.withdrawFunds();
  
    const finalBalance = await instance.getContractBalance();
  
    assert.equal(Number(finalBalance), 0, "Balance should be zero after withdrawal");
  });

  it("should allow the owner to set a new donation target", async () => {
    const instance = await DonationTracker.deployed();
    const newTarget = web3.utils.toWei("5", "ether");
  
    await instance.setDonationTarget(newTarget);
    const updatedTarget = await instance.donationTarget();
  
    assert.equal(updatedTarget, newTarget, "Donation target should be updated");
  });
  
  it("should allow a donor to claim a reward", async () => {
  const instance = await DonationTracker.deployed();
  const rewardIndex = 0;

  await instance.donateWithMessage("Claim reward", { value: web3.utils.toWei("2", "ether"), from: accounts[1] });
  await instance.claimReward(rewardIndex, { from: accounts[1] });

  // Add assertions for reward claim event and status
});

});


