'use client'

import { Button } from "@mui/material"

export const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = '/api/auth?action=login'
    }
    return (
        <Button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleLogin}
        >
            Entrar
        </Button>
    )
}