import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 999,
    background: "#0f172a",
    width: "100%",
    padding: "12px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    minHeight: "64px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  menuBtn: {
    display: "none",
    [theme.breakpoints.down("999")]: {
      display: "flex",
    },
    "& button": {
      color: "#94a3b8",
      padding: "8px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)",
      transition: "all 250ms ease",
      "&:hover": {
        background: "rgba(220,38,38,0.12)",
        color: "#f87171",
        borderColor: "rgba(220,38,38,0.25)",
      },
    },
    "& svg": { fontSize: "1.65rem", width: "1.65rem", height: "1.65rem" },
  },
  logoBox: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    "& img": {
      height: "100%",
      width: "auto",
      filter: "brightness(1.05)",
      transition: "opacity 250ms ease",
    },
    "&:hover img": { opacity: 0.9 },
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    [theme.breakpoints.down("xs")]: { display: "none" },
  },
  titleLabel: {
    fontSize: "0.625rem",
    fontWeight: 700,
    color: "#f87171",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    lineHeight: 1,
  },
  titleMain: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "#f8fafc",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconBtn: {
    color: "#94a3b8 !important",
    padding: "10px !important",
    borderRadius: "10px !important",
    border: "1px solid rgba(255,255,255,0.08) !important",
    transition: "all 250ms ease !important",
    "&:hover": {
      background: "rgba(255,255,255,0.06) !important",
      color: "#f87171 !important",
      borderColor: "rgba(220,38,38,0.25) !important",
      transform: "translateY(-1px)",
    },
    "&:focus-visible": {
      outline: "2px solid rgba(220,38,38,0.5) !important",
      outlineOffset: "2px",
    },
    "& svg": { fontSize: "1.65rem", width: "1.65rem", height: "1.65rem" },
  },
  notifWrap: {
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "8px",
      right: "8px",
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "#dc2626",
      border: "2px solid #0f172a",
    },
  },
  contactBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.8125rem",
    color: "#fff",
    background: "#dc2626",
    border: "none",
    boxShadow: "0 2px 8px rgba(220,38,38,0.3)",
    transition: "all 250ms ease",
    textDecoration: "none",
    letterSpacing: "-0.01em",
    "&:hover": {
      background: "#b91c1c",
      boxShadow: "0 4px 14px rgba(220,38,38,0.4)",
      transform: "translateY(-1px)",
    },
    "&:focus-visible": {
      outline: "2px solid rgba(220,38,38,0.5)",
      outlineOffset: "2px",
    },
    [theme.breakpoints.down("xs")]: { display: "none" },
  },
}));

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();
  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <div className={classes.menuBtn}>
          <IconButton onClick={toggleHandler} aria-label="Toggle menu">
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </div>
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <div className={classes.logoBox}>
            <img src={require("../../Image/logo.png")} alt="logo" />
          </div>
        </Link>
        <div className={classes.titleBox}>
          <span className={classes.titleLabel}>Admin</span>
          <span className={classes.titleMain}>Control Panel</span>
        </div>
      </div>

      <div className={classes.right}>
        <div className={classes.notifWrap}>
          <IconButton className={classes.iconBtn} aria-label="Notifications">
            <NotificationsNoneIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </div>
        <Link to="/contact" className={classes.contactBtn}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
