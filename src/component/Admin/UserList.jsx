import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import Loader from "../layouts/loader/Loader";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstanat";
import { useHistory } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profileData
  );
  const alert = useAlert();
  const history = useHistory();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const [toggle, setToggle] = useState(false);

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
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      width: 90,
      flex: 0.15,
      sortable: false,
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => {
        const id = params.getValue(params.id, "id");
        return (
          <span className="cell-id" title={id}>
            {id ? `${id.substring(0, 6)}…` : ""}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 120,
      flex: 0.25,
      headerClassName: "column-header",
      renderCell: (params) => (
        <span className="cell-name">{params.getValue(params.id, "name")}</span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 160,
      flex: 0.35,
      headerClassName: "column-header hide-on-tablet",
      renderCell: (params) => (
        <span className="cell-email">{params.getValue(params.id, "email")}</span>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      flex: 0.15,
      headerClassName: "column-header",
      renderCell: (params) => {
        const role = params.getValue(params.id, "role");
        return (
          <span className={role === "admin" ? "greenColor" : "redColor"}>
            {role}
          </span>
        );
      },
    },
    {
      field: "actions",
      flex: 0.15,
      headerName: "Actions",
      width: 110,
      sortable: false,
      headerClassName: "column-header",
      renderCell: (params) => {
        const id = params.getValue(params.id, "id");
        return (
          <div className="action-buttons-cell">
            <Link
              to={`/admin/user/${id}`}
              className="icon- admin-icon-btn admin-icon-btn--edit"
              aria-label="Edit user"
            >
              <EditIcon />
            </Link>
            <button
              onClick={() => deleteUserHandler(id)}
              className="iconbtn admin-icon-btn admin-icon-btn--delete"
              aria-label="Delete user"
              type="button"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
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
          <MetaData title={`ALL Users - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">All Users</h4>

                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
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

export default UserList;
