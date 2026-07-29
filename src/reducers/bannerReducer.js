import {
  ALL_BANNERS_REQUEST,
  ALL_BANNERS_SUCCESS,
  ALL_BANNERS_FAIL,
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,
  CREATE_BANNER_RESET,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_RESET,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_RESET,
  CLEAR_ERRORS,
} from "../constants/bannerConstants";

export const bannersReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case ALL_BANNERS_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case ALL_BANNERS_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case ALL_BANNERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BANNER_REQUEST:
    case UPDATE_BANNER_REQUEST:
    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        banner: action.payload.banner,
      };
    case UPDATE_BANNER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
        banner: action.payload.banner,
      };
    case DELETE_BANNER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case CREATE_BANNER_FAIL:
    case UPDATE_BANNER_FAIL:
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BANNER_RESET:
      return {
        ...state,
        success: false,
      };
    case UPDATE_BANNER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_BANNER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
