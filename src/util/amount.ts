import { nobleTestnet } from "../config/chainInfo";

/**
 * Converts a human-readable amount to the minimal denom format
 */
export function toMinimalDenom(amount: number): string {
  return Math.floor(
    amount * 10 ** nobleTestnet.defaultCurrency.coinDecimals
  ).toString();
}

/**
 * Converts a minimal denom amount to a human-readable format
 */
export function fromMinimalDenom(amount: string): number {
  return Number(amount) / 10 ** nobleTestnet.defaultCurrency.coinDecimals;
}

/**
 * Formats a minimal denom amount as a human-readable string with fixed decimals
 */
export function formatAmount(amount: string, decimals: number = 2): string {
  return fromMinimalDenom(amount).toFixed(decimals);
}
