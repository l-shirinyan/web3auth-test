import { Dispatch, SetStateAction, useState } from "react";
import * as RPC from "@/configs/ethersRPC";
import { web3auth } from "@/configs/web3auth";
import { IProvider } from "@web3auth/base";

interface IProps {
  provider: IProvider | null;
  setProvider: Dispatch<SetStateAction<IProvider | null>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Dashboard({ provider, setProvider, setLoggedIn }: IProps) {
  const [outputText, setOutputText] = useState("");

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }

    const address = await RPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };

  function uiConsole(...args: any[]): void {
    setOutputText(JSON.stringify(args || {}, null, 2));
  }

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  return (
    <>
      {outputText && <div>{outputText}</div>}

      <div className="flex flex-col space-y-4 p-4">
        <div>
          <button
            onClick={getAccounts}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          >
            Get Accounts
          </button>
        </div>
        <div>
          <button
            onClick={getBalance}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          >
            Get Balance
          </button>
        </div>
        <div>
          <button
            onClick={signMessage}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          >
            Sign Message
          </button>
        </div>
        <div>
          <button
            onClick={sendTransaction}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          >
            Send Transaction
          </button>
        </div>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 active:bg-red-700 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
