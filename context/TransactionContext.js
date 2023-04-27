import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

import { useStateContext } from '@/context/StateContext';
import { StateContext } from './StateContext';
import { Context } from "@/context/StateContext";

export const TransactionContext = React.createContext();



//const {ethereum} = window.ethereum;


const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });

    return transactionContract;
};

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState(" ");
    const [isLoading, setIsLoading] = useState(false);
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, removeFromCart } = useStateContext();
    const [transactionCount, setTransactionCount] = useState(
      typeof window !== "undefined" ? localStorage.getItem("transactionCount") : 0
    );
    
  //  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  // const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, removeFromCart } = useContext(Context);
    console.log({totalPrice});



    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
          console.log(accounts);
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            //getAllTransactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      }

      const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error)

            throw new Error('No ethereum object.')
        }
      }

      const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");


            const transactionContract = getEthereumContract();
            getEthereumContract();
            const stringAmount = totalPrice.toString();
            console.log({stringAmount});
            const parsedAmount = ethers.parseUnits(stringAmount, "gwei");
            const parsedAmount2 = ethers.parseEther(stringAmount);
            const addressTo = "0x375Dc8DEa89298EfDf82DEcfbbAF93AD31f6EBcA"
            console.log("amount: ", parsedAmount);
            console.log("amount2: ", parsedAmount2);
            console.log("current account: ", currentAccount);
            console.log("address to: ", addressTo);


            await ethereum.request({
                method: 'eth_sendTransaction', 
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  value: parsedAmount2,
                  chain: "goerli"
                }],
              });


            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());


        } catch (error) {
            console.log(error);
        }
      }

      useEffect(() => {
        checkIfWalletIsConnect();
      }, []);
    

      //                  gas: "0x5208", //21000 Gwei
    return(
        <TransactionContext.Provider value={{connectWallet, sendTransaction,  currentAccount}}>
            {children}
        </TransactionContext.Provider>
    );

    
}