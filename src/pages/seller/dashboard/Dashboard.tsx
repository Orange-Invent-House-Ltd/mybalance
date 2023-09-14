import { Link } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
import SellerHeader from "../../../components/sellers/SellerHeader";
import SellerDashboardBox from "../../../components/reuseable/SellerDashboardBox";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions, useUser } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";

const Dashboard = () => {
  const { data: user, isError } = useUser();
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,

    size: 2,
  });
  return (
    <div className="mb-16">
      <SellerHeader
        Heading="Welcome TMusty!"
        Text="Your last login was on 01/12/2022 10:00:34 AM"
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
        <Link to="escrow-link">
          <button className="bg-[#9A4D0C] w-[332px] md:w-[220px] text-white rounded-[30px] px-[16px] py-[12px]">
            Share my escrow link
          </button>
        </Link>
        <Link to="/seller/dispute-resolution">
          <button className="border border-[#9A4D0C] w-[332px] md:w-[220px] text-[#9A4D0C] rounded-[30px] px-[16px] py-[12px]">
            Raise a dispute
          </button>
        </Link>
      </div>
      <h6 className="h6 mt-10">Transaction history</h6>
      {transactionData?.data?.map(
        ({ amount, status, createdAt, meta, id }: any) => (
          <DashboardHistoryBox
            key={id}
            header={meta.title}
            text={meta.description}
            status={status}
            price={formatToNairaCurrency(amount)}
            subtext={new Date(createdAt).toLocaleString()}
          />
        )
      )}
      <div className="w-[343px]">
        <Link to="/seller/transaction-history">
          <Button fullWidth variant="outlined">
            View all transactions
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
