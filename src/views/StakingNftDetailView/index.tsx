import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useCallback, useMemo, } from 'react';
import useWindowSize from '~/hooks/useWindowSize';
import PrimaryButton from '~/components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { DATA_STAKING, ETypeStake } from '../StakingNftView/data-staking';
import { MAIN_ROUTERS } from '~/routes/routes';
import { ItemStakeAll } from './ItemStakeAll';
import { ItemStakeSingle } from './ItemStakeSingle';
import BoxLayout from '~/components/BoxLayout';

export const StakingNftDetailView = () => {

  const { width } = useWindowSize();
  const { id } = useParams()
  const navigate = useNavigate();

  const itemNft = useMemo(() => {
    const rs = DATA_STAKING.find(i => i.key === id);
    return rs || DATA_STAKING[0];
  }, [id])

  console.log({ itemNft });

  const renderBody = useCallback(() => {
    if (!itemNft) {
      return (
        <Flex justifyContent="center" alignItems="center" flex={1} h="100%">
          <VStack spacing="40px">
            <Text
              color="grey.66"
              textAlign="center"
              fontSize="18px"
              lineHeight="24px"
            >
              The page is not found
            </Text>
            <div>
              <PrimaryButton
                fontSize="20px"
                lineHeight="23px"
                fontWeight="500"
                letterSpacing="-0.5px"
                paddingRight="33px"
                paddingLeft="33px"
                onClick={() => navigate(MAIN_ROUTERS.STAKE_NFTS)}
              >
                Go to Staking
              </PrimaryButton>
            </div>
          </VStack>
        </Flex>
      )
    }
    if (itemNft.typeStake === ETypeStake.STAKE_ALL) {
      return (
        <ItemStakeAll
          {...itemNft}
        />
      )
    }
    return (
      <ItemStakeSingle
        itemNft={itemNft}
      />
    )
  }, [itemNft, navigate])


  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        {renderBody()}

      </BoxLayout>


    </MainLayout>
  )
}
