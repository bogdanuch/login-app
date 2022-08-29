import React, {ReactElement, useState} from 'react';
import {providers, utils} from "ethers";

declare global {
    interface Window {
        ethereum?: any;
    }
}

type TMetamaskContext = {
    chainID: string,
    address: string,
    userBalance: string,
    connect: () => void,
}

const MetamaskContext = React.createContext<TMetamaskContext>({
    chainID: '',
    address: '',
    userBalance: '',
    connect: (): void => undefined
});

export const MetamaskContextApp = ({children}: { children: ReactElement }): ReactElement => {
    const [chainID, setChainID] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [userBalance, setUserBalance] = useState<string>('');

    async function getUserData(): Promise<void> {
        const provider = await new providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const userAddress = await signer.getAddress();
        setAddress(userAddress);

        const chainId = utils.hexlify((await provider.getNetwork()).chainId);
        setChainID(chainId);

        const userBalance = (await signer.getBalance()).toString();
        setUserBalance(userBalance)
    }

    async function connect(): Promise<void> {
        try{
            const provider = await new providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            await getUserData();
        } catch (e) {
            console.log(e);
        }
    }

    async function onAccountChange(accounts: string[]): Promise<void> {
        if (accounts.length === 0) {
            setAddress('');
        } else {
            setAddress(accounts[0])
        }
    }

    window.ethereum.on("chainChanged", ()=>window.location.reload());
    window.ethereum.on("accountsChanged", onAccountChange);

    return (
        <MetamaskContext.Provider
            value={{
                chainID,
                address,
                userBalance,
                connect
            }}
        >
            {children}
        </MetamaskContext.Provider>
    )

}

export const useMetamask = () => React.useContext(MetamaskContext);

export default useMetamask;