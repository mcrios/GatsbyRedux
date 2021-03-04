import React from "react"
import DashboardLayout from '../layout/DashboardLayout'
import AdminServer from "./admin/AdminView"

const AdminPage = () => {

    // useEffect(() => {
    //     if (typeof window !== `undefined` && typeof localStorage.getItem('token') === `undefined`)
    //         navigate('/')
    // }, [])

    return (
        <div style={{ backgroundColor: '#f4f6f8' }}>
            <DashboardLayout />
            <div className="margin-menu">
                <AdminServer />
            </div>
        </div>
    )
}
export default AdminPage