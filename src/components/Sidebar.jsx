import { useState } from "react";
import { getUserInfoFromToken } from "../utils/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AssessmentIcon from "@mui/icons-material/Assessment";
import UpdateIcon from "@mui/icons-material/Update";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("userInfo");
  const userInfo = getUserInfoFromToken(token);
  console.log(userInfo);

  let role = "Faculty/Staff";

  if (userInfo?.is_staff) {
    const office = userInfo.first_name?.trim();

    if (
      office === "HR Office" ||
      office === "Budget Office" ||
      office === "Office of the President"
    ) {
      role = "HR/Accounting";
    } else if (office === "Cashier") {
      role = "Cashier";
    }
  }

  const menuItems = {
    "HR/Accounting": [
      // { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      { name: "Scan QR", path: "/qr-scanner", icon: <QrCodeScannerIcon /> },
      { name: "Evaluate DTR", path: "/DTR", icon: <AssessmentIcon /> },
      // { name: "Payroll Lists", path: "/payroll-lists", icon: <ListAltIcon /> },
    ],
    Cashier: [
      // { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      { name: "Evaluate Payroll", path: "/DTR", icon: <AssessmentIcon /> },
      { name: "Scan QR", path: "/qr-scanner", icon: <QrCodeScannerIcon /> },
      // { name: "Payroll Lists", path: "/payroll-lists", icon: <ListAltIcon /> },
    ],
    "Faculty/Staff": [
      // {
      //   name: "Payroll History",
      //   path: "/payroll-history",
      //   icon: <HistoryIcon />,
      // },
      { name: "Payroll Status", path: "/payroll-status", icon: <InfoIcon /> },
      { name: "Scan QR", path: "/qr-scanner", icon: <QrCodeScannerIcon /> },
    ],
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: 250,
        bgcolor: "#121e31",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <div>
        {/* User Info */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <AccountCircleIcon fontSize="large" />
          <Box>
            <Typography variant="body1">{userInfo?.first_name}</Typography>
            <Typography variant="caption" color="gray">
              {role}
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <ul className="space-y-2">
          {menuItems[role]?.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors 
                  ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}

          <Link
            to={"/"}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
          >
            <LogoutIcon />
            Logout
          </Link>
        </ul>
      </div>
    </Box>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <AppBar
        position="fixed"
        sx={{ display: { xs: "flex", md: "none" }, bgcolor: "#121e31" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Menu</Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SidebarContent />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      >
        <SidebarContent />
      </Box>
    </>
  );
}

export default Sidebar;
