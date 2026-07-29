import React from "react";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IN from "../../Image/flag/in.svg";
import US from "../../Image/flag/us.svg";
import GB from "../../Image/flag/gb.svg";
import FR from "../../Image/flag/fr.svg";

const countryOptions = [
  { code: "fr", label: "France", flag: FR },
  { code: "us", label: "USA", flag: US },
  { code: "gb", label: "UK", flag: GB },
  { code: "in", label: "India", flag: IN },
];

const useStyles = makeStyles(() => ({
  flagSelectWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "110px",
  },
  flagIcon: {
    width: 22,
    height: 16,
    objectFit: "cover",
    borderRadius: "2px",
    border: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
    flexShrink: 0,
  },
  flagIconSmall: {
    width: 20,
    height: 14,
    objectFit: "cover",
    borderRadius: "2px",
    border: "1px solid rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  countryName: {
    fontSize: 12,
    color: "#f5f5f5",
    fontFamily: "Inter, Roboto, sans-serif",
    fontWeight: 500,
    letterSpacing: "0.01em",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px !important",
    "&:hover": {
      backgroundColor: "rgba(220, 38, 38, 0.08) !important",
    },
  },
  customSelect: {
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    height: 28,
    minWidth: "110px",
    color: "#f5f5f5",
    fontSize: 12,
    fontFamily: "Inter, Roboto, sans-serif",
    background: "transparent",
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 28px 4px 4px !important",
    },
    "& .MuiSelect-icon": {
      color: "rgba(255,255,255,0.7)",
      right: 0,
    },
    "&:hover .MuiSelect-icon": {
      color: "#ffffff",
    },
    "&::before, &::after": {
      display: "none",
    },
  },
  menuPaper: {
    marginTop: 4,
    borderRadius: "8px !important",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15) !important",
    border: "1px solid rgba(0,0,0,0.08)",
  },
}));

const FlagSelect = ({ value = "fr", onChange }) => {
  const classes = useStyles();

  const handleImageError = (event) => {
    event.target.style.display = "none";
  };

  const renderValue = (selectedValue) => {
    const option = countryOptions.find((o) => o.code === selectedValue) || countryOptions[0];
    return (
      <div className={classes.flagSelectWrap}>
        <img
          src={option.flag}
          alt={`${option.label} flag`}
          className={classes.flagIcon}
          onError={handleImageError}
        />
        <span className={classes.countryName}>{option.label}</span>
      </div>
    );
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      className={classes.customSelect}
      variant="standard"
      disableUnderline
      renderValue={renderValue}
      MenuProps={{
        classes: { paper: classes.menuPaper },
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "left" },
      }}
    >
      {countryOptions.map((option) => (
        <MenuItem key={option.code} value={option.code} className={classes.menuItem}>
          <img
            src={option.flag}
            alt={`${option.label} flag`}
            className={classes.flagIconSmall}
            onError={handleImageError}
          />
          <span style={{ fontSize: 13, fontWeight: 500 }}>{option.label}</span>
        </MenuItem>
      ))}
    </Select>
  );
};

export default FlagSelect;
