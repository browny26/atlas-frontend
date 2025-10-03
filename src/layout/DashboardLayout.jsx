import {
  Bars3Icon,
  XMarkIcon,
  ViewColumnsIcon,
  UsersIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  CalendarIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";
import Backdrop from "./Backdrop";

// const LayoutContent = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const menuItems = [
//     { label: "Dashboard", icon: <ViewColumnsIcon className="w-5 h-5" /> },
//     {
//       label: "Content Performance",
//       icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
//     },
//     { label: "Audience Insights", icon: <UsersIcon className="w-5 h-5" /> },
//     { label: "Engagement Metrics", icon: <ChartPieIcon className="w-5 h-5" /> },
//     {
//       label: "Hashtag Performance",
//       icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />,
//       badge: 3,
//     },
//     {
//       label: "Competitor Analysis",
//       icon: <UserGroupIcon className="w-5 h-5" />,
//     },
//     { label: "Campaign Tracking", icon: <ClockIcon className="w-5 h-5" /> },
//     { label: "Settings & Integrations", icon: <CogIcon className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
//           ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } lg:translate-x-0 lg:static`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Close button mobile */}
//           <button
//             className="lg:hidden self-end m-2 p-2 text-gray-600 hover:text-gray-900"
//             onClick={toggleSidebar}
//           >
//             <XMarkIcon className="w-6 h-6" />
//           </button>

//           {/* Avatar / User info */}
//           <div className="flex flex-col items-center gap-3 border-b border-gray-200 p-4">
//             <img
//               className="w-16 h-16 rounded-full"
//               src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
//               alt="avatar"
//             />
//             <div className="text-center">
//               <h3 className="text-lg font-semibold text-base-content">
//                 Mitchell Johnson
//               </h3>
//               <p className="text-sm text-base-content/80">flyonui@mitchell</p>
//             </div>
//           </div>

//           {/* Menu */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <ul className="flex flex-col gap-1">
//               {menuItems.map((item) => (
//                 <li key={item.label}>
//                   <a
//                     href="#"
//                     className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-200"
//                   >
//                     {item.icon}
//                     <span className="flex-1">{item.label}</span>
//                     {item.badge && (
//                       <span className="ml-auto inline-block px-2 py-0.5 text-xs font-semibold bg-green-500 text-white rounded-full">
//                         {item.badge}
//                       </span>
//                     )}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Footer */}
//           <div className="p-4 border-t border-gray-200 text-center text-sm">
//             © 2025 Dashboard
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 transition-all duration-300 ease-in-out">
//         {/* Header */}
//         {/* <header className="bg-white sticky top-0 z-40 flex items-center justify-between h-16 px-4 border-b border-base-content/20 lg:hidden">
//           <button
//             className="p-2 text-gray-600 hover:text-gray-900"
//             onClick={toggleSidebar}
//           >
//             <Bars3Icon className="w-6 h-6" />
//           </button>
//           <h1 className="text-lg font-semibold">Dashboard</h1>
//           <div></div>
//         </header> */}

//         {/* <Header /> */}
//         <DashboardHeader />

//         {/* Main */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>

//         {/* Footer */}
//         <footer className="bg-white">
//           <div className="mx-auto h-14 w-full max-w-7xl px-6"></div>
//         </footer>
//       </div>
//     </div>
//   );
// };

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <DashboardSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <DashboardHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
