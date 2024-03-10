import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { ReactComponent as ToastErrorIcon } from '~/assets/svgs/toast-error.svg'
import { ReactComponent as ToastInformationIcon } from '~/assets/svgs/toast-infomation.svg'
import { ReactComponent as ToastSuccess } from '~/assets/svgs/toast-success.svg'
import { ReactComponent as ToastWarning } from '~/assets/svgs/toast-warning.svg'
import { pipeLongTextUi } from "~/common/utils/common.utils"

const getIconByType = (type) => {
  switch (type) {
    case 'success':
      return ToastSuccess
    case 'info':
      return ToastInformationIcon
    case 'warning':
      return ToastWarning
    case 'error':
      return ToastErrorIcon
    default:
      return ToastSuccess
  }
}

const useCustomToast = () => {
  const show = useCallback(
    ({ title = '', subTitle = '', description = '', type = 'success' }: {
      title?: string, subTitle?: string, description?: string, type: "success" | "info" | "warning" | "error"
    }) => {
      toast(
        <Box>
          <HStack align="flex-start" spacing="2" overflow="hidden">
            <Box>
              <Icon as={getIconByType(type)} w="20px" h="20px" />
            </Box>
            <Box flex={1} overflow="hidden" width="100%">
              <Text
                fontWeight="600"
                fontSize="13px"
                textTransform="uppercase"
                color="secondary"
              >
                {title}
              </Text>

              <Box flex={1}>
                <Text
                  fontWeight="500"
                  fontSize="13px"
                  lineHeight="22.4px"
                  color="subText"
                  wordBreak="break-word"
                >
                  {subTitle}
                </Text>
                {description && description.includes("https") ?
                  <Text
                    fontWeight="400"
                    fontSize="10px"
                    lineHeight="18px"
                    color="blue.neutral"
                    wordBreak="break-word"
                    as="span"
                    cursor={"pointer"}
                    onClick={() => {
                      window.open(description)
                    }}
                  >
                    {description}
                  </Text>
                  : <Text
                    fontWeight="400"
                    fontSize="10px"
                    lineHeight="18px"
                    color="subText"
                    wordBreak="break-word"
                    as="span"
                  >
                    {description}
                  </Text>
                }

              </Box>
            </Box>
          </HStack>
        </Box>,
        {
          position: toast.POSITION.TOP_RIGHT,
          isLoading: false,
          hideProgressBar: false,
          closeButton: true,
          autoClose: 4000,

          style: {
            border: '1px solid #F5F5F5',
            borderRadius: '12px',
            boxShadow: '0px 0px 14px rgba(186, 186, 186, 0.25)',
          },
        },
      )
    },
    [],
  )


  const success = useCallback(({ title = 'DONE', subTitle = '', description = '' }) => {
    show({
      title,
      subTitle,
      description,
      type: 'success',
    })
  }, [show])

  const handleError = useCallback(
    (error: any) => {
      const message = error?.data?.message ?? error?.message ?? (error?.reason ? error?.reason : 'Unknown')
      show({
        title: 'Failed',
        description: message,
        type: 'error',
      })
    },
    [show],
  )

  const handleErrorBlockChain = useCallback(
    (error: any) => {
      const message = (error?.reason as string ?? 'Unknown').replace("execution reverted:", "").trim();
      show({
        title: 'Failed',
        description: message,
        type: 'error',
      })
    },
    [show],
  )

  return {
    show,
    success,
    handleError,
    handleErrorBlockChain,
  }
}

export default useCustomToast
