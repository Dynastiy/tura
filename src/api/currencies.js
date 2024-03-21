const currencies = [
  {
    wallet_id: "usdt_interest",
    wallet_name: "USDT Interest",
    currencies_to: [
      {
        wallet_id: "tusd",
        wallet_name: "TUSD Wallet",
      },
    ],
  },

  {
    wallet_id: "usdt_referral_bonus",
    wallet_name: "USDT Referral Bonus",
    currencies_to: [
      {
        wallet_id: "usdt",
        wallet_name: "USDT Main Wallet",
      },
    ],
  },

  {
    wallet_id: "usdt",
    wallet_name: "USDT Wallet",
    currencies_to: [
      {
        wallet_id: "tusd",
        wallet_name: "TUSD Wallet",
      },
    ],
  },
];

export default currencies;
