
import { ToastContainer } from 'react-toastify';




export default function UserLayout({ children }) {
    return (
        <>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
