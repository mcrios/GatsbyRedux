import { navigate } from "gatsby-link"
import React from "react"
import DashboardLayout from '../layout/DashboardLayout'
import AdminServer from "./admin/AdminView"

const AdminPage = () => {
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
                    <AdminServer />
                </div>
            </div>
        )
    }
}
export default AdminPage