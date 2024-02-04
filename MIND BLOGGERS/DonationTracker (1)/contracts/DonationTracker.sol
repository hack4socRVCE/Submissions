pragma solidity ^0.5.16;

contract DonationTracker {
    address public owner;
    uint256 public totalDonations;
    uint256 public donationTarget;

    mapping(address => uint256[]) public donorDonationHistory;

    event DonationReceived(address indexed donor, uint256 amount, string message);
    event Withdrawal(address indexed owner, uint256 amount);
    event TargetSet(address indexed owner, uint256 newTarget);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        totalDonations += msg.value;
        donorDonationHistory[msg.sender].push(msg.value);

        emit DonationReceived(msg.sender, msg.value, "");
    }

    function donateWithMessage(string calldata _message) external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        totalDonations += msg.value;
        donorDonationHistory[msg.sender].push(msg.value);

        emit DonationReceived(msg.sender, msg.value, _message);

        // Check for rewards eligibility
        checkRewardsEligibility(msg.sender, msg.value);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getDonorDonationHistory() external view returns (uint256[] memory) {
        return donorDonationHistory[msg.sender];
    }

    function withdrawFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds available for withdrawal");

        msg.sender.transfer(address(this).balance);
        emit Withdrawal(msg.sender, address(this).balance);
    }

    function setDonationTarget(uint256 _newDonationTarget) external onlyOwner {
        donationTarget = _newDonationTarget;
        emit TargetSet(msg.sender, _newDonationTarget);
    }

    function checkRewardsEligibility(address _donor, uint256 _amount) internal {
        // Add your rewards eligibility logic here if needed
    }
}
