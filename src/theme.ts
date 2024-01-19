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
                default: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(150,198,208,1) 100%)',
                _dark: 'radial-gradient(circle, rgba(14,22,33,1) 0%, rgba(23,38,57,1) 100%)',
            },
            secondaryBg: {
                default: '#d1e2ee',
                _dark: '#17212B',
            },
            leftMsg: {
                default: '#6eafce',
                _dark: '#143a67',
            },
            rightMsg: {
                default: '#5691dc',
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
                default: '#8b9aec',
                _dark: '#242F3D',
            }
        },
    },
})

export default theme