import { extendTheme, theme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const breakpoints = {
  base: 0,
  '320': '20em',
  '375': '23.4375em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  '2lg': '64em',
  '3lg': '68.75em',
  xl: '80em',
  xxl: '89em',
  '2xl': '96em',
  '3xl': '120em',
}

const customTheme = extendTheme({

  components: {
    Button: {

      baseStyle: {

        _focus: { boxShadow: 'none', background: 'transparent' },
        _active: { background: 'transparent', boxShadow: 'none' },
        _hover: { bg: 'transparent' },
      },

    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: "radial-gradient(50.59% 160.64% at 12.02% -26.12%, #F95F0B 0%, #E2103D 100%)",
    secondary: '#00052E',
    yellow: {
      //primary: 'rgba(254, 221, 68, 1)',
      primary: "linear-gradient(135deg,#de0245 -16.8%,#fd6e03 138.64%)",
      dark: '#ee3824',
    },
    blue: {
      darkest: 'rgba(29, 71, 161, 1)',
      darker: '#3A5EAA',
      neutral: '#448AFF',
      lighter: '#C7E1FF',
    },
    black: {
      '1d': '#fff',
      light: '#383C4A',
      lighter: '#464E5F',
    },
    cadet: '#5F6774',
    antiFlashWhite: '#dfdfdf',
    spanishGray: '#979797',
    grey: {
      '66': '#666666',
      c8: '#C8C8C8',
      '97': '#979797',
      light_blue: '#DFE6F1',
      light: '#F7F9FA',
      light1: '#F3F6F9',
    },
    hashtag: "#F29F50"
  },
  shadows: {
    ...theme.shadows,
    outline: 'none',
    default: '0px 0px 14px 0px rgba(186, 186, 186, 0.25)',
  },
  breakpoints,
})

export default customTheme
