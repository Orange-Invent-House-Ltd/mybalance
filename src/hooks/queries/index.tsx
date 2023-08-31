import { useQuery } from "@tanstack/react-query";
import {
  getBanks,
  getLockedFunds,
  getTransactionInfo,
  getTransactions,
  getUser,
} from "../../api";

export const useUser = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
};
export const useTransactions = ({
  page,
  search,
  size,
}: {
  search?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryFn: () => getTransactions({ search, page, size }),

    queryKey: ["transactions", page, search, size],
    keepPreviousData: true,
  });
};
export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
};
export const useTransactionInfo = (ref:any) => {
  return useQuery({
    queryKey: ["transactionInfo"],
    queryFn: () => getTransactionInfo(ref),
  });
};
export const useLockedFunds = () => {
  return useQuery({
    queryKey: ["lockedFunds"],
    queryFn: getLockedFunds
  });
};
