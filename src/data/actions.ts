import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { nobleTestnet } from "../config/chainInfo";

export type BalanceResponse = {
  balances: {
    denom: string;
    amount: string;
  }[];
  pagination: { next_key: string | null; total: string };
};

export async function getUSDCBalance(address: string) {
  const balanceEndpoint = `/cosmos/bank/v1beta1/balances/${address}`;
  const balanceResponse = await axios.get<BalanceResponse>(balanceEndpoint, {
    baseURL: nobleTestnet.rest,
  });
  return formatUSDCBalance(parseUSDCBalance(balanceResponse.data));
}

export function useUSDCBalance(address: string) {
  return useQuery({
    queryKey: ["usdcBalance", address],
    queryFn: () => getUSDCBalance(address),
    enabled: !!address,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

export function parseUSDCBalance(balance: BalanceResponse) {
  return balance.balances.find((balance) => balance.denom === "uusdc")?.amount;
}

export function formatUSDCBalance(balance?: string) {
  if (!balance) return undefined;
  const balanceNumber = Number(balance);
  const balanceHumanReadable = balanceNumber / 10 ** 6;
  return balanceHumanReadable.toFixed(2);
}
