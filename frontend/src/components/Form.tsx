import React, { FormEvent, useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface FormProps {
    route: string;
    method: "login" | "register";
  }

function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const title = method === "login" ? "Login" : "Register"

    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <div className="w-full max-w-xs space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {loading ? (
                    <div className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-lg">Loading...</div>
                ) : (
                    <button
                        className="w-full p-3 bg-[#0c2b9c] text-white font-semibold rounded-lg shadow-md"
                        type="submit"
                    >
                        {title}
                    </button>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
                {method === "login" ? (
                    <p>Don't have an account? <a href="/register" className="text-[#0c2b9c] hover:underline">Register</a></p>
                ) : (
                    <p>Already have an account? <a href="/login" className="text-[#0c2b9c] hover:underline">Login</a></p>
                )}
            </div>
        </form>
    )
}

export default Form