import React from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
function Stats() {
  return (
    <div className="mt-2 flex flex-row gap-4 pt-8 w-full">
      <div
        className="w-full flex py-8 px-12 flex-col items-start justify-center rounded-md border border-dashed border-gray-500 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
      >
        <div className="flex flex-row items-center justify-start">
          <AccountBalanceWalletIcon
            fontSize={"large"}
            className="mr-3 text-gray-500"
          />
          <span className="font-bold text-gray-600 text-4xl">₱ 4,200.82</span>
        </div>
        <div className="mt-2 text-gray-400 text-2xl">Faculty and Staff</div>
      </div>

      <div
        className="w-full flex py-8 px-12 flex-col items-start justify-center rounded-md border border-dashed border-gray-500 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
      >
        <div className="flex flex-row items-center justify-start">
          <AccountBalanceWalletIcon fontSize={"large"} className="mr-3 text-gray-500" />
           <span className="font-bold text-gray-600 text-4xl">₱ 4,200.82</span>
        </div>
        <div className="mt-2 text-gray-400 text-2xl">Job Order</div>
      </div>

      <div
        className="w-full flex py-8 px-12 flex-col items-start justify-center rounded-md border border-dashed border-gray-500 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
      >
        <div className="flex flex-row items-center justify-start">
          <AccountBalanceWalletIcon
            fontSize={"large"}
            className="mr-3 text-gray-500"
          />
          <span className="font-bold text-gray-600 text-4xl">₱ 4,200.82</span>
        </div>
        <div className="mt-2 text-gray-400 text-2xl">VL/COS</div>
      </div>
    </div>
  );
}

export default Stats;
