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
    queryFn: () => getTransactions({ search:type, page, size }),

    queryKey: ["transactions", page, type, size],
   
  });
};
export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks
  });
};
export const useTransactionInfo = (ref:any) => {
  return useQuery({
    queryKey: ["transactionInfo",ref],
    queryFn: () => getTransactionInfo(ref),
  });
};
export const useLockedFunds = (page:number) => {
  return useQuery({
    queryKey: ["lockedFunds",page],
    queryFn: ()=>getLockedFunds(page)
  });
};
export const useDisputes = () => {
  return useQuery({
    queryKey: ["disputes"],
    queryFn: getDisputes,
  });
};
