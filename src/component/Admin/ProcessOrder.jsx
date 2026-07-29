import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../actions/orderAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { makeStyles } from "@material-ui/core/styles";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import { Link, useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import InventoryIcon from "@mui/icons-material/Inventory";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    background: "#f4f5f7",
    minHeight: "100vh",
    width: "100%",
    gap: 0,
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  },
  sidebarBox: {
    width: "220px",
    minWidth: "220px",
    flexShrink: 0,
    height: "100vh",
    position: "sticky",
    top: 0,
    backgroundColor: "#111111",
    display: "block",
    [theme.breakpoints.down("999")]: { display: "none" },
  },
  toggleBox: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: "#111111",
    display: "block",
    boxShadow: "4px 0 30px rgba(0,0,0,0.5)",
  },
  contentBox: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("999")]: { width: "100%" },
  },
  pageBody: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    fontWeight: 800,
    color: "#111111",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "&::before": {
      content: '""',
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#dc2626",
      boxShadow: "0 0 8px rgba(220,38,38,0.7)",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "1.5rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: "linear-gradient(90deg, #dc2626, #ef4444)",
    },
  },
  cardFullWidth: {
    gridColumn: "1 / -1",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.25rem",
  },
  cardHeaderIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(220, 38, 38, 0.12)",
    "& svg": { color: "#ef4444", fontSize: "1.1rem" },
  },
  cardHeaderTitle: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#111111",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "1rem",
    "& svg": { color: "#ef4444", fontSize: "1.1rem", marginTop: "2px", flexShrink: 0 },
  },
  infoLabel: {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "#6b7280",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "2px",
  },
  infoValue: {
    fontSize: "0.9rem",
    color: "#1f2937",
    fontWeight: 500,
  },
  divider: {
    height: "1px",
    background: "rgba(0, 0, 0, 0.08)",
    margin: "1rem 0",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 0",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },
  priceLabel: {
    fontSize: "0.85rem",
    color: "#6b7280",
    fontWeight: 500,
  },
  priceValue: {
    fontSize: "0.9rem",
    color: "#1f2937",
    fontWeight: 600,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 0",
    marginTop: "0.25rem",
  },
  totalLabel: {
    fontSize: "1rem",
    color: "#111111",
    fontWeight: 700,
  },
  totalValue: {
    fontSize: "1.2rem",
    fontWeight: 800,
    color: "#ef4444",
  },
  // Status Badge
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  statusProcessing: {
    background: "rgba(234,179,8,0.15)",
    color: "#b45309",
    border: "1px solid rgba(234,179,8,0.3)",
  },
  statusShipped: {
    background: "rgba(59,130,246,0.15)",
    color: "#1d4ed8",
    border: "1px solid rgba(59,130,246,0.3)",
  },
  statusDelivered: {
    background: "rgba(34,197,94,0.15)",
    color: "#15803d",
    border: "1px solid rgba(34,197,94,0.3)",
  },
  paymentBadgePaid: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 700,
    background: "rgba(34,197,94,0.15)",
    color: "#15803d",
    border: "1px solid rgba(34,197,94,0.3)",
  },
  paymentBadgeCOD: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 700,
    background: "rgba(251,191,36,0.15)",
    color: "#b45309",
    border: "1px solid rgba(251,191,36,0.3)",
  },
  paymentBadgeUnpaid: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 700,
    background: "rgba(239,68,68,0.15)",
    color: "#b91c1c",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  // Order Items
  orderItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "12px",
    background: "rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(0, 0, 0, 0.04)",
    marginBottom: "0.75rem",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(220, 38, 38, 0.04)",
      border: "1px solid rgba(220, 38, 38, 0.15)",
    },
  },
  orderItemImg: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    flexShrink: 0,
  },
  orderItemName: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#111111",
    marginBottom: "4px",
  },
  orderItemPrice: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  orderItemTotal: {
    marginLeft: "auto",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#ef4444",
    flexShrink: 0,
  },
  // Process Form
  processForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  selectWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  selectIcon: {
    position: "absolute",
    left: "14px",
    color: "#dc2626",
    fontSize: "1.1rem !important",
    pointerEvents: "none",
    zIndex: 1,
  },
  modernSelect: {
    width: "100%",
    padding: "0.85rem 1rem 0.85rem 2.8rem",
    background: "rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    color: "#111111",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    transition: "all 0.2s ease",
    "&:focus": {
      border: "1px solid #dc2626",
      boxShadow: "0 0 0 3px rgba(220,38,38,0.15)",
    },
    "& option": {
      background: "#ffffff",
      color: "#111111",
    },
  },
  processBtn: {
    padding: "0.85rem 2rem",
    background: "#dc2626",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.9rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
    transition: "all 0.25s ease",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.5px",
    "&:hover": {
      background: "#ef4444",
      boxShadow: "0 6px 20px rgba(239,68,68,0.45)",
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      background: "rgba(0, 0, 0, 0.05)",
      color: "#9ca3af",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
  },
}));

function ProcessOrder() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const classes = useStyles();
  const params = useParams();
  const productId = params.id;

  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => setToggle(!toggle);

  useEffect(() => {
    if (error) { alert.error(error); dispatch(clearErrors()); }
    if (updateError) { alert.error(updateError); dispatch(clearErrors()); }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, isUpdated, updateError, productId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(productId, myForm));
  };

  // Payment type detection
  const isCOD = order?.paymentInfo?.id === "COD" || order?.paymentInfo?.status === "Cash on Delivery";
  const isPaid = order?.paymentInfo?.status === "succeeded";

  // Status badge
  const getStatusBadge = (status) => {
    if (status === "Delivered") return <span className={`${classes.statusBadge} ${classes.statusDelivered}`}><CheckCircleIcon style={{ fontSize: "14px" }} /> Delivered</span>;
    if (status === "Shipped") return <span className={`${classes.statusBadge} ${classes.statusShipped}`}><LocalShippingIcon style={{ fontSize: "14px" }} /> Shipped</span>;
    return <span className={`${classes.statusBadge} ${classes.statusProcessing}`}><HourglassTopIcon style={{ fontSize: "14px" }} /> Processing</span>;
  };

  // Payment badge
  const getPaymentBadge = () => {
    if (isCOD) return <span className={classes.paymentBadgeCOD}><LocalAtmIcon style={{ fontSize: "14px" }} /> Cash on Delivery</span>;
    if (isPaid) return <span className={classes.paymentBadgePaid}><CreditCardIcon style={{ fontSize: "14px" }} /> Paid (Card)</span>;
    return <span className={classes.paymentBadgeUnpaid}><CreditCardIcon style={{ fontSize: "14px" }} /> Not Paid</span>;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className={classes.root}>
            <div className={!toggle ? classes.sidebarBox : classes.toggleBox}>
              <Sidebar />
            </div>

            <div className={classes.contentBox}>
              <Navbar toggleHandler={toggleHandler} />

              <div className={classes.pageBody}>
                <div className={classes.sectionLabel}>Order Details</div>

                <div className={classes.grid}>
                  {/* Shipping Info Card */}
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <div className={classes.cardHeaderIcon}>
                        <LocalShippingIcon />
                      </div>
                      <span className={classes.cardHeaderTitle}>Delivery Address</span>
                    </div>
                    <div className={classes.infoRow}>
                      <PersonIcon />
                      <div>
                        <div className={classes.infoLabel}>Name</div>
                        <div className={classes.infoValue}>{order.user && order.user.name}</div>
                      </div>
                    </div>
                    <div className={classes.infoRow}>
                      <PlaceIcon />
                      <div>
                        <div className={classes.infoLabel}>Address</div>
                        <div className={classes.infoValue}>
                          {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </div>
                      </div>
                    </div>
                    <div className={classes.infoRow}>
                      <PhoneIcon />
                      <div>
                        <div className={classes.infoLabel}>Phone</div>
                        <div className={classes.infoValue}>{order.shippingInfo && order.shippingInfo.phoneNo}</div>
                      </div>
                    </div>
                    <div className={classes.infoRow}>
                      <EmailIcon />
                      <div>
                        <div className={classes.infoLabel}>Email</div>
                        <div className={classes.infoValue}>{order.user && order.user.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status + Payment Card */}
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <div
                        className={classes.cardHeaderIcon}
                        style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                      >
                        <CheckCircleIcon />
                      </div>
                      <span className={classes.cardHeaderTitle}>Order Info</span>
                    </div>

                    <div className={classes.infoRow}>
                      <div style={{ width: "100%" }}>
                        <div className={classes.infoLabel} style={{ marginBottom: "8px" }}>Order Status</div>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                    </div>

                    <div className={classes.divider} />

                    <div className={classes.infoRow}>
                      <div style={{ width: "100%" }}>
                        <div className={classes.infoLabel} style={{ marginBottom: "8px" }}>Payment Method</div>
                        {getPaymentBadge()}
                      </div>
                    </div>

                    <div className={classes.divider} />

                    <div className={classes.priceRow}>
                      <span className={classes.priceLabel}>Items Price</span>
                      <span className={classes.priceValue}>₹{order.itemsPrice}</span>
                    </div>
                    <div className={classes.priceRow}>
                      <span className={classes.priceLabel}>Shipping</span>
                      <span className={classes.priceValue}>₹{order.shippingPrice || 0}</span>
                    </div>
                    <div className={classes.totalRow}>
                      <span className={classes.totalLabel}>Total Price</span>
                      <span className={classes.totalValue}>₹{order.totalPrice}</span>
                    </div>
                  </div>

                  {/* Order Items — full width */}
                  <div className={`${classes.card} ${classes.cardFullWidth}`}>
                    <div className={classes.cardHeader}>
                      <div
                        className={classes.cardHeaderIcon}
                        style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                      >
                        <InventoryIcon />
                      </div>
                      <span className={classes.cardHeaderTitle}>Ordered Items</span>
                    </div>

                    {order.orderItems &&
                      order.orderItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/product/${item.productId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className={classes.orderItem}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className={classes.orderItemImg}
                            />
                            <div>
                              <div className={classes.orderItemName}>{item.name}</div>
                              <div className={classes.orderItemPrice}>
                                ₹{item.price} × {item.quantity}
                              </div>
                            </div>
                            <div className={classes.orderItemTotal}>
                              ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Process Order Form */}
                  {order.orderStatus && order.orderStatus !== "Delivered" && (
                    <div className={`${classes.card} ${classes.cardFullWidth}`}>
                      <div className={classes.cardHeader}>
                        <div
                          className={classes.cardHeaderIcon}
                          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                        >
                          <AccountTreeIcon style={{ color: "#fff", fontSize: "1.1rem" }} />
                        </div>
                        <span className={classes.cardHeaderTitle}>Update Order Status</span>
                      </div>

                      <div className={classes.processForm}>
                        <div className={classes.selectWrapper}>
                          <AccountTreeIcon className={classes.selectIcon} />
                          <select
                            className={classes.modernSelect}
                            onChange={(e) => setStatus(e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Select new status</option>
                            {order.orderStatus === "Processing" && (
                              <option value="Shipped">Mark as Shipped</option>
                            )}
                            {order.orderStatus === "Shipped" && (
                              <option value="Delivered">Mark as Delivered</option>
                            )}
                          </select>
                        </div>

                        <button
                          className={classes.processBtn}
                          onClick={updateOrderSubmitHandler}
                          disabled={loading || status === ""}
                        >
                          Update Order Status
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProcessOrder;
