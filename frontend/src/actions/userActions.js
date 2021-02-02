import Axios from "axios";
import { USER_GET_PROFILE_FAIL, USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userContants"

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/users/signin", { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_SIGNIN_FAIL, payload: message })
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    dispatch({ type: USER_SIGNOUT });
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post("/api/users/register", { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const getProfile = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_GET_PROFILE_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_GET_PROFILE_FAIL, payload: message })
    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`/api/users/profile`, user, {
            headers: { authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message })
    }

}
