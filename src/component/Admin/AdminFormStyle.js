import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  updateProduct: {
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
  firstBox1: {
    width: "240px",
    minWidth: "240px",
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
  toggleBox1: {
    width: "240px",
    margin: "0rem",
    height: "100vh",
    backgroundColor: "#111111",
    display: "block",
    zIndex: "1000",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
  },
  secondBox1: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#f4f5f7",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  navBar1: {
    margin: "0rem",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "2rem",
    paddingBottom: "3rem",
    height: "auto",
    backgroundColor: "transparent",
  },
  formContainer2: {},
  form: {
    width: "480px",
    margin: "auto",
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
  form2: {
    marginTop: "0",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#111111",
    fontWeight: "800",
    fontSize: "1.4rem",
    letterSpacing: "0.5px",
  },
  avatar: {
    margin: "0 auto 1rem auto",
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
  nameInput: {
    width: "100%",
  },
  passwordInput: {
    width: "100%",
  },
  emailInput: {
    width: "100%",
  },
  descriptionInput: {
    marginBottom: theme.spacing(2.5),
    width: "100%",
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
  descriptionIcon: {
    marginRight: theme.spacing(1),
    color: "#6b7280",
  },
  selectOption: {
    marginBottom: theme.spacing(2.5),
    position: "relative",
    width: "100%",
  },
  formControl: {
    width: "100%",
  },
  select: {
    color: "#111111",
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
  labelText: {
    color: "#6b7280",
    fontSize: "0.85rem",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "14px",
    pointerEvents: "none",
    transition: "opacity 0.2s ease",
    opacity: (props) => (props.category ? 0 : 1),
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
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
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    border: "1px dashed rgba(0, 0, 0, 0.12)",
    borderRadius: "8px",
    padding: "10px 14px",
  },
  uploadAvatarButton: {
    color: "#1f2937",
    backgroundColor: "#f3f4f6",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "8px 16px",
    borderRadius: "6px",
    textTransform: "none",
    fontWeight: "600",
    fontSize: "0.8rem",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#dc2626",
      borderColor: "#dc2626",
      color: "#ffffff",
      boxShadow: "0 0 10px rgba(220,38,38,0.35)",
    },
  },
  uploadAvatarText: {
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#4b5563",
  },
  imgIcon: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: "#6b7280",
      fontSize: "2rem !important",
    },
  },
  imageArea: {
    display: "flex",
    gap: "12px",
    width: "100%",
    overflowX: "auto",
    padding: "8px 4px",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
    scrollbarWidth: "thin",
    scrollbarColor: "#dc2626 rgba(0,0,0,0.05)",
    "&::-webkit-scrollbar": {
      height: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.02)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#dc2626",
      borderRadius: "2px",
    },
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    flexShrink: 0,
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
    marginTop: "1rem",
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

export default useStyles;
