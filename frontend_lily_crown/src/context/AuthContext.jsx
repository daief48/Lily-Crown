"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("lily_user");
                const token = localStorage.getItem("lily_auth_token");

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser));

                    // Optional: Validate token with backend
                    /*
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
                    const response = await fetch(`${API_URL}/user`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (!response.ok) logout();
                    */
                }
            } catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem("lily_user");
                localStorage.removeItem("lily_auth_token");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Invalid credentials");
            }

            const data = await response.json();

            setUser(data.user);
            localStorage.setItem("lily_user", JSON.stringify(data.user));
            localStorage.setItem("lily_auth_token", data.token);

            return { success: true };

        } catch (error) {
            console.error("Login failed", error);
            return { success: false, message: error.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, password, password_confirmation })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const data = await response.json();

            setUser(data.user);
            localStorage.setItem("lily_user", JSON.stringify(data.user));
            localStorage.setItem("lily_auth_token", data.token);

            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, message: error.message || "Registration failed" };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("lily_auth_token");
            if (token) {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }).catch(() => { }); // Ignore error on logout
            }

            setUser(null);
            localStorage.removeItem("lily_user");
            localStorage.removeItem("lily_auth_token");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
