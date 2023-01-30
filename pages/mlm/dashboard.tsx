import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Dashboard as DashboardImport } from "../../components/index";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const account = useAccount();
  
    useEffect(() => {
      if (account && !account.isConnected) {
        router.push("/mlm");
      }
    }, [account.isConnected]);
    return (
        <DashboardImport />
    );
}

export default Dashboard;