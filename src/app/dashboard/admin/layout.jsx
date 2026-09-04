import SideBar from "@/app/dashboard/admin/SideBar";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AdminLayout({ children }) {
    return (
        <ThemeProvider>
            <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 dark:bg-slate-900">
                <SideBar />
                <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </ThemeProvider>
    );
}