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
      {user?.kyc === null && (
        <div className="flex flex-col gap-2 justify-start items-start max-w-[752px] mt-8 px-4 py-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="w-[285px] text-amber-800 text-sm font-bold">ATTENTION:</p>
          <div className="w-full border-t border-orange-300"/>
          <p className="max-w-[650px] text-amber-700 text-[13px] font-normal">
            Please note that your KYC (Know Your Customer) verification is pending. Completing your KYC is essential for a smooth fund withdrawal process. Take a moment to complete your KYC to avoid any delays.
          </p>
          <Link to='/kyc'>
            <button className="px-10 py-2 bg-orange-500 rounded-[40px] text-white text-sm font-bold">Complete KYC now</button>
          </Link>
        </div>
      )}
      <div className="md:flex justify-between">
        <div>
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
          <div className="flex flex-col items-center md:flex-row justify-center gap-4 md:gap-8 mt-8 w-full max-w-[710px]">
            <button
              onClick={() => {
                setWithdrawModal(true);
              }}
              className="bg-[#9A4D0C] capitalize w-[332px] md:w-[220px] text-white rounded-[30px] px-[16px] py-[12px]"
            >
              withdraw funds
            </button>
            <Link to="/seller/transaction-history">
              <button className="border border-[#9A4D0C] w-[332px] md:w-[220px]  text-[#9A4D0C] rounded-[30px] px-[16px] py-[12px]">
                Transaction History
              </button>
            </Link>
          </div>

          <h6 className="h6 mt-16">Transaction history</h6>
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
          <div className="max-w-[343px]">
            <Link to="/seller/transaction-history">
              <Button fullWidth variant="outlined">
                View all transactions
              </Button>
            </Link>
          </div>
          {transactionData?.data.length === 0 && <EmptyTrans />}
        </div>
        <div>
          {/* Right side box - Charges box */}
          <div
            style={{
              boxShadow: " 0px 9px 100px 0px rgba(60, 60, 60, 0.25)",
            }}
            className="border border-#B7B7B7 w-full md:max-w-[297px] rounded-[10px] mt-10 md:mt-16 px-4 py-6"
          >
            <h6 className="text-2xl font-bold  text-[#6D6D6D] ">Our charges</h6>
            <p className="text-sm mt-2 text-[#6D6D6D]">
              We offer very user friendly charges which are range-based. The
              higher the transaction, the lower the charge percentage.
            </p>
            <div className="flex justify-between mt-8 text-[14px]">
              <div className="flex flex-col gap-5">
                <p className="text-[#6D6D6D] text-[16px] font-semibold">
                  Range
                </p>
                <p>Below N100,000</p>
                <p>N100,000 - N500,000</p>
                <p>Above N500,000</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[#6D6D6D] text-[16px] font-semibold">
                  Charges
                </p>
                <p>1.5% per party</p>
                <p>1% per party</p>
                <p>0.8% per party</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
