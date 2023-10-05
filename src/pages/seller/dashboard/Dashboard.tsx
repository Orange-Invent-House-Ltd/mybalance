import { Link } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
import SellerHeader from "../../../components/sellers/SellerHeader";
import SellerDashboardBox from "../../../components/reuseable/SellerDashboardBox";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions, useUser } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import { useState } from "react";
import Withdraw from "../../../components/sellers/Withdraw";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const { data: user, isError } = useUser();
  const [withdrawModal,setWithdrawModal] = useState(false)
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,

    size: 2,
  });
  return (
    <div className="mb-16">
      <Withdraw open={withdrawModal} setOpen={setWithdrawModal} />
      <SellerHeader
      
      />
      <div className="flex justify-center gap-2 mt-16 max-w-[710px]">
        <SellerDashboardBox
          Text="Total amount withdrawn"
          Amount={formatToNairaCurrency(user?.withdrawnAmount || 0)}
        />
        <SellerDashboardBox
          Text="Total amount in escrow"
          Amount={formatToNairaCurrency(user?.walletBalance || 0)}
        />
      </div>
      <div className="flex flex-col items-center md:flex-row justify-center gap-8 mt-8 max-w-[710px]">
        <button
          onClick={() => {
            setWithdrawModal(true);
          }}
          className="bg-[#9A4D0C] capitalize w-[332px] md:w-[220px] text-white rounded-[30px] px-[16px] py-[12px]"
        >
          withdraw funds
        </button>

        <Link to="/seller/transaction-history">
          <button className="border border-[#9A4D0C] w-[332px] md:w-[220px] text-[#9A4D0C] rounded-[30px] px-[16px] py-[12px]">
            Transaction History
          </button>
        </Link>
      </div>
      <h6 className="h6 mt-10">Transaction history</h6>
      {isLoading && (
        <div className="flex flex-col gap-3 w-full max-w-[676px]">
          <Skeleton className="w-full h-[100px] " />
          <Skeleton className="w-full h-[100px] " />
        </div>
      )}
      {transactionData?.data?.map((transaction: any) => (
        <div key={transaction.id} className="max-w-[676px] w-full">
          <DashboardHistoryBox {...transaction} />
        </div>
      ))}
      {isLoading && (
        <div className="flex flex-col gap-3 w-full max-w-[676px]">
          <Skeleton className="w-full h-[100px] " />
          <Skeleton className="w-full h-[100px] " />
        </div>
      )}
      <div className="w-[343px]">
        <Link to="/seller/transaction-history">
          <Button fullWidth variant="outlined">
            View all transactions
          </Button>
        </Link>
      </div>
      {transactionData?.data.length === 0 && <EmptyTrans />}
    </div>
  );
};

export default Dashboard;
