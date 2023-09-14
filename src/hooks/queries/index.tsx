import { useQuery } from "@tanstack/react-query";
import {
  getBanks,
  getDisputes,
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
  type,
  size,
}: {
  type?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryFn: () => getTransactions({ type, page, size }),

    queryKey: ["transactions", page, type, size],
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
export const useDisputes = () => {
  return useQuery({
    queryKey: ["disputes"],
    queryFn: getDisputes,
  });
};
