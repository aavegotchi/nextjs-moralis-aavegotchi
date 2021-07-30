import { request } from "graphql-request";
import { addresses } from "utils/vars";
import diamondAbi from "abi/diamondABI.json";

const coreURI =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic";

export const useSubgraph = async <T extends object>(
  query: string,
  uri?: string
): Promise<T> => {
  try {
    const data = await request<T>(uri || coreURI, query);
    return data;
  } catch (err) {
    throw {
      status: 400,
      name: "Subgraph error",
      message: err.response.errors[0].message,
    };
  }
};

type DiamondCallMethods = {name: "getAavegotchiSvg", parameters: [string]}

export const useDiamondCall = async <R extends unknown>(
  web3: any,
  method: DiamondCallMethods,
): Promise<R> => {
  const address = addresses.diamond;
  const contract = new web3.eth.Contract(diamondAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).call();
    return res;
  } catch (err) {
    throw { status: 400, name: "Diamond contract error", message: err.message, stack: err.stack };
  }
};
