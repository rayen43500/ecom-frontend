import axios from "../utils/axios";
import {
  ALL_BANNERS_REQUEST,
  ALL_BANNERS_SUCCESS,
  ALL_BANNERS_FAIL,
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  CLEAR_ERRORS,
} from "../constants/bannerConstants";

// Get All Banners (Public)
export const getBanners = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BANNERS_REQUEST });

    const { data } = await axios.get("/api/v1/banners");

    dispatch({
      type: ALL_BANNERS_SUCCESS,
      payload: data.banners,
    });
  } catch (error) {
    dispatch({
      type: ALL_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Banner (Admin)
export const createBanner = (bannerData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/v1/admin/banner/new",
      bannerData,
      config
    );

    dispatch({
      type: CREATE_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Banner (Admin)
export const updateBanner = (id, bannerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/banner/${id}`,
      bannerData,
      config
    );

    dispatch({
      type: UPDATE_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Banner (Admin)
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

    dispatch({
      type: DELETE_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
