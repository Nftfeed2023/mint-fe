

import { Button } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from 'react'
import { formatAmountToken } from "~/common/block-chain.helper";


type IButtonPromotionProps = {
  qty: number;
  percent: number;
  getPromotionAmountByQty: any;
  mintByQty: any
  isLoading: boolean;
  disabled: boolean;
  symbol: string;
}

const ButtonPromotion: FC<IButtonPromotionProps> = (props: IButtonPromotionProps) => {

  const { qty, getPromotionAmountByQty, mintByQty, isLoading, percent, disabled, symbol } = props;
  const [amountOut, setAmountOut] = useState('');


  const loadData = useCallback(async () => {
    const amount = await getPromotionAmountByQty(qty);
    setAmountOut(amount);

  }, [getPromotionAmountByQty, qty])

  useEffect(() => {
    loadData()
  }, [loadData]);


  const onMint = useCallback(async () => {
    await mintByQty(qty);
  }, [mintByQty, qty])

  return (
    <Button
      bg="yellow.primary !important"
      borderRadius="8px"
      fontWeight="600"
      fontSize="15px"
      lineHeight="18px"
      h="auto"
      py="5px"
      color="#fff"
      w="full"
      p="10px"
      onClick={onMint}
      isLoading={isLoading}
      disabled={disabled}
    >

      {`Mint ${qty} for ${amountOut} ${symbol}  ${percent && percent > 0 ? `(-${percent / 100}%)` : ``}`}
    </Button>
  );
}
export default ButtonPromotion;
