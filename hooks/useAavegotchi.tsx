import { useMoralis } from 'react-moralis';
import diamondAbi from 'abi/diamondABI.json';
import { addresses } from 'utils/vars';
import { fetchGotchis } from 'subgraph';
import { useWeb3 } from 'context/Web3Context';
import { CustomError } from 'types';

export const useAavegotchi = () => {
  const { web3 } = useMoralis();
  const { dispatch } = useWeb3();

  const getAllAavegotchisOfOwner = async (owner: string) => {
    const res = await fetchGotchis(owner);
    if (res.status !== 200) {
      dispatch({
        type: "SET_ERROR",
        error: res as CustomError
      })
    }
    // const contract = new web3.eth.Contract(diamondAbi, addresses.diamond);
    // const aavegotchis = await contract.methods.allAavegotchisOfOwner(owner).call();
    // console.log(aavegotchis);
  }

  return { getAllAavegotchisOfOwner };
}