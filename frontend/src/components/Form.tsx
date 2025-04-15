import React, { FormEvent, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

interface FormProps {
    route: string;
    method: "login" | "register"
  }

function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()

        console.log(route)
        console.log(method)

        if (method === "login") {
            try {
                const res = await api.post(route, {email, password})
                console.log("Response: ", res)
                sessionStorage.setItem(ACCESS_TOKEN, res.data.access_token)
                sessionStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
                navigate("/marketplace")

            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }

        else if (method === "register") {
            if (phone.length !== 10) {
                alert("Phone number must be exactly 10 digits")
                return
            }

            try {
                const res = await api.post(route, {
                    real_name: fullname,
                    profile_name: username,
                    email: email,
                    password: password,
                    phone_num: phone
                })
                console.log("Response: ", res)
                navigate("/login")
    
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }

        
    }

    const title = method === "login" ? "Login" : "Register"

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4 mt-8">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <div className="w-full max-w-xs space-y-4">
                {method === "register" && 
                    <input
                        className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Full Name"
                    />
                }
                {method === "register" && 
                    <input
                        className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                }
                {method === "register" && 
                    <input
                        className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            let cleaned = e.target.value.replace(/\D/g, "")
                            if (cleaned.length > 10) return
                            setPhone(cleaned)
                        }}
                        placeholder="Phone Number"
                    />
                }
                <input
                    className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (@emory.edu)"
                />
                <input
                    className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {loading ? (
                    <div className="flex justify-center items-center p-2 bg-[#0c2b9c] text-white rounded-lg">Loading...</div>
                ) : (
                    <button
                        className="w-full p-3 bg-[#0c2b9c] text-white font-semibold rounded-lg shadow-md cursor-pointer"
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