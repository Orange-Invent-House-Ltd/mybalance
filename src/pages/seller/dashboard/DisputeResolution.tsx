import React, { useCallback, useEffect, useState } from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDisputes, useUser } from "../../../hooks/queries";
import Skeleton from "react-loading-skeleton";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import ReactPaginate from "react-paginate";
import Pagination from "../../../components/reuseable/Pagination";
import ReactJoyride from "react-joyride";
import { useQuery } from "@tanstack/react-query";
import { useEndTourGuide } from "../../../hooks/mutations";
import useStore from "../../../store";

const DisputeResolution = () => {
  const [tourFinished, setTourFinished] = useState(false); // State to track whether the tour guide has finished
  const navigate = useNavigate();
  const { data, isLoading } = useDisputes();
  const [page, setPage] = useState<number>(1);
  const { data: user} = useUser();
  const {mutate } = useEndTourGuide();
  const store = useStore();
  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  const endTourGuide = async() => {
    mutate({email: user?.email})
  };

  useEffect(() => {
    // Check if the tour has finished targeting all the classes
    if (tourFinished) {
      // If tour has been finished previously, do not run the tour again
      setState((prevState) => ({
        ...prevState,
        run: false,
      }));
    }
  }, []);
  //Tour Guide
  const [{ run, steps }, setState] = useState({
    run: user?.showTourGuide,
    steps: [
      // {
      //   content:
      //     "Access Support: For any transaction-related issues or disputes, contact our Dispute Resolution team promptly.",
      //   placement: "right" as "right",
      //   target: ".dispute-resolution",
      //   title: "Dispute Resolution",
      // },
      {
        content:
          "Access Support: For any transaction-related issues or disputes, contact our Dispute Resolution team promptly.",
        placement: "right" as "right",
        target: ".dispute",
        title: "Dispute Resolution",
      },
    ],
  });
  //
  useEffect(() => {
    // Check if the tour guide has finished targeting all the classes
    if (tourFinished) {
      // Set run to false when the tour finishes
      setState((prevState) => ({
        ...prevState,
        run: false,
      }));
      endTourGuide()
      store.setEndTour(true)
      // Navigate to the Quick Action page after the tour finishes
      navigate("/seller/dashboard");
    }
  }, [tourFinished, navigate]);

  return (
    <div>
      <ReactJoyride
        continuous
        callback={({ action }) => {
          if (action === "reset") {
            setTourFinished(true);
          }
        }}
        run={run}
        steps={steps}
        // hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          skip: <strong>Cancel Tour</strong>,
          last: "Return to dashboard",
        }}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonBack: {
            marginRight: 10,
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonSkip: {
            color: "#DA1E28",
          },
        }}
      />
      <header className="mb-16 dispute">
        <h1 className="text-[23px] capitalize font-medium ">
          Dispute resolution
        </h1>
        <p className="text-[#303030] text-sm mt-4">
          Manage disputes with vendors by creating a dispute thread here.
        </p>
      </header>
      <div>
        {isLoading && (
          <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[676px]">
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
          </div>
        )}
        <div className="space-y-10 w-full max-w-[676px]">
          {data?.data?.map(
            ({ reason, description, createdAt, status }: any) => (
              <DisputeCard
                key={createdAt}
                reason={reason}
                description={description}
                time={createdAt}
                status={status}
              />
            )
          )}
          {data?.data.length === 0 && <EmptyTrans />}
          {!isLoading && data?.data.length > 0 && (
            <Pagination
              initialPage={data?.meta?.currentPage}
              onPageChange={handlePageChange}
              pageCount={data?.meta?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;
