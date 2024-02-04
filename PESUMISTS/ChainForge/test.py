from web3.auto import w3
from web3 import Account

# Enable the mnemonic features
Account.enable_unaudited_hdwallet_features()

mnemonic_phrase = "bird alien pledge electric circle prefer dentist assault alley zoo wrap garlic"
accounts = w3.eth.accounts
for i in range(len(accounts)):
    path = f"m/44'/60'/0'/0/{i}"
    account = Account.from_mnemonic(mnemonic_phrase, account_path=path)
    private_key = account._private_key.hex()
    public_address = account.address

    print(f"Account {i}:")
    print(f"Private key: {private_key}")
    print(f"Public address: {public_address}")
