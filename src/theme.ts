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
            secondaryText:{
                default: '#5A6670',
                _dark: '#5A6670'
            },
            primaryBg: {
                default: 'radial-gradient(circle, #F4FBFF, #EAF6FF, #DFF0FF, #F8FCFF)',
                _dark: '#01030b',
            },
            secondaryBg: {
                default: '#FFF9F6',
                _dark: '#17212B',
            },
            leftMsg: {
                default: '#84c6f3',
                _dark: '#143a67',
            },
            rightMsg: {
                default: '#b2bbfa',
                _dark: '#2B5278',
            },
            icons: {
                default: '#5A6670',
                _dark: '#5A6670',
            },
            borders: {
                default: '#80888d',
                _dark: '#0A121B',
            },
            inputBg: {
                default: '#ececf1',
                _dark: '#242F3D',
            }
        },
    },
})

export default theme