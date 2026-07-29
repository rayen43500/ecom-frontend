import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  sidebar: {
    background: "#0f172a",
    padding: 0,
    margin: 0,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },

  profileBlock: {
    background: "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "24px 16px",
    textAlign: "center",
    position: "relative",
  },
  brandBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(220, 38, 38, 0.15)",
    color: "#fca5a5",
    fontSize: "0.625rem",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: "9999px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "16px",
    border: "1px solid rgba(220, 38, 38, 0.25)",
  },
  avatarWrap: {
    position: "relative",
    display: "inline-block",
    marginBottom: "12px",
  },
  avatar11: {
    width: "64px !important",
    height: "64px !important",
    border: "2px solid rgba(255,255,255,0.15) !important",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 0 3px rgba(220,38,38,0.2) !important",
  },
  onlinePip: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "11px",
    height: "11px",
    borderRadius: "50%",
    background: "#22c55e",
    border: "2px solid #0f172a",
    boxShadow: "0 0 0 2px rgba(34,197,94,0.3)",
  },
  adminName: {
    fontWeight: "600 !important",
    fontSize: "0.875rem !important",
    color: "#f8fafc !important",
    marginBottom: "4px !important",
    letterSpacing: "-0.01em",
  },
  adminEmail: {
    fontSize: "0.75rem !important",
    color: "#94a3b8 !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "200px",
    margin: "0 auto",
  },

  navSection: {
    flex: 1,
    padding: "16px 12px",
    overflowY: "auto",
  },
  navLabel: {
    color: "#475569",
    fontSize: "0.625rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "0 8px 8px",
    display: "block",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "11px 14px",
    borderRadius: "10px",
    marginBottom: "4px",
    cursor: "pointer",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    textDecoration: "none",
    border: "1px solid transparent",
    "& svg": {
      color: "#64748b",
      fontSize: "1.625rem !important",
      width: "1.625rem !important",
      height: "1.625rem !important",
      flexShrink: 0,
      transition: "color 250ms ease, transform 250ms ease",
    },
    "&:hover": {
      background: "rgba(255,255,255,0.06)",
      borderColor: "rgba(255,255,255,0.08)",
      "& svg": { color: "#f87171", transform: "scale(1.05)" },
      "& $menuText": { color: "#f1f5f9" },
    },
  },
  menuItemActive: {
    background: "rgba(220,38,38,0.12) !important",
    borderColor: "rgba(220,38,38,0.2) !important",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "3px",
      height: "60%",
      borderRadius: "0 4px 4px 0",
      background: "#dc2626",
    },
    "& svg": { color: "#f87171 !important" },
    "& $menuText": { color: "#f8fafc !important", fontWeight: "600 !important" },
  },
  menuText: {
    color: "#94a3b8",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "color 250ms ease",
    letterSpacing: "-0.01em",
  },

  footerBlock: {
    padding: "16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  accountBtn: {
    width: "100% !important",
    padding: "10px 16px !important",
    borderRadius: "10px !important",
    background: "#dc2626 !important",
    color: "#fff !important",
    fontWeight: "600 !important",
    fontSize: "0.8125rem !important",
    textTransform: "none !important",
    letterSpacing: "-0.01em",
    boxShadow: "0 2px 8px rgba(220,38,38,0.3) !important",
    transition: "all 250ms ease !important",
    "& .MuiButton-startIcon svg": {
      fontSize: "1.5rem !important",
      width: "1.5rem !important",
      height: "1.5rem !important",
      color: "#fff !important",
    },
    "&:hover": {
      background: "#b91c1c !important",
      boxShadow: "0 4px 16px rgba(220,38,38,0.4) !important",
      transform: "translateY(-1px)",
    },
  },
}));

const iconStyle = { fontSize: 26 };

const menuItems = [
  { to: "/admin/dashboard", icon: <DashboardIcon sx={iconStyle} />, label: "Dashboard" },
  { to: "/", icon: <HomeIcon sx={iconStyle} />, label: "Home" },
  { to: "/admin/products", icon: <PostAddIcon sx={iconStyle} />, label: "Products" },
  { to: "/admin/new/product", icon: <AddCircleOutlineIcon sx={iconStyle} />, label: "Add Product" },
  { to: "/admin/orders", icon: <ListAltIcon sx={iconStyle} />, label: "Orders" },
  { to: "/admin/users", icon: <PeopleAltIcon sx={iconStyle} />, label: "Users" },
  { to: "/admin/banners", icon: <ViewCarouselIcon sx={iconStyle} />, label: "Banners" },
  { to: "/admin/reviews", icon: <RateReviewIcon sx={iconStyle} />, label: "Reviews" },
  { to: "/contact", icon: <ContactPageIcon sx={iconStyle} />, label: "Contact" },
];

function Sidebar() {
  const classes = useStyles();
  const { user, loading } = useSelector((state) => state.userData);
  const location = useLocation();
  const history = useHistory();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {!loading && (
        <div className={classes.sidebar}>
          <div className={classes.profileBlock}>
            <div className={classes.brandBadge}>Admin Panel</div>
            <div className={classes.avatarWrap}>
              <Avatar
                src={user && user.avatar.url}
                alt="Admin"
                className={classes.avatar11}
              />
              <div className={classes.onlinePip} />
            </div>
            <Typography className={classes.adminName}>{user && user.name}</Typography>
            <Typography className={classes.adminEmail}>{user && user.email}</Typography>
          </div>

          <div className={classes.navSection}>
            <span className={classes.navLabel}>Navigation</span>
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${classes.menuItem} ${isActive(item.to) ? classes.menuItemActive : ""}`}
              >
                {item.icon}
                <span className={classes.menuText}>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className={classes.footerBlock}>
            <Button
              className={classes.accountBtn}
              onClick={() => history.push("/account")}
              startIcon={<ManageAccountsIcon sx={{ fontSize: 24 }} />}
              fullWidth
            >
              My Account
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
