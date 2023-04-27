import { StateContext } from '@/context/StateContext';
import { TransactionProvider } from '@/context/TransactionContext';

import '@/styles/globals.css'
import { React } from 'react';


import Layout from './../components/Layout'
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  return(

    <StateContext>   
       <TransactionProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout> 
      </TransactionProvider>
    </StateContext>



  )
  
}
