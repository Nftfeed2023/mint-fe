

import { Button } from "@chakra-ui/button";
import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/input";
import { SimpleGrid } from "@chakra-ui/layout";
import { Contract } from "ethers";
import React, { FC, useCallback, useEffect, useState } from 'react'
import { configEnv } from "~/@config";
import { CHAIN_CODE } from "~/@config/chain-code";

import { ApiException } from "~/@core/dto";
import { MintNftFactoryV2__factory, MintNftFactoryV2 } from "~/abi";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";

const { customSMC, CONNECTORS } = configEnv();

type IMintQtyProps = {
  address: string;
  isLoading: boolean;
  disabled: boolean;
  isMinted: boolean;
  mintByQty: any;
  getPromotionAmountByQty: any;
  symbol: string
}

const MintQty: FC<IMintQtyProps> = (props: IMintQtyProps) => {
  const { address, isLoading, disabled, isMinted, mintByQty, getPromotionAmountByQty, symbol } = props;

  const { account, chainId, provider } = useConnectWallet();
  const toast = useCustomToast();
  const [qty, setQty] = useState('1');
  const [amountOut, setAmountOut] = useState('');

  const [percent, setPercent] = useState(0);


  const loadPercentPromotion = useCallback(async () => {
    const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];
    const poolFactory = new Contract(
      MINT_NFT_FACTORY_V2,
      MintNftFactoryV2__factory.abi,
      provider
    ) as MintNftFactoryV2;

    const res = await poolFactory.getPromotionPercentByQty(address, qty).then(t => t.toNumber()).catch(_ => 0)
    setPercent(res / 100)
  }, [address, chainId, provider, qty])

  const loadData = useCallback(async () => {
    const amount = await getPromotionAmountByQty(qty);
    setAmountOut(amount);
  }, [getPromotionAmountByQty, qty]);


  useEffect(() => {
    loadPercentPromotion()
  }, [loadData, loadPercentPromotion]);

  useEffect(() => {
    loadData()
  }, [loadData]);


  const onMintByQty = useCallback(async () => {
    try {
      if (!qty || isNaN(Number(qty))) {
        throw new ApiException("Qty invalid")
      }
      if (Number(qty) > 40) {
        throw new ApiException("Qty over 40")
      }
      await mintByQty(Number(qty));
    } catch (error) {
      toast.handleError(error)
    }
  }, [mintByQty, qty, toast]);




  return (
    <SimpleGrid
      mt="10px"
      w="full"
      columns={{ base: 1, md: 2 }}
      spacing={2}
    >
      <InputGroup
      >
        <InputLeftAddon
          pointerEvents='none'
          children={`Qty mint ${chainId === CHAIN_CODE.ZETACHAIN_MAINNET || chainId === CHAIN_CODE.ZETACHAIN_TESTNET ? `(max 40)` : ''}`}
        />
        <Input
          placeholder='Input quantity'
          borderRadius={"2px"}
          type="number"
          //  border="1px solid #E53E3E !important"
          color={"#000"}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </InputGroup>
      <Button
        bg="yellow.primary !important"
        borderRadius="8px"
        fontWeight="600"
        fontSize="16px"
        lineHeight="18px"
        h="auto"
        py="5px"
        color="black.1d"
        w="full"
        p="10px"
        onClick={onMintByQty}
        isLoading={isLoading}
        disabled={disabled}
      >
        {isMinted ? "Minted" : `Mint for ${amountOut} ${symbol || ""} ${percent && percent > 0 ? `(-${percent}%)` : ``}`}
      </Button>
    </SimpleGrid>
  )
}
export default MintQty;
