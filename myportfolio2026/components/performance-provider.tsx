"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { isLowEndDevice as checkLowEndDevice } from "@/lib/device-performance"

interface PerformanceContextType {
    performanceMode: boolean
    setPerformanceMode: (value: boolean) => void
    isLowEndDevice: boolean
}

const PerformanceContext = createContext<PerformanceContextType>({
    performanceMode: false,
    setPerformanceMode: () => { },
    isLowEndDevice: false,
})

export function usePerformance() {
    return useContext(PerformanceContext)
}

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
    const [performanceMode, setPerformanceModeState] = useState(false)
    const [isLowEndDevice, setIsLowEndDevice] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        const isLowEnd = checkLowEndDevice()
        setIsLowEndDevice(isLowEnd)

        // Load saved preference or auto-detect
        const savedMode = localStorage.getItem("performance-mode")
        if (savedMode !== null) {
            setPerformanceModeState(savedMode === "true")
        } else {
            // Auto-enable for low-end devices
            setPerformanceModeState(isLowEnd)
        }
    }, [])

    const setPerformanceMode = (value: boolean) => {
        setPerformanceModeState(value)
        localStorage.setItem("performance-mode", String(value))
    }

    return (
        <PerformanceContext.Provider value={{ performanceMode, setPerformanceMode, isLowEndDevice }}>
            {children}
        </PerformanceContext.Provider>
    )
}
