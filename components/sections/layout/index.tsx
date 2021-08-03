import React, { useEffect, useState } from 'react'
import { Footer, Header } from 'components/sections'
import { Container } from 'components/layout'
import { updateNetworkId, useAavegotchi } from 'context/AavegotchiContext'
import { useMoralis } from 'react-moralis'
import { ErrorModal } from 'components/ui'
import Head from 'next/head'

interface Props {
  children: React.ReactNode;
  metadetails?: {
    title?: string;
  }
}

export const Layout = ({children, metadetails}: Props) => {
  const { web3, isWeb3Enabled, web3EnableError, enableWeb3 } = useMoralis();
  const { state: {error} , dispatch } = useAavegotchi();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    })
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateNetworkId(dispatch, web3);
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled])

  return (
    <>
      <Head>
        <title>{metadetails?.title || "Aavegotchi"}</title>
      </Head>
      {web3EnableError && <ErrorModal error={web3EnableError} />}
      {error && <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />}
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  )
}
