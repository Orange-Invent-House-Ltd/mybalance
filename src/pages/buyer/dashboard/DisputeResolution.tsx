import React, { useCallback, useState, useEffect } from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDisputes, useUser } from "../../../hooks/queries";
import Skeleton from "react-loading-skeleton";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import ReactPaginate from "react-paginate";
import Pagination from "../../../components/reuseable/Pagination";
import Joyride from "react-joyride";
import { useQuery } from "@tanstack/react-query";
import { useEndTourGuide } from "../../../hooks/mutations";
import useStore from "../../../store";

const DisputeResolution = () => {
  const [tourFinished, setTourFinished] = useState(false);// State to track whether the tour guide has finished
  const { data: user } = useUser();
  const {mutate } = useEndTourGuide();
  const store = useStore()

  const navigate = useNavigate();
  const { data, isLoading } = useDisputes();
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  const endTourGuide = async() => {
    mutate({email: user?.email})
  };

  useEffect(() => {
    // Set run to true to start the tour guide when the component mounts
    setState((prevState) => ({
      ...prevState,
      run: user?.showTourGuide,
    }));
  }, []);
  // Tour Guide
  const [{ run, steps }, setState] = useState({
    run: user?.showTourGuide,
    steps: [
      {
        target: ".dispute",
        content:
          "Access Support: For any transaction-related issues or disputes, contact our Dispute Resolution team promptly.",
        placement: "right" as "right",
        title: " Dispute resolution",
      },
    ],
  });
  useEffect(() => {
    // Check if the tour guide has finished targeting all the classes
    if (tourFinished) {
       setState((prevState) => ({
         ...prevState,
         run: false,
       }));
       endTourGuide()
       store.setEndTour(true)
      // Navigate to the Quick Action page after the tour finishes
      navigate("/buyer/dashboard");
    }
  }, [tourFinished, navigate]);

  return (
    <div>
      <Joyride
        continuous
        run={run}
        steps={steps}
        // hideCloseButton
        scrollToFirstStep
        showSkipButton
        // showProgress
        locale={{
          skip: <strong>Cancel Tour</strong>,
          last: "Return to dashboard",
        }}
        callback={({ action }) => {
          if (action === "reset") {
            setTourFinished(true);
          }
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
      <header className="mb-10 md:mb-16 ">
        <h1 className="text-[23px] capitalize w-2/5 font-medium dispute">
          Dispute resolution
        </h1>
        <p className="text-[#303030] text-sm mt-2 md:mt-4">
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
        <div className="flex flex-col gap-4 md:gap-6  w-full max-w-[676px]">
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
