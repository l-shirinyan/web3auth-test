import { clientId } from "@/configs/constants";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { CoinbaseAdapter } from "@web3auth/coinbase-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

const adapterConfig = {
  clientId,
  sessionTime: 3600,
  web3AuthNetwork: "sapphire_mainnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
  },
} as const;

const adapterClasses = [MetamaskAdapter, CoinbaseAdapter];

const adapters = adapterClasses.map((Class) => {
  return new Class(adapterConfig);
});

export { adapters };
