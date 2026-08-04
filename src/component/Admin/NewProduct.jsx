import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createProduct, clearErrors } from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstatns";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InfoIcon from "@mui/icons-material/Info";

import Navbar from "./Navbar";

import useStyles from "./AdminFormStyle";
import {
  Avatar,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@material-ui/core";

const createEmptyVariant = () => ({
  color: "",
  images: [],
  previews: [],
});

function NewProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info , setInfo] = useState("")
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [variants, setVariants] = useState([createEmptyVariant()]);
  const [isCategory, setIsCategory] = useState(false);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);

  const classes = useStyles();
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };
 const categories = [
   "Cricket Kits",
   "Batting Gloves",
   "Batting Pads",
   "Bats",
   "Bags",
   "Helmets",
   "Balls",
   "Stumps",
   "Shoes",
   "Clothing",
   "Accessories",
 ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set(
      "variants",
      JSON.stringify(
        variants
          .filter((variant) => variant.color.trim() && variant.images.length > 0)
          .map((variant) => ({
            color: variant.color.trim(),
            images: variant.images,
          }))
      )
    );
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVariantColorChange = (index, value) => {
    setVariants((prev) =>
      prev.map((variant, currentIndex) =>
        currentIndex === index ? { ...variant, color: value } : variant
      )
    );
  };

  const handleVariantImagesChange = (index, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const nextVariantImages = [];
    const nextVariantPreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          nextVariantPreviews.push(reader.result);
          nextVariantImages.push(reader.result);

          setVariants((prev) =>
            prev.map((variant, currentIndex) =>
              currentIndex === index
                ? {
                    ...variant,
                    images: nextVariantImages,
                    previews: nextVariantPreviews,
                  }
                : variant
            )
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Product"} />
          <div className={classes.updateProduct}>
            <div
              className={
                !toggle ? `${classes.firstBox1}` : `${classes.toggleBox1}`
              }
            >
              <Sidebar />
            </div>

            <div className={classes.secondBox1}>
              <div className={classes.navBar1}>
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <div
                className={`${classes.formContainer} ${classes.formContainer2}`}
              >
                <form
                  className={`${classes.form} ${classes.form2}`}
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <AddCircleOutlineIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.heading}
                  >
                    Create Product
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ShoppingCartOutlinedIcon
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    variant="outlined"
                    label="Price"
                    value={price}
                    required
                    fullWidth
                    className={`${classes.passwordInput} ${classes.textField}`}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Stock"
                    value={Stock}
                    required
                    className={`${classes.passwordInput} ${classes.textField}`}
                    onChange={(e) => setStock(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <StorageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Product info"
                    value={info}
                    required
                    className={`${classes.passwordInput} ${classes.textField}`}
                    onChange={(e) => setInfo(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <InfoIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className={classes.selectOption}>
                    {!isCategory && (
                      <Typography variant="body2" className={classes.labelText}>
                        Choose Category
                      </Typography>
                    )}
                    <FormControl className={classes.formControl}>
                      <Select
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={handleCategoryChange}
                        className={classes.select}
                        inputProps={{
                          name: "category",
                          id: "category-select",
                        }}
                        MenuProps={{
                          classes: {
                            paper: classes.menu,
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        {!category && (
                          <MenuItem value="">
                            <em>Choose Category</em>
                          </MenuItem>
                        )}
                        {categories.map((cate) => (
                          <MenuItem key={cate} value={cate}>
                            {cate}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={classes.descriptionInput}
                    label="Product Description"
                    multiline
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <DescriptionIcon
                            className={classes.descriptionIcon}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ width: "100%", marginBottom: "1.25rem" }}>
                    <Typography variant="body2" style={{ marginBottom: "0.5rem", color: "#6b7280", fontWeight: 600 }}>
                      Color variants
                    </Typography>
                    {variants.map((variant, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid rgba(0,0,0,0.08)",
                          borderRadius: 12,
                          padding: 12,
                          marginBottom: 12,
                          background: "#fafafa",
                        }}
                      >
                        <TextField
                          variant="outlined"
                          fullWidth
                          label={`Color ${index + 1}`}
                          value={variant.color}
                          onChange={(e) => handleVariantColorChange(index, e.target.value)}
                          style={{ marginBottom: 12 }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleVariantImagesChange(index, e)}
                          style={{ marginBottom: 10 }}
                        />
                        {variant.previews.length > 0 && (
                          <Box className={classes.imageArea} style={{ marginTop: 8 }}>
                            {variant.previews.map((preview, previewIndex) => (
                              <img
                                key={previewIndex}
                                src={preview}
                                alt={`Variant ${index + 1} preview ${previewIndex + 1}`}
                                className={classes.image}
                              />
                            ))}
                          </Box>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 8 }}>
                          <Button variant="outlined" onClick={() => removeVariant(index)} disabled={variants.length === 1}>
                            Remove variant
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outlined" onClick={addVariant} style={{ marginTop: 4 }}>
                      Add another color
                    </Button>
                  </div>

                  <div className={classes.root}>
                    <div className={classes.imgIcon}>
                      <CollectionsIcon
                        fontSize="large"
                        style={{ fontSize: 40 }}
                      />
                    </div>

                    <input
                      type="file"
                      name="avatar"
                      className={classes.input}
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <label htmlFor="avatar-input">
                      <Button
                        variant="contained"
                        color="default"
                        className={classes.uploadAvatarButton}
                        startIcon={
                          <CloudUploadIcon
                            style={{
                              color: "#FFFFFF",
                            }}
                          />
                        }
                        onClick={handleImageUpload}
                      >
                        <p className={classes.uploadAvatarText}>
                          Upload Images
                        </p>
                      </Button>
                    </label>
                  </div>

                  <Box className={classes.imageArea}>
                    {imagesPreview &&
                      imagesPreview.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Product Preview"
                          className={classes.image}
                        />
                      ))}
                  </Box>

                  <Button
                    variant="contained"
                    className={classes.loginButton}
                    fullWidth
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
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
export default NewProduct;
