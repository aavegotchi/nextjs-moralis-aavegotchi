import React, { useEffect } from 'react';
import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import { ConnectButton } from 'components/ui';
import { useAavegotchi } from 'hooks/useAavegotchi';


export const Header = () => {
  const { Moralis, isAuthenticated, user, isWeb3Enabled } = useMoralis();
  const { getAllAavegotchisOfOwner } = useAavegotchi();

  const getNFTs = async () => {
    // const options = { chain: 'matic', address: user.attributes.accounts[0] };
    // const polygonNFTs = await Moralis.Web3.getNFTs(options);
    // const ERC721TokenIds = polygonNFTs.reduce((currentArray, nft) => {
    //   return nft.contract_type === "ERC721" ? [...currentArray, nft.token_id] : currentArray;
    // }, [])
    // console.log(ERC721TokenIds);

    getAllAavegotchisOfOwner(user.attributes.accounts[0]);
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