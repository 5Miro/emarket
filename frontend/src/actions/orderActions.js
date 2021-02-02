import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_USER_FAIL, ORDER_LIST_USER_REQUEST, ORDER_LIST_USER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await
            Axios.post("/api/orders", order, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.payload });
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
        })
    }
}

export const resetCreateOrder = () => (dispatch) => {
    dispatch({ type: ORDER_CREATE_RESET });
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } })
    const { userSignin: { userInfo } } = getState();
    try {

        const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
    }
}

export const resetPayOrder = () => (dispatch) => {
    dispatch({ type: ORDER_PAY_RESET });
}

export const orderListUser = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_USER_REQUEST })
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get("api/orders/list", {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_LIST_USER_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({ type: ORDER_LIST_USER_FAIL, payload: message })
    }
}