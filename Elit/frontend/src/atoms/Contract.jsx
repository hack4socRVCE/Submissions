import { atom } from "recoil";

export const contractAtom = atom({
  key: 'contract',
  default: {
    address: null,
    provider: null,
    signer: null,
    contract: null
  }
});