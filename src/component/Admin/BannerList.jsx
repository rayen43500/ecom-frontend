import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MataData/MataData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import Loader from "../layouts/loader/Loader";
import { getBanners, deleteBanner, clearErrors } from "../../actions/bannerAction";
import { DELETE_BANNER_RESET } from "../../constants/bannerConstants";

function BannerList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);

  const { loading, error, banners } = useSelector((state) => state.bannersList);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.bannerAction
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message || "Banner deleted successfully");
      dispatch({ type: DELETE_BANNER_RESET });
    }
    dispatch(getBanners());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const deleteBannerHandler = (id) => {
    dispatch(deleteBanner(id));
  };

  const columns = [
    {
      field: "image",
      headerName: "Preview",
      width: 90,
      flex: 0.12,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt={params.row.tagline}
          className="banner-thumb"
        />
      ),
    },
    {
      field: "tagline",
      headerName: "Tagline",
      minWidth: 120,
      flex: 0.2,
      headerClassName: "column-header",
      renderCell: (params) => (
        <span className="cell-name">{params.getValue(params.id, "tagline")}</span>
      ),
    },
    {
      field: "quote",
      headerName: "Headline",
      minWidth: 160,
      flex: 0.3,
      headerClassName: "column-header hide-on-tablet",
      renderCell: (params) => (
        <span className="cell-email">{params.getValue(params.id, "quote")}</span>
      ),
    },
    {
      field: "productText",
      headerName: "Button",
      width: 100,
      flex: 0.15,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      flex: 0.15,
      headerName: "Actions",
      width: 110,
      sortable: false,
      renderCell: (params) => {
        const id = params.getValue(params.id, "id");
        return (
          <div className="action-buttons-cell">
            <Link
              to={`/admin/banner/${id}`}
              className="icon- admin-icon-btn admin-icon-btn--edit"
              aria-label="Edit banner"
            >
              <EditIcon />
            </Link>
            <button
              onClick={() => deleteBannerHandler(id)}
              className="iconbtn admin-icon-btn admin-icon-btn--delete"
              aria-label="Delete banner"
              type="button"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const rows =
    banners &&
    banners.map((item) => ({
      id: item._id,
      tagline: item.tagline,
      quote: item.quote,
      productText: item.productText,
      imageUrl: item.image?.url,
    }));

  const toggleHandler = () => setToggle(!toggle);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) setToggle(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Banners - Admin" />
          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>
            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                  <h4 id="productListHeading" style={{ margin: 0 }}>Home Banners</h4>
                  <Link to="/admin/banner/new" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        padding: "8px 16px",
                        boxShadow: "0 2px 8px rgba(220,38,38,0.3)",
                      }}
                    >
                      Add Banner
                    </Button>
                  </Link>
                </div>
                <DataGrid
                  rows={rows || []}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25]}
                  disableSelectionOnClick
                  disableColumnMenu
                  className="productListTable"
                  rowHeight={52}
                  headerHeight={44}
                  autoHeight
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BannerList;
