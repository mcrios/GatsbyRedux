import { navigate } from "gatsby-link"
import React from "react"
import DashboardLayout from '../layout/DashboardLayout'
import Params from "./params/ParamsView"

const ParamsPage = () => {
    if (typeof window !== `undefined` && localStorage.getItem('token') === null) {
        return (
            <div>
                {navigate('/')}
            </div>
        )
    } else {
        return (
            <div style={{ backgroundColor: '#f4f6f8' }}>
                <DashboardLayout />
                <div className="margin-menu">
                    <Params />
                </div>
            </div>
        )
    }
}
export default ParamsPage