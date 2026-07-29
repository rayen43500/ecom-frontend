import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { createBanner, clearErrors } from "../../actions/bannerAction";
import { useHistory } from "react-router-dom";
import { CREATE_BANNER_RESET } from "../../constants/bannerConstants";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import useStyles from "./AdminFormStyle";
import { Avatar, TextField, Typography, Button } from "@material-ui/core";

function NewBanner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const classes = useStyles();
  const fileInputRef = useRef();

  const { loading, error, success } = useSelector((state) => state.bannerAction);
  const [tagline, setTagline] = useState("");
  const [quote, setQuote] = useState("");
  const [saleText, setSaleText] = useState("");
  const [productText, setProductText] = useState("Shop Now");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Banner created successfully");
      history.push("/admin/banners");
      dispatch({ type: CREATE_BANNER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const toggleHandler = () => setToggle(!toggle);

  const handleImageUpload = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();
    if (!image) {
      alert.error("Please upload a banner image");
      return;
    }
    dispatch(
      createBanner({ tagline, quote, saleText, productText, image })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="New Banner - Admin" />
          <div className={classes.updateProduct}>
            <div className={!toggle ? classes.firstBox1 : classes.toggleBox1}>
              <Sidebar />
            </div>
            <div className={classes.secondBox1}>
              <div className={classes.navBar1}>
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className={classes.formContainer}>
                <form
                  className={`${classes.form} ${classes.form2}`}
                  encType="multipart/form-data"
                  onSubmit={createBannerSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <ViewCarouselIcon />
                  </Avatar>
                  <Typography variant="h5" className={classes.heading}>
                    Create Home Banner
                  </Typography>

                  <TextField
                    className={`${classes.textField} ${classes.nameInput}`}
                    label="Tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={`${classes.textField} ${classes.nameInput}`}
                    label="Headline"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.descriptionInput}
                    label="Description"
                    value={saleText}
                    onChange={(e) => setSaleText(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                  <TextField
                    className={`${classes.textField} ${classes.nameInput}`}
                    label="Button Text"
                    value={productText}
                    onChange={(e) => setProductText(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                  />

                  <div className={classes.root}>
                    <Button
                      className={classes.uploadAvatarButton}
                      onClick={handleImageUpload}
                      startIcon={<CloudUploadIcon />}
                      type="button"
                    >
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    <Typography className={classes.uploadAvatarText}>
                      {image ? "Image selected" : "JPG, PNG recommended"}
                    </Typography>
                  </div>

                  {imagePreview && (
                    <div className={classes.imageArea}>
                      <img src={imagePreview} alt="Banner preview" className={classes.image} style={{ width: 120, height: 72 }} />
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.loginButton}
                    fullWidth
                  >
                    Create Banner
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

export default NewBanner;
