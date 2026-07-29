import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productAction";
import {useHistory } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstatns";
import { makeStyles } from "@material-ui/core/styles";
import StarRateIcon from "@mui/icons-material/StarRate";

const useStyles = makeStyles((theme) => ({
  updateUser1: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f4f5f7",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: "0",
    padding: 0,
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  firstBox_01: {
    width: "220px",
    minWidth: "220px",
    flexShrink: 0,
    margin: "0rem",
    height: "100vh",
    backgroundColor: "#111111",
    display: "block",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },
  toggleBox_01: {
    width: "240px",
    margin: "0rem",
    height: "100vh",
    backgroundColor: "#111111",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox_01: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#f4f5f7",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  navBar_01: {
    margin: "0rem",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "2rem",
    paddingBottom: "3rem",
    height: "auto",
    backgroundColor: "transparent",
    width: "100%",
  },
  form: {
    width: "420px",
    margin: "0 auto 2rem auto",
    borderRadius: "14px",
    padding: "2.5rem 2rem",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0 10px",
      padding: "2rem 1.5rem",
    },
  },
  avatar: {
    margin: "0 auto 1.5rem auto",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    boxShadow: "0 0 14px rgba(220, 38, 38, 0.4)",
  },
  textField: {
    marginBottom: theme.spacing(2.5),
    "& .MuiInputLabel-root": {
      color: "#4b5563",
      fontSize: "0.85rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#dc2626",
    },
    "& .MuiOutlinedInput-root": {
      color: "#111111",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#dc2626",
      },
      "& .MuiOutlinedInput-input": {
        padding: "14px 12px",
        fontSize: "0.9rem",
      },
    },
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#111111",
    fontWeight: "800",
    fontSize: "1.4rem",
    letterSpacing: "0.5px",
  },
  heading_02: {
    textAlign: "center",
    color: "#4b5563",
    fontWeight: "600",
    fontSize: "1.2rem",
    marginTop: "2rem",
  },
  nameInput: {
    width: "100%",
  },
  loginButton: {
    color: "#ffffff",
    backgroundColor: "#dc2626",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "0.95rem",
    textTransform: "none",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 14px rgba(220, 38, 38, 0.3)",
    transition: "all 0.2s ease",
    width: "100%",
    marginTop: "1.5rem",
    "&:disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      color: "#9ca3af",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "#ef4444",
      boxShadow: "0 6px 20px rgba(239, 68, 68, 0.45)",
      transform: "translateY(-1px)",
    },
  },
}));

function ProductReviews() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId)); // when in input box string lenght goes ===24 then automatically search occures
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, isDeleted, productId, history]);

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // delet review from given prodcuts reviews =>
  const deleteReviewHandler = (reviewId) => {
 
    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId)); // get this product reviews
  };
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 0.8,
      magin: "0 auto",
      headerClassName: "column-header hide-on-mobile",
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.8,
    },
    {
      field: "recommend",
      headerName: "Recommend",
      minWidth: 100,
      flex: 1,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.getValue(params.id, "recommend") === true
          ? "greenColor"
          : "redColor"; // if rating of review greater then class green else red
      },
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor"; // if rating of review greater then class green else red
      },
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 230,
      headerClassName: "column-header1",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div 
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="iconbtn" style={{ marginLeft: "1rem" }} />
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.ratings,
        recommend: item.recommend ? "Yes" : "No",
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />

          <div className={classes.updateUser1}>
            <div
              className={
                !toggle ? `${classes.firstBox_01}` : `${classes.toggleBox_01}`
              }
            >
              <Sidebar />
            </div>

            <div className={classes.secondBox_01}>
              <div className={classes.navBar_01}>
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className={classes.formSection}>
                <form
                  className={`${classes.form}`}
                  onSubmit={productReviewsSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <StarRateIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.heading}
                  >
                    All Reviews
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Star
                            style={{
                              fontSize: 20,
                              color: "#9ca3af",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.loginButton}
                    disabled={
                      loading ? true : false || productId === "" ? true : false
                    }
                  >
                    Search
                  </Button>
                </form>

                {reviews && reviews.length > 0 ? (
                  <div className="productListContainer">
                    <h4 id="productListHeading">ALL PRODUCTS</h4>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      autoHeight
                      disableSelectionOnClick
                      className="productListTable"
                    />
                  </div>
                ) : (
                  <h1 className={classes.heading_02}>No Reviews Found</h1>
                )}
              </div>
              ;
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductReviews;
