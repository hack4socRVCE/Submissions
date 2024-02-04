
import { useState } from 'react';
import { TatumSDK, Network, Ethereum, MetaMask } from '@tatumio/tatum';


export function useMetaMaskTatum() {
const [account, setAccount] = useState<string | null>(null);


const connectMetaMask = async () => {
const tatum = await TatumSDK.init < Ethereum > ({
network: Network.ETHEREUM
});
const metamaskAccount = await tatum.walletProvider.use(MetaMask).getWallet();
setAccount(metamaskAccount);
};
return { connectMetaMask, account };
}
                                                                    