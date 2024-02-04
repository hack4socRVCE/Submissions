const hre = require("hardhat");

async function main() {
  const complain = await hre.ethers.getContractFactory("Complain");
  const contract = await complain.deploy();

  await contract.waitForDeployment();
  console.log(`Address of contract:`, contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});