import {
  Box, useSteps, Step, StepDescription, StepIcon,
  StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Divider,
} from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import { Fragment, useCallback, useState } from 'react';
import useWindowSize from '~/hooks/useWindowSize';

import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import WrapperHeaderMobile from '~/layouts/MasterLayout/WrapperHeaderMobile';
import BoxLayout from '~/components/BoxLayout';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { ILauchPool } from '~/dto/ILauchPool';

const steps = [
  {
    title: 'Token Verification',
    description: '',
  },
  {
    title: 'Fairlaunch Information',
    description: '',
  },
  {
    title: 'Project Social Information',
    description: '',
  },
  {
    title: 'Project Preview',
    description: '',
  },
]

export const CreateFairLaunchView = () => {

  const { width, height } = useWindowSize();
  const { account } = useConnectWallet();

  const [launchPool, setLauchPool] = useState<ILauchPool>({
    chainId: null,
    tokenAddress: "",
    currency: "",
    fee: null,
    listingOption: null,
    tokensForPresale: null,
    softCap: null,
    routerAddress: "",
    liquidity: null,
    startTime: null,
    endTime: null,
    logo: "",
    website: "",
    facebook: "",
    twitter: "",
    github: "",
    telegram: "",
    instagram: "",
    discord: "",
    reddit: "",
    youtube: "",
    description: ""
  })

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  const renderSteps = useCallback(() => {

    const onSaveLauchPool = (values: ILauchPool) => {
      setLauchPool({
        ...launchPool,
        ...values,
      })
    }

    switch (activeStep) {
      case 1:
        return <Step1
          launchPool={launchPool}
          setActiveStep={() => { setActiveStep(activeStep + 1) }}
          onSaveLauchPool={(values: ILauchPool) => onSaveLauchPool(values)}
        />;
      case 2:
        return <Step2
          launchPool={launchPool}
          setActiveStep={() => { setActiveStep(activeStep + 1) }}
          onBack={() => { setActiveStep(activeStep - 1) }}
          onSaveLauchPool={(values: ILauchPool) => onSaveLauchPool(values)}
        />;
      case 3:
        return <Step3
          launchPool={launchPool}
          setActiveStep={() => { setActiveStep(activeStep + 1) }}
          onBack={() => { setActiveStep(activeStep - 1) }}
          onSaveLauchPool={(values: ILauchPool) => onSaveLauchPool(values)}
        />;
      case 4:
        return <Step4
          launchPool={launchPool}
          onBack={() => { setActiveStep(activeStep - 1) }}
        />;
      default:
        break;
    }
  }, [activeStep, launchPool, setActiveStep])

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          {width > 500 ?
            <Fragment>
              <Stepper index={activeStep} colorScheme={"orange"}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0' maxW={"70%"} textAlign={"start"}>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>
                        {step.description}
                      </StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <Divider py="10px" />
            </Fragment>
            : null
          }

          {renderSteps()}

          <Box h="15vh" />

        </Box>

      </BoxLayout>

      <Box h="20vh" />

    </MainLayout>
  )
}


