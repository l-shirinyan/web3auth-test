"use client";
import Image from "next/image";
import ConnectWallet from "@/components/connect-wallet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-3">
      <h1 className="text-2xl">Here you can login with Ethereum wallets</h1>
      <ConnectWallet />
    </main>
  );
}
