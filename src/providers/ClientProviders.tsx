'use client'

import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/theme'
import { ReactNode } from 'react';

export const ClientProviders = ({ children }: { children: ReactNode }) => {
    return (

        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </QueryClientProvider>)
}
