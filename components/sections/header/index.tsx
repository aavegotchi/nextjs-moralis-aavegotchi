import React, { useEffect } from 'react';
import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import { ConnectButton } from 'components/ui';


export const Header = () => {
  const { Moralis, isAuthenticated, user } = useMoralis();

  const getNFTs = async () => {
    const options = { chain: 'matic', address: user.attributes.accounts[0] };
    const polygonNFTs = await Moralis.Web3.getNFTs(options);
    const ERC721TokenIds = polygonNFTs.reduce((currentArray, nft) => {
      return nft.contract_type === "ERC721" ? [...currentArray, nft.token_id] : currentArray;
    }, [])
    console.log(ERC721TokenIds);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getNFTs()
    }

  }, [isAuthenticated])
  return (
    <Styled.Wrapper>
      <ConnectButton />
    </Styled.Wrapper>
  )
}