import React, { useEffect } from 'react';
import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import { ConnectButton } from 'components/ui';
import { useAavegotchi } from 'hooks/useAavegotchi';


export const Header = () => {
  const {isAuthenticated, user, isWeb3Enabled } = useMoralis();
  const { fetchAavegotchisOfOwner } = useAavegotchi();

  const getNFTs = async () => {
    const aavegotchis = await fetchAavegotchisOfOwner(user.attributes.accounts[0]);
  }

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      getNFTs()
    }
  }, [isAuthenticated, isWeb3Enabled])
  return (
    <Styled.Wrapper>
      <ConnectButton />
    </Styled.Wrapper>
  )
}