import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import { useMoralis } from "react-moralis";
import { ConnectButton, Button, GotchiSVG } from "components/ui";
import { useAavegotchi, updateAavegotchis } from "context/AavegotchiContext";
import { Aavegotchi } from "types";

const LoadingButton = () => {
  return (
    <Button disabled={true}>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <img src="/assets/gifs/loading.gif" />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>Loading</p>
          <p>Aavegotchis</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

const BuyButton = () => {
  return (
    <a
      href="https://aavegotchi.com/baazaar/aavegotchis?sort=latest"
      target="_blank"
    >
      <Button>Buy Aavegotchi</Button>
    </a>
  );
};

const GotchiSelectButton = ({ gotchi }: { gotchi: Aavegotchi }) => {
  return (
    <Button>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <GotchiSVG tokenId={gotchi.id} />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>{gotchi.id}</p>
          <p>{gotchi.name}</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

export const Header = () => {
  const { isAuthenticated, user, isWeb3Enabled } = useMoralis();
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
    dispatch,
  } = useAavegotchi();

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      updateAavegotchis(dispatch, user.attributes.accounts[0]);
    }
  }, [isWeb3Enabled, isAuthenticated]);

  return (
    <Styled.Wrapper>
      <Styled.ButtonContainer>
        {isAuthenticated &&
          networkId === 137 &&
          (usersAavegotchis === undefined ? (
            <LoadingButton />
          ) : usersAavegotchis.length === 0 ? (
            <BuyButton />
          ) : (
            <GotchiSelectButton
              gotchi={usersAavegotchis[selectedAavegotchiIndex]}
            />
          ))}
        <ConnectButton />
      </Styled.ButtonContainer>
    </Styled.Wrapper>
  );
};
