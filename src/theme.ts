import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
    initialColorMode: 'dark',
    useSystemColorMode: false,
    semanticTokens: {
        colors: {
            error: 'red.500',
            text: {
                default: '#040502',
                _dark: '#F5F5F5',
            },
            primaryBg: {
                default: '#e3e5e8',
                _dark: '#0E1621',
            },
            secondaryBg:{
                default: '#d2d3db',
                _dark: '#17212B',
            },
        },
    },
})

export default theme