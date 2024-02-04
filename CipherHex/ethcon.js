const Web3 = require('web3');

const MyContract = require('./src/abis/ACTPOINTSMGMT.json');

const init = async ()=>  {
    const web3 = new Web3('HTTP://127.0.0.1:7545');
    const id = await web3.eth.net.getId();

    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );

    const result = await contract.methods.getStudentInfo("yorishabh@gamil.com").call();
    console.log(result['email']);
    console.log(result['points']);
    console.log(result['name']);
}

init();

    //  const res = await contract.methods.updateStudentInfo("yorishabh@gamil.com", 10).send({
    //     from: '0xb297EA13117d76b6ca84683Bff3Ab32c6Ac40B6F'
    // });
    //  console.log(res);

//     if (res) {
//         const result2 = await contract.methods.getStudentInfo($userEmail).call();
//         console.log(result2['points']);
//     } else {
//         console.log("Doesn't work");
//     }

