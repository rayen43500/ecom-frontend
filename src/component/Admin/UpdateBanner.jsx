import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { getBanners, updateBanner, clearErrors } from "../../actions/bannerAction";
import { UPDATE_BANNER_RESET } from "../../constants/bannerConstants";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import useStyles from "./AdminFormStyle";
import { Avatar, TextField, Typography, Button } from "@material-ui/core";

function UpdateBanner() {
  const dispatch = useDispatch();
  const { id: bannerId } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const classes = useStyles();
  const fileInputRef = useRef();

  const { banners, loading: bannersLoading } = useSelector((state) => state.bannersList);
  const { loading, error, isUpdated } = useSelector((state) => state.bannerAction);

  const [tagline, setTagline] = useState("");
  const [quote, setQuote] = useState("");
  const [saleText, setSaleText] = useState("");
  const [productText, setProductText] = useState("Shop Now");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    const banner = banners?.find((b) => b._id === bannerId);
    if (banner) {
      setTagline(banner.tagline);
      setQuote(banner.quote);
      setSaleText(banner.saleText);
      setProductText(banner.productText);
      setOldImage(banner.image?.url || "");
      setImagePreview(banner.image?.url || "");
    }
  }, [banners, bannerId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Banner updated successfully");
      history.push("/admin/banners");
      dispatch({ type: UPDATE_BANNER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated]);

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

  const updateBannerSubmitHandler = (e) => {
    e.preventDefault();
    const bannerData = { tagline, quote, saleText, productText };
    if (image) bannerData.image = image;
    dispatch(updateBanner(bannerId, bannerData));
  };

  return (
    <>
      {bannersLoading || loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Banner - Admin" />
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
                  onSubmit={updateBannerSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <ViewCarouselIcon />
                  </Avatar>
                  <Typography variant="h5" className={classes.heading}>
                    Update Home Banner
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
                      Change Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    <Typography className={classes.uploadAvatarText}>
                      {image ? "New image selected" : "Keep current or upload new"}
                    </Typography>
                  </div>

                  {(imagePreview || oldImage) && (
                    <div className={classes.imageArea}>
                      <img
                        src={imagePreview || oldImage}
                        alt="Banner preview"
                        className={classes.image}
                        style={{ width: 160, height: 96, objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.loginButton}
                    fullWidth
                    disabled={loading}
                  >
                    Update Banner
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

export default UpdateBanner;
