// app.js

const web3 = new Web3('ws://localhost:7545'); // Use Websocket provider
const contractAddress = '0x4E6545B2561aB856aC8654fcE1dcF01ABff4fAfd';
const contractABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "DonationReceived",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "donationTarget",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "donorDonationHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalDonations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "donateWithMessage",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDonorDonationHistory",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newDonationTarget",
          "type": "uint256"
        }
      ],
      "name": "setDonationTarget",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Replace with your contract ABI
  
  let donationContract;

async function initContract() {
  donationContract = new web3.eth.Contract(contractABI, contractAddress);

  donationContract.events.DonationReceived()
    .on('data', function (event) {
      console.log('Donation Received:', event.returnValues);
      updateDonationHistory();
      updateContractBalance();
    })
    .on('error', function (error) {
      console.error('Error in DonationReceived event:', error);
    });

  donationContract.events.Withdrawal()
    .on('data', function (event) {
      console.log('Withdrawal:', event.returnValues);
      updateContractBalance();
    })
    .on('error', function (error) {
      console.error('Error in Withdrawal event:', error);
    });

  donationContract.events.TargetSet()
    .on('data', function (event) {
      console.log('Target Set:', event.returnValues);
    })
    .on('error', function (error) {
      console.error('Error in TargetSet event:', error);
    });
}

initContract()
  .then(() => {
    // Initial updates
    updateDonationHistory();
    updateContractBalance();
  })
  .catch(error => console.error("Error initializing contract:", error));

async function donate() {
  try {
    await initContract(); // Ensure contract is initialized before donating
    const amount = document.getElementById('donationAmount').value;
    await donationContract.methods.donate().send({ value: amount });
  } catch (error) {
    console.error("Error donating:", error);
  }
}

async function withdrawFunds() {
  try {
    await initContract();
    await donationContract.methods.withdrawFunds().send({ from: '0x84B2D6f6CA6aC852307e72fF308318A4641C86db' }); // Replace with your owner address
  } catch (error) {
    console.error("Error withdrawing funds:", error);
  }
}

async function updateDonationHistory() {
  try {
    const donationHistory = await donationContract.methods.getDonorDonationHistory().call({ from: '0x4Ff6fF57d87e57A6FCb5F1a16633cf7e98053aEA' }); // Replace with donor address
    const donationHistoryList = document.getElementById('donationHistory');
    donationHistoryList.innerHTML = donationHistory.map(amount => `<li>${amount} wei</li>`).join('');
  } catch (error) {
    console.error("Error updating donation history:", error);
  }
}

async function updateContractBalance() {
  try {
    const contractBalance = await donationContract.methods.getContractBalance().call();
    document.getElementById('contractBalance').innerText = `${contractBalance} wei`;
  } catch (error) {
    console.error("Error updating contract balance:", error);
  }
}

// Initial updates
updateDonationHistory();
updateContractBalance();