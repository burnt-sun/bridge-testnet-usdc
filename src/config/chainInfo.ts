export const nobleTestnet = {
  chainId: "grand-1",
  chainName: "Noble Testnet",
  rpc: "https://rpc.testnet.noble.xyz",
  rest: "https://api.testnet.noble.xyz",
  nodeProvider: {
    name: "Noble",
    email: "hello@nobleassets.xyz",
    website: "https://www.noble.xyz",
  },
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/chain.png",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "noble",
    bech32PrefixAccPub: "noblepub",
    bech32PrefixValAddr: "noblevaloper",
    bech32PrefixValPub: "noblevaloperpub",
    bech32PrefixConsAddr: "noblevalcons",
    bech32PrefixConsPub: "noblevalconspub",
  },
  currencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: "uusdc",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusdc.png",
    },
    {
      coinDenom: "USDY",
      coinMinimalDenom: "ausdy",
      coinDecimals: 18,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/ausdy.png",
    },
    {
      coinDenom: "USYC",
      coinMinimalDenom: "uusyc",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusyc.png",
    },
    {
      coinDenom: "EURe",
      coinMinimalDenom: "ueure",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/ueure.png",
    },
    {
      coinDenom: "USDN",
      coinMinimalDenom: "uusdn",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusdn.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: "uusdc",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusdc.png",
      gasPriceStep: {
        low: 0.1,
        average: 0.1,
        high: 0.2,
      },
    },
  ],
  features: [],
};
