import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { UPDATE_USER_RESET } from "../../constants/userConstanat";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layouts/loader/Loader";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";

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
    margin: "0 auto",
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
  select: {
    width: "100%",
    color: "#111111",
    marginTop: theme.spacing(1),
    "& .MuiOutlinedInput-input": {
      padding: "14px 12px",
      fontSize: "0.9rem",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.3)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#dc2626",
    },
    "& .MuiSelect-select": {
      color: "#111111",
      backgroundColor: "transparent",
    },
    "& .MuiSelect-icon": {
      color: "#6b7280",
    },
  },
  selectMenuPaper: {
    backgroundColor: "#ffffff !important",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    "& .MuiMenuItem-root": {
      color: "#1f2937",
      fontSize: "0.9rem",
      padding: "10px 16px",
      "&:hover": {
        backgroundColor: "rgba(220, 38, 38, 0.08)",
        color: "#dc2626",
      },
      "&.Mui-selected": {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#b91c1c",
        },
      },
    },
  },
}));

function UpdateUser() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = useRouteMatch().params.id;
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profileData
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    // initial value user Details  getting initially user._id will be undefind then call will occures  g(etUserDetails(id)
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
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
                  className={`${classes.form} `}
                  onSubmit={updateUserSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.heading}
                  >
                    Update Role
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 
                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MailOutlineIcon
                            style={{
                              fontSize: 20,
                              color: "#9ca3af",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#9ca3af",
                      }}
                    >
                      Role*
                    </label>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={classes.select}
                      MenuProps={{
                        classes: { paper: classes.selectMenuPaper }, // Update the class name here
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ background: "inherit", color: "#9ca3af" }}>
                          Choose Role
                        </em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.loginButton}
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateUser;


  