import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import { ShoppingCart, AssignmentInd, People, BarChart } from "@material-ui/icons";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

Highcharts3D(Highcharts);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    background: "#f4f5f7",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
  },
  sidebarCol: {
    width: "240px",
    minWidth: "240px",
    flexShrink: 0,
    height: "100vh",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("999")]: { display: "none" },
  },
  toggleBox: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
  },
  mainCol: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    background: "#f4f5f7",
  },
  pageBody: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  pageHeading: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.25rem",
  },
  headingDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#dc2626",
    boxShadow: "0 0 8px rgba(220,38,38,0.7)",
    animation: "$pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.3 },
  },
  headingText: {
    fontSize: "0.68rem",
    fontWeight: 800,
    color: "#111111",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
  },

  /* ── Stat Cards ── */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "1.25rem",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #dc2626, #ef4444)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease",
    },
    "&:hover": {
      boxShadow: "0 8px 24px rgba(220,38,38,0.18)",
      transform: "translateY(-3px)",
      borderColor: "rgba(220, 38, 38, 0.35)",
      "&::after": { transform: "scaleX(1)" },
    },
  },
  statTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  statIconBox: {
    width: "64px",
    height: "64px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": { color: "#fff", fontSize: "2.35rem" },
  },
  statChange: {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "#22c55e",
    background: "rgba(34, 197, 94, 0.1)",
    padding: "2px 10px",
    borderRadius: "20px",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#111111",
    letterSpacing: "-1px",
    lineHeight: 1,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.78rem",
    color: "#6b7280",
    fontWeight: 500,
  },

  /* ── Charts ── */
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  chartCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "1.25rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #dc2626, #ef4444)",
    },
  },
  chartLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: "#111111",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "&::before": {
      content: '""',
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#dc2626",
      display: "inline-block",
    },
  },
  lineChartCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "1.25rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #dc2626, #ef4444, #f4f5f7)",
    },
  },
  revenueCard: {
    background: "#dc2626",
    borderRadius: "14px",
    border: "1px solid rgba(220, 38, 38, 0.3)",
    padding: "1.5rem",
    boxShadow: "0 8px 32px rgba(220,38,38,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-30px",
      right: "-30px",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
    },
  },
  revenueIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    "& svg": { color: "#ffffff", fontSize: "2.35rem" },
  },
  revenueLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
  },
  revenueValue: {
    fontSize: "2.2rem",
    fontWeight: 800,
    color: "#ffffff",
    letterSpacing: "-1.5px",
    lineHeight: 1,
  },
  revenueSubText: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 600,
    marginTop: "0.5rem",
  },
}));

const statConfigs = [
  {
    label: "Total Products",
    key: "products",
    route: "/admin/products",
    icon: <ShoppingCart />,
    iconBg: "#111111",
    change: "Active",
  },
  {
    label: "Total Orders",
    key: "orders",
    route: "/admin/orders",
    icon: <AssignmentInd />,
    iconBg: "#dc2626",
    change: "Processing",
  },
  {
    label: "Total Users",
    key: "users",
    route: "/admin/users",
    icon: <People />,
    iconBg: "#111111",
    change: "Registered",
  },
];

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector((state) => state.allOrders);
  const { users, error: usersError } = useSelector((state) => state.allUsers);
  const alert = useAlert();

  let OutOfStock = 0;
  products && products.forEach((el) => { if (el.stock === 0) OutOfStock += 1; });

  useEffect(() => {
    if (error) { alert.error(error); dispatch(clearErrors); }
    if (usersError) { alert.error(usersError); dispatch(clearErrors); }
    if (ordersError) { alert.error(ordersError); dispatch(clearErrors); }
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, ordersError, usersError]);

  const toggleHandler = () => setToggle(!toggle);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 999 && toggle) setToggle(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  let totalAmount = 0;
  orders && orders.forEach((item) => { totalAmount += item.totalPrice; });

  const counts = {
    products: products ? products.length : 0,
    orders: orders ? orders.length : 0,
    users: users ? users.length : 0,
  };

  // Chart options — clean dark theme
  const lineOptions = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      style: { fontFamily: "Inter" },
      height: 260,
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
      labels: { style: { color: "#9ca3af", fontWeight: "600", fontFamily: "Inter" } },
      lineColor: "rgba(255, 255, 255, 0.08)",
      tickColor: "rgba(255, 255, 255, 0.08)",
    },
    yAxis: {
      title: { text: null },
      labels: { style: { color: "#9ca3af", fontFamily: "Inter" } },
      gridLineColor: "rgba(255, 255, 255, 0.04)",
    },
    series: [{
      name: "Revenue (€)",
      data: [0, totalAmount],
      color: "#dc2626",
      fillOpacity: 0.1,
      lineWidth: 3,
      marker: {
        fillColor: "#111216",
        lineColor: "#dc2626",
        lineWidth: 2,
        radius: 6,
        symbol: "circle",
      },
    }],
    legend: { itemStyle: { color: "#9ca3af", fontFamily: "Inter" } },
    tooltip: {
      backgroundColor: "#111216",
      borderColor: "#dc2626",
      style: { color: "#ffffff", fontFamily: "Inter" },
      borderRadius: 8,
    },
    plotOptions: { area: { fillOpacity: 0.08 } },
  };

  const doughnutOptions = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      options3d: { enabled: true, alpha: 45, beta: 0 },
      style: { fontFamily: "Inter" },
      height: 260,
    },
    title: { text: null },
    credits: { enabled: false },
    tooltip: {
      backgroundColor: "#111216",
      borderColor: "#dc2626",
      style: { color: "#ffffff", fontFamily: "Inter" },
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        colors: ["rgba(255, 255, 255, 0.08)", "#dc2626"],
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: { color: "#ffffff", fontFamily: "Inter", fontWeight: "600" },
        },
      },
    },
    series: [{
      type: "pie",
      name: "Share",
      data: [
        ["In Stock", products ? products.length - OutOfStock : 0],
        { name: "Out of Stock", y: OutOfStock, sliced: true, selected: true },
      ],
    }],
  };

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Dashboard - Admin Panel" />
          <div className={classes.root}>
            {/* Sidebar */}
            <div className={!toggle ? classes.sidebarCol : classes.toggleBox}>
              <Sidebar />
            </div>

            {/* Main */}
            <div className={classes.mainCol}>
              <Navbar toggleHandler={toggleHandler} />

              <div className={classes.pageBody}>
                {/* Page heading */}
                <div className={classes.pageHeading}>
                  <div className={classes.headingDot} />
                  <span className={classes.headingText}>Overview Statistics</span>
                </div>

                {/* Stat Cards */}
                <div className={classes.statsGrid}>
                  {statConfigs.map((card) => (
                    <div
                      key={card.key}
                      className={classes.statCard}
                      onClick={() => history.push(card.route)}
                    >
                      <div className={classes.statTop}>
                        <div
                          className={classes.statIconBox}
                          style={{ background: card.iconBg }}
                        >
                          {card.icon}
                        </div>
                        <span className={classes.statChange}>{card.change}</span>
                      </div>
                      <div className={classes.statValue}>{counts[card.key]}</div>
                      <div className={classes.statLabel}>{card.label}</div>
                    </div>
                  ))}

                  {/* Revenue as 4th card */}
                  <div className={classes.revenueCard}>
                    <div className={classes.revenueIcon}>
                      <BarChart />
                    </div>
                    <div className={classes.revenueLabel}>Total Revenue</div>
                    <div className={classes.revenueValue}>€{totalAmount.toFixed(0)}</div>
                    <div className={classes.revenueSubText}>↑ All time earnings</div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className={classes.chartsGrid}>
                  {/* Pie Chart */}
                  <div className={classes.chartCard}>
                    <div className={classes.chartLabel}>Stock Status</div>
                    <HighchartsReact highcharts={Highcharts} options={doughnutOptions} />
                  </div>

                  {/* Line chart as big area */}
                  <div className={classes.chartCard}>
                    <div className={classes.chartLabel}>Revenue Trend</div>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
