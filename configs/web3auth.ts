import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { adapters } from "@/adapters";
import { clientId } from "./constants";

const chainConfig = {
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  chainConfig,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

adapters.forEach((adapter) => {
  web3auth.configureAdapter(adapter);
});

export { web3auth, web3AuthOptions };
