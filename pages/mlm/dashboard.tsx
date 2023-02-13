import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Dashboard as DashboardImport } from "../../components/index";

const Dashboard: NextPage = () => {
  const commingSoon = true

  const router = useRouter();
  const account = useAccount();

  useEffect(() => {
    if (account && !account.isConnected) {
      router.push("/mlm");
    }
  }, [account.isConnected]);

  if (commingSoon) {
    return (
      <div className="flex justify-center items-center w-full h-screen gap-6">
        <Image src='/images/mgh_logo.svg' width={100} height={100} />
        <h2 className="font-bold text-xl">Coming soon!</h2>
      </div>
    )
  }

  return (
    <DashboardImport />
  );
}

export default Dashboard;