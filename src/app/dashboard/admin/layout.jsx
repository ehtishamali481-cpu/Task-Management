import SideBar from "@/app/dashboard/admin/SideBar";
import { ToastContainer } from 'react-toastify';




export default function AdminLayout({ children }) {
    return (
        <>

            <SideBar />
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
