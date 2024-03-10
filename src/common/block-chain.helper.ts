import { BigNumber, BigNumberish, utils } from "ethers"


export const parseAmountToken = (amount: string | number, decimal: number = 18) => {
  return utils.parseUnits(amount.toString(), decimal)
}
export const formatAmountToken = (amount: BigNumberish, decimal: number = 18) => {
  return utils.formatUnits(amount, decimal)
}


export function stringDateToUTCDate(dateStr: string) {
  const inputDate = new Date(dateStr);
  return new Date(inputDate.getTime() - inputDate.getTimezoneOffset() * 60000);
}

export const formatDateBlockChain = (blockchainTimestamp: number) => {
  const utcDate = new Date(blockchainTimestamp * 1000);
  const utcYear = utcDate.getUTCFullYear();
  const utcMonth = utcDate.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const utcDay = utcDate.getUTCDate();
  const utcHours = utcDate.getUTCHours();
  const utcMinutes = utcDate.getUTCMinutes();
  // const utcSeconds = utcDate.getUTCSeconds();

  return `${utcYear}/${utcMonth > 9 ? utcMonth : `0${utcMonth}`}/${utcDay} ${utcHours}:${utcMinutes}`

}

export const formatMoney = (value: string | undefined) => {
  if (!value) {
    return "";
  }
  if (value.charAt(0) === ".") {
    return `0${value}`;
  }
  value = value
    .replace(/\,/g, "") ?? "0"
  const arrStr = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").split(".");

  if (arrStr.length < 2) {
    return arrStr[0];
  }
  return `${arrStr[0]}.${arrStr[1].replace(/\,/g, "")}`

}

export function equalAddress(addressA: string, addressB: string) {
  return addressA.toLowerCase() === addressB.toLowerCase();
}

export const getMessageErrorBlockChain = (err: any) => {
  //const message = err?.data?.message ?? err?.message ?? (err?.reason ? err?.reason : 'Unknown'); // BNB
  const message = (err?.reason as string ?? 'Unknown').replace("execution reverted:", "").trim(); // ETH L2 ETH
  return message;
}


const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param rewardPerSeconds Amount of new cake allocated to the pool for each new se
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  { stakingTokenPrice,
    rewardTokenPrice,
    totalStaked,
    rewardPerSeconds }: {
      stakingTokenPrice: number,
      rewardTokenPrice: number,
      totalStaked: number,
      rewardPerSeconds: number,
    }
): number => {

  if (stakingTokenPrice === 0 || totalStaked === 0) {
    return undefined;
  }

  const totalRewardPricePerYear = rewardTokenPrice * rewardPerSeconds * SECONDS_PER_YEAR;
  const totalStakingTokenInPool = stakingTokenPrice * totalStaked;
  const apr = totalRewardPricePerYear * 100 / totalStakingTokenInPool
  return apr;
}
