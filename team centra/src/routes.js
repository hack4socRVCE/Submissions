import Dashboard from "views/Dashboard.js";
import LeadManagement from "views/LeadManagement.js";
import Payment from "views/Payment.js";
import Userdata from "views/Userdata.js";
import Invoice from "views/Invoice.js";
import UserPage from "views/Entries.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Payment",
    icon: "nc-icon nc-diamond",
    component: <Payment />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Invoice",
    icon: "nc-icon nc-pin-3",
    component: <Invoice />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Lead Management",
    icon: "nc-icon nc-bell-55",
    component: <LeadManagement />,
    layout: "/admin",
  },
  {
    path: "/LeadManagement",
    name: "Entries",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "User Data",
    icon: "nc-icon nc-tile-56",
    component: <Userdata />,
    layout: "/admin",
  },

];
export default routes;
