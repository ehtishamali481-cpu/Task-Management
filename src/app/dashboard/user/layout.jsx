import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "@/components/ThemeProvider";

export default function UserLayout({ children }) {
    return (
        <ThemeProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
    );
}
