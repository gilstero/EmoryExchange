import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect, ReactNode } from "react"

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async() => {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN)

        console.log(refreshToken)

        try {
            const res = await api.post(
                "/api/token/refresh/", 
                { refresh: refreshToken }, 
                { headers: { 'Content-Type': 'application/json' }}
            )
            if (res.status === 200) {
                sessionStorage.setItem(ACCESS_TOKEN, res.data.access_token)
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            sessionStorage.removeItem(ACCESS_TOKEN)
            sessionStorage.removeItem(REFRESH_TOKEN)
            setIsAuthorized(false)
            throw error
        }
    }

    const auth = async () => {
        const token = sessionStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        
        try {
            const decoded = jwtDecode(token)
            const tokenExpiration = decoded.exp
            const currentTimeInSeconds = Math.floor(Date.now() / 1000)  // Convert milliseconds to seconds
    
            if (!tokenExpiration) {
                setIsAuthorized(false)
                return
            }
    
            if (tokenExpiration < currentTimeInSeconds) {
                await refreshToken()
            } else {
                setIsAuthorized(true)
            }
        } catch (error) {
            console.error("Error decoding token:", error)
            setIsAuthorized(false)
        }
    }

    if (isAuthorized === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return isAuthorized ? children : <Navigate to="/login" />
}
