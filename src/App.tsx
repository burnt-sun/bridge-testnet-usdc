import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendIbcTokens,
  useStargateSigningClient,
} from "graz";
import { useQueryClient } from "@tanstack/react-query";
import { GasPrice } from "@cosmjs/stargate";
import { useUSDCBalance } from "./data/actions";
import { BaseButton } from "./components/Button";
import { SubHeader } from "./components/SubHeader";
import { Title } from "./components/Title";
import { ExternalIcon } from "./components/ExternalIcon";
import SpinnerV2 from "./components/SpinnerV2";

function App() {
  const { connect } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signingClient } = useStargateSigningClient({
    opts: { gasPrice: GasPrice.fromString("0.1uusdc") },
  });
  const {
    sendIbcTokensAsync,
    isLoading: isSending,
    isSuccess,
  } = useSendIbcTokens();
  const queryClient = useQueryClient();
  const { data: balanceData, isLoading } = useUSDCBalance(
    account?.bech32Address || ""
  );

  const [usdcBalance, setUsdcBalance] = useState<string | undefined>(undefined);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      setAmount("");
      setRecipientAddress("");
      queryClient.invalidateQueries({ queryKey: ["usdcBalance"] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 10000);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (balanceData) {
      setUsdcBalance(balanceData);
    }
  }, [balanceData]);

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ chainId: "grand-1" });
    }
  };

  const handleRequestUSDC = () => {
    window.open("https://faucet.circle.com/", "_blank");
  };

  const handleBridgeUSDC = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!account || !recipientAddress || !amount) {
      return;
    }

    const sendResult = await sendIbcTokensAsync({
      signingClient: signingClient!,
      recipientAddress,
      transferAmount: {
        denom: "uusdc",
        amount: (Number(amount) * 10 ** 6).toString(),
      },
      sourcePort: "transfer",
      sourceChannel: "channel-333",
      fee: "auto",
      memo: "",
      timeoutTimestamp: Date.now() + 1000 * 60 * 5,
    });

    setTxHash(sendResult.transactionHash);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col gap-2 lg:gap-12">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-6">
          <Title>Get USDC</Title>
          <p className="text-lg text-gray-500 max-w-md text-center">
            Bridge USDC from Noble Testnet to XION testnet-2
          </p>
        </div>
        {/* Step 1 */}
        <div className="flex flex-col items-start justify-center gap-4 py-3 px-4 border border-gray-800 rounded-lg w-full">
          <SubHeader>1. Connect to Noble Testnet (grand-1)</SubHeader>
          <div className="flex flex-col gap-2 w-full">
            <BaseButton onClick={handleConnect} className={"cursor-pointer"}>
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </BaseButton>
            {isConnected && (
              <p className="text-sm text-gray-500 max-w-md text-center">
                {account?.bech32Address}
              </p>
            )}
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex items-start justify-between gap-4 py-3 px-4 border border-gray-800 rounded-lg w-full">
          <div className="flex flex-col justify-center gap-2">
            <SubHeader>2. USDC Balance</SubHeader>
            {isConnected ? (
              isLoading ? (
                <p className="text-sm text-gray-500">Loading balance...</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {usdcBalance
                    ? `${usdcBalance} USDC `
                    : "No USDC balance found"}{" "}
                  on grand-1
                </p>
              )
            ) : (
              <p className="text-sm text-gray-500">
                Connect wallet to view balance.
              </p>
            )}
          </div>
          <BaseButton onClick={handleRequestUSDC} className={"cursor-pointer"}>
            Request USDC <ExternalIcon />
          </BaseButton>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-start justify-center gap-4 py-3 px-4 border border-gray-800 rounded-lg w-full">
          <SubHeader>3. Bridge USDC to XION testnet-2</SubHeader>
          {!isConnected && (
            <p className="text-sm text-gray-500">Connect wallet to bridge.</p>
          )}
          {/* begin form */}
          {isConnected && Number(usdcBalance) > 0 && (
            <form
              onSubmit={handleBridgeUSDC}
              className="flex flex-col gap-2 w-full"
            >
              <input
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full p-2 border border-gray-800 rounded-lg"
                type="text"
                placeholder="XION Address"
              />
              <div className="flex w-full justify-between gap-2 items-center">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-800 rounded-lg"
                  type="text"
                  placeholder="Amount"
                />
                <p>USDC</p>
              </div>
              <BaseButton
                type="submit"
                className={"cursor-pointer disabled:opacity-50"}
                disabled={isSending}
              >
                {isSending ? <SpinnerV2 /> : "Bridge USDC"}
              </BaseButton>
              {success && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-white bg-green-500 rounded-lg p-2">
                    Success!
                  </p>
                  <a
                    href={`https://www.mintscan.io/noble-testnet/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on MintScan
                  </a>
                </div>
              )}
            </form>
          )}
          {/* end form */}
        </div>
      </div>
    </div>
  );
}

export default App;
