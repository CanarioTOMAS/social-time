import FooterAdmin from "@/features/shared/components/dashboard/components/footers/footerAdmin";
import Sidebar from "@/features/shared/components/dashboard/components/sideBar/sideBar";
import DashboardComponent from "@/features/shared/components/dashboard/dashboard";


export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
        <Sidebar />
        {children}
        <FooterAdmin/>
      </div>
    );
  }
  