//const Web3 = require('web3.js');
import Web3 from 'web3';
if (typeof web3 !== 'undefined') {  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
const web3 = new Web3('ws://localhost:7545');
const contractAddress = '0xff3B3485f76E0452A0FB44c05B842b8155F27F3A';
const contractABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'donor',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'DonationReceived',
    type: 'event'
  },
  {
    constant: true,
    inputs: [],
    name: 'donationTarget',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'donorDonationHistory',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalDonations',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'donate',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'message',
        type: 'string'
      }
    ],
    name: 'donateWithMessage',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getContractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getDonorDonationHistory',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newDonationTarget',
        type: 'address'
      }
    ],
    name: 'setDonationTarget',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

let donationContract;

async function initContract() {
    donationContract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        donationContract.events.DonationReceived()
            .on('data', async function (event) {
                console.log('Donation Received:', event.returnValues);
                await updateDonationHistory();
                await updateContractBalance();
            })
            .on('error', function (error) {
                console.error('Error in DonationReceived event:', error);
            })

        donationContract.events.Withdrawal()
            .on('data', async function (event) {
                console.log('Withdrawal:', event.returnValues);
                await updateContractBalance();
            })
            .on('error', function (error) {
                console.error('Error in Withdrawal event:', error);
            })

        donationContract.events.TargetSet()
            .on('data', function (event) {
                console.log('Target Set:', event.returnValues);
            })
            .on('error', function (error) {
                console.error('Error in TargetSet event:', error);
            })
    } catch (error) {
        console.error("Error setting up event listeners:", error);
    }
}

window.donate = async () => {
    try {
        await initContract();
        const amount = document.getElementById('donationAmount').value;
        await donationContract.methods.donate().send({ value: web3.utils.toWei(amount, 'ether') })
    } catch (error) {
        console.error("Error donating:", error);
    }
}

window.withdrawFunds = async () => {
  try {
      await initContract();
      await donationContract.methods.withdrawFunds().send({ from: '0x11EC330665e30a6526F944a9b4CDaE6d7a12d3C' });
  } catch (error) {
      console.error("Error withdrawing funds:", error);
  }
}

async function updateDonationHistory() {
    try {
        if (!donationContract) {
            await initContract();
        }
        const donorAddress = '0xb04B675A9286Be8dFdc7d059952af6DE0560726f';
        const donationHistory = await donationContract.methods.donorDonationHistory(donorAddress).call();
        const donationHistoryList = document.getElementById('donationHistory');
        donationHistoryList.innerHTML = donationHistory.map((amount, index) => `<li>Donation ${index + 1}: ${web3.utils.fromWei(amount, 'ether')} ETH</li>`).join('');
    } catch (error) {
        console.error("Error updating donation history:", error);
    }
}

async function updateContractBalance() {
    try {
        if (!donationContract) {
            await initContract();
        }
        const contractBalance = web3.utils.fromWei(await donationContract.methods.getContractBalance().call(), 'ether');
        document.getElementById('contractBalance').innerText = `${contractBalance} ETH`;
    } catch (error) {
        console.error("Error updating contract balance:", error);
    }
}

updateDonationHistory();
updateContractBalance();