"use client";

import { web3auth } from "@/configs/web3auth";
import { useEffect, useState } from "react";
import { IProvider } from "@web3auth/base";
import Dashboard from "../dashboard";

function ConnectWallet() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await web3auth.initModal();

        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      console.log({ web3authProvider, con: web3auth.connected });

      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (e) {}
  };

  return loading ? (
    "Loading..."
  ) : !loggedIn ? (
    <button
      className="rounded py-2 px-3 bg-slate-500 text-white"
      onClick={login}
    >
      Login
    </button>
  ) : (
    <Dashboard
      provider={provider}
      setLoggedIn={setLoggedIn}
      setProvider={setProvider}
    />
  );
}

export default ConnectWallet;
