import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Skeleton from "react-loading-skeleton";

const TransactionHistory = () => {
  const { isLoading, data } = useTransactions({ search: "", page: 1, size: 10 });
  console.log(
    "🚀 ~ file: TransactionHistory.tsx:11 ~ TransactionHistory ~ data:",
    data
  );

  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="relative max-w-[676px]">
        {isLoading && (
          <div className="flex flex-col gap-3" >
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
          </div>
        )}
        {data?.data?.results?.map(
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
        {
          data?.data.results.length === 0 && <div className="h-[500px] w-full max-w-[600px] flex items-center justify-center capitalize font-bold text-gray-600 text-2xl" >no transaction history</div>
        }
      </div>
    </div>
  );
};

export default TransactionHistory;
