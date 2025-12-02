import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { getAccountWithTransactions, getSubAccounts, getSubAccTransactionRel } from "@/actions/accounts";
import { getCashflowEnding } from "@/actions/cashflow";
import TransactionTable from "..//_components/transaction_table";
import SideNavBar from "@/components/sideNav";
import { getStaff, getUnauthUser } from "@/actions/admin";
import NotFound from "@/app/not-found";
import { Notable, Unica_One, Zen_Kaku_Gothic_Antique } from "next/font/google";
import AccountChart from "../_components/account-chart";


const fontZenKaku = Zen_Kaku_Gothic_Antique({
  subsets:["latin"],
  weight: "400",
})

const fontNotable = Notable({
  subsets: ["latin"],
  weight: [ "400"]
})

async function AccountsPage({ params }) {
  const user = await getStaff();
  

  if(!user.authorized){
    await getUnauthUser();
    return NotFound();
  }
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);
  const subAccounts = await getSubAccounts(id);
  const recentCashflows = await getCashflowEnding(id)
  const SubAccTransactionRel = await getSubAccTransactionRel(id);



  const relatedIDs = SubAccTransactionRel.data.map(rel => rel.transactionId);
  const relatedSubAccIDs = Array.from(new Set(SubAccTransactionRel.data.map(rel => String(rel.subAccountId || "")))).filter(Boolean)

  const subAccTransactionRel = SubAccTransactionRel.data;
  // const recentCashflows = fetchedCashflows.latestCashflows;

  const { transactions, ...account } = accountData; //extract transacs and acc data
  // const cashflow = await getCashflow(id);

  if (!accountData) {
    notFound();
  }

  function formatNumberWithCommas(number) {
    return Number(number).toLocaleString();
  }

 return (
    <div className="space-y-8 px-5">
      <div className="flex flex-col md:flex-row sm:justify-between">
        <div className="md:flex items-center">
          <SideNavBar accountId={id} />
        </div>
        <div className="text-center">

          <h1 className={`text-6xl md:text-[5rem]/[1] ${fontNotable.className} font-normal tracking-wide md:tracking-widest capitalize`}>
            {account.name}
          </h1>
          <p className={`${fontZenKaku.className} text-md text-gray-500`}>
            {formatNumberWithCommas(account._count.transactions)} Transactions
          </p>
        </div>
        <div></div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart id={id} transactions={transactions} />
      </Suspense>

      {/* Transaction Table */}
      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color={"#9333ea"} />
        }
      >
        <TransactionTable
          relatedIDs={relatedIDs}
          relatedSubAccIDs={relatedSubAccIDs}
          subAccTransactionRel={subAccTransactionRel}
          recentCashflows={recentCashflows}
          transactions={transactions}
          id={id}
          subAccounts={subAccounts}
        />
      </Suspense>
    </div>
  );
}

export default AccountsPage;
