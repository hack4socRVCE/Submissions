from web3 import Web3

w3 = Web3(Web3.HTTPProvider("http://172.16.64.202:7545"))
assert True is w3.is_connected()
# Load the contract bytecode and ABI from files
with open("../Chainforge/cbi.bin", "r") as f:
    bytecode = f.read()
with open("../Chainforge/contract.abi", "r") as f:
    abi = f.read()



# Create the contract in Python
contract = w3.eth.contract(abi=abi, bytecode=bytecode)

# Submit the transaction that deploys the contract
tx_hash = contract.constructor().transact({'from':w3.eth.accounts[0] })

# Wait for the transaction to be mined, and get the transaction receipt
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print(f"Contract Deployed At: {tx_receipt.contractAddress}")