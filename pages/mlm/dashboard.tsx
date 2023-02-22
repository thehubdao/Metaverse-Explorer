import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Dashboard as DashboardImport } from "../../components/index";
import CommingSoon from "../../components/CommingSoon";

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
      <CommingSoon />
    )
  }

  return (
    <DashboardImport />
  );
}

export default Dashboard;