import FooterAdmin from "@/features/shared/components/dashboard/components/footers/footerAdmin";
import Sidebar from "@/features/shared/components/dashboard/components/sideBar/sideBar";
import { NavBar } from "@/features/shared/components/navBar/NavBar";
import ResponsiveAppBar from "@/features/shared/components/navBar/NavBarMenu";


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
  