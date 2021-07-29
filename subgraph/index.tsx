import { request, ClientError } from "graphql-request";
import { Aavegotchi, CustomError } from "types";
const uri = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';

interface AavegotchiResponse {
  status: 200;
  aavegotchis: Array<Aavegotchi>
}

export const fetchGotchis = async (owner: string): Promise<CustomError | AavegotchiResponse> => {
  try {
    const query = `
      {
        aavegotchis(first: 500, orderBy: gotchiId, where: { owner:'${owner.toLowerCase()}"}) {
          id
          name
          withSetsNumericTraits
        }
      }
    `
    const response = await request<AavegotchiResponse>(uri, query);
    return {...response, status: 200};
  } catch (err) {
    return {status: 400, name: "Subgraph error", message: err.response.errors[0].message};
  }
}