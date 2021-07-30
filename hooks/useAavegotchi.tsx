import { useSubgraph } from 'actions';
import { AavegotchisOfOwner, getAllAavegotchisOfOwner } from 'actions/queries';
import { useWeb3 } from 'context/Web3Context';

export const useAavegotchi = () => {
  const { dispatch } = useWeb3();

  const fetchAavegotchisOfOwner = async (owner: string) => {
    try {
      const gotchis = await useSubgraph<AavegotchisOfOwner>(getAllAavegotchisOfOwner(owner));
      return gotchis;
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SET_ERROR",
        error: err,
      })
    }
  }

  return { fetchAavegotchisOfOwner };
}