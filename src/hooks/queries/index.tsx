import { useQuery } from "@tanstack/react-query";
import {
  getBanks,
  getDisputes,
  getEscrowPaymentRedirect,
  getLockedFunds,
  getPaymentRedirect,
  getTransactionInfo,
  getTransactionUnauthorized,
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
    queryFn: () => getTransactions({ search: type, page, size }),

    queryKey: ["transactions", page, type, size],
  });
};
export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
};
export const useTransactionInfo = (ref: any) => {
  return useQuery({
    queryKey: ["transactionInfo", ref],
    queryFn: () => getTransactionInfo(ref),
  });
};
export const useTransactionUnauthorized = (ref: string) => {
  return useQuery({
    queryKey: ["transactionInfo", ref],
    queryFn: () => getTransactionUnauthorized(ref),
  });
};
export const useLockedFunds = (page: number) => {
  return useQuery({
    queryKey: ["lockedFunds", page],
    queryFn: () => getLockedFunds(page),
  });
};
export const useDisputes = () => {
  return useQuery({
    queryKey: ["disputes"],
    queryFn: getDisputes,
  });
};
export const usePaymentRedirect = ({ status, tx_ref, transaction_id }: any) => {
  return useQuery({
    queryKey: ["paymentRedirect", status, tx_ref, transaction_id],
    queryFn: () => getPaymentRedirect({ status, tx_ref, transaction_id }),
  });
};
export const useEscrowPaymentRedirect = ({
  status,
  tx_ref,
  transaction_id,
}: any) => {
  return useQuery({
    queryKey: ["escrowPaymentRedirect", status, tx_ref, transaction_id],
    queryFn: () => getEscrowPaymentRedirect({ status, tx_ref, transaction_id }),
  });
};
