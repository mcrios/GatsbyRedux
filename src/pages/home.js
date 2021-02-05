import { navigate } from "gatsby"
import React, { useEffect } from "react"
import DashboardLayout from '../layout/DashboardLayout'
import Dashboard from "./reports/DashboardView"

const HomePage = () => {

    useEffect(() => {
        if (typeof window !== `undefined` && typeof localStorage.getItem('token') === `undefined`)
            navigate('/')
    }, [])

    return (
        <div style={{ backgroundColor: '#f4f6f8' }}>
            <DashboardLayout />
            <div className="margin-menu">
                <Dashboard />
            </div>
        </div>
    )
}
export default HomePage