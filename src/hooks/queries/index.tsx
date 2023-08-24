import { useQuery } from "@tanstack/react-query";
import {
  getBanks,
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
export const useTransactionInfo = () => {
  return useQuery({
    queryKey: ["transactionInfo"],
    queryFn: (ref) => getTransactionInfo(ref),
  });
};
