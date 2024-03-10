import { BigNumber } from "ethers";
import { parseAmountToken } from "./block-chain.helper";
import { CHAIN_CODE } from "~/@config/chain-code";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
const MUL_DIR = 100;

export const calculateSwapRate = ({ amountIn = parseAmountToken(1), tokensForPresale, totalRaised }: { amountIn: BigNumber, tokensForPresale: BigNumber, totalRaised: BigNumber }) => {
  if (totalRaised.eq(0) || amountIn.eq(0)) {
    return parseAmountToken(0)
  }
  return amountIn.mul(tokensForPresale).div(totalRaised);
}


export const calculateAmountApprove = ({ tokensForPresale, percentForLiquidity, percentFeeRaised }: { tokensForPresale: number, percentForLiquidity: number, percentFeeRaised: number }) => {

  const ONE_HUNDRED_PERCENT = 100 * MUL_DIR;
  const tokensForLiquidity = parseAmountToken(tokensForPresale).mul(percentForLiquidity * MUL_DIR).mul(ONE_HUNDRED_PERCENT - percentFeeRaised * MUL_DIR)
    .div(ONE_HUNDRED_PERCENT).div(ONE_HUNDRED_PERCENT);

  return tokensForLiquidity.add(parseAmountToken(tokensForPresale));

}

export const calculateTokensForLiquidity = ({ tokensForPresale, percentForLiquidity, percentFeeRaised }: { tokensForPresale: number, percentForLiquidity: number, percentFeeRaised: number }) => {

  const ONE_HUNDRED_PERCENT = 100 * MUL_DIR;
  const tokensForLiquidity = parseAmountToken(tokensForPresale).mul(percentForLiquidity * MUL_DIR).mul(ONE_HUNDRED_PERCENT - percentFeeRaised * MUL_DIR)
    .div(ONE_HUNDRED_PERCENT).div(ONE_HUNDRED_PERCENT);

  return tokensForLiquidity;

}

export const wlAccounts = [
  "0x4A499535998e6CeAbDbcd3792B92737B9d41b59A".toLowerCase(),
  "0x68a44D9306084DDBc7b53142A218cc9cAb795c63".toLowerCase(),
  "0xb49dBfEF796737F777B70D2C5201341Ee61d31Ef".toLowerCase(),
  "0x934B04d4B0980cbd3Ba34A60b597Ed6b64605920".toLowerCase(),
  "0x60Cf1b129233172a673957EDbD176FA03252153A".toLowerCase(),
]

export const SUPPORT_CHAIN = [
  EVM_CHAIN_LIST[CHAIN_CODE.BSC_MAINNET],
  EVM_CHAIN_LIST[CHAIN_CODE.AVAX],
  EVM_CHAIN_LIST[CHAIN_CODE.POLYGON_MAINNET],
]
