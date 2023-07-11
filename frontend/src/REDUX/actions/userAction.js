import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/userConstants";
import {
  LOAD_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL,
} from "../constants/userConstants";
import { LOGIN_REQUEST } from "../constants/userConstants";
import { LOGIN_SUCCESS } from "../constants/userConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
//clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const register = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userdata, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type: LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//update user profile-name,email,avatar

export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userdata, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
