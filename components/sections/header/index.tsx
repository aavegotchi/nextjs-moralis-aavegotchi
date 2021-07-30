import React, { useEffect, useState } from 'react';
import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import { ConnectButton, Button } from 'components/ui';
import { useAavegotchi, updateAavegotchis } from 'context/AavegotchiContext';


const LoadingButton = () => {
  return (
    <Button disabled={true}>  
      <Styled.GotchiIconWrapper>
        <Styled.GotchiIcon src="/assets/gifs/loading.gif" />
      </Styled.GotchiIconWrapper>
      <Styled.AavegotchiDetails>
          <p>Loading</p>
          <p>
            Aavegotchis
          </p>
        </Styled.AavegotchiDetails>
    </Button>
  )
}

const BuyButton = () => {
  return (
    <a href="https://aavegotchi.com/baazaar/aavegotchis?sort=latest" target="_blank">
      <Button>  
        Buy Aavegotchi
      </Button>
    </a>
  )
}

const GotchiButton = () => {
  return (
    <Button>

    </Button>
  )
}

export const Header = () => {
  const {isAuthenticated, user } = useMoralis();
  const { state: {usersAavegotchis, networkId, selectedAavegotchi }, dispatch } = useAavegotchi();

  useEffect(() => {
    if (usersAavegotchis && usersAavegotchis.length !== 0 && !selectedAavegotchi) {
      dispatch({
        type: "SET_SELECTED_AAVEGOTCHI",
        selectedAavegotchi: usersAavegotchis[0]
      })
    }
  }, [usersAavegotchis])

  useEffect(() => {
    if (isAuthenticated) {
      updateAavegotchis(dispatch, user.attributes.accounts[0]);
    }
  }, [isAuthenticated, networkId, usersAavegotchis]);

  return (
    <Styled.Wrapper>
      { isAuthenticated && networkId === 137 && (
        usersAavegotchis === undefined ? <LoadingButton /> : usersAavegotchis.length === 0 ? <BuyButton /> : <BuyButton />
      )}
      <ConnectButton />
    </Styled.Wrapper>
  )
}