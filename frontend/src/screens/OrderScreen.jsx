import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder, resetPayOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrderScreen = (props) => {
	const orderId = props.match.params.id;
	const [sdkReady, setSdkReady] = useState({ loading: false, loaded: false });
	const orderDetails = useSelector((state) => state.orderDetails);
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	if (!userInfo) {
		props.history.push(`/signin?redirect=/order/${props.match.params.id}`);
	}

	const { order, loading, error } = orderDetails;
	const dispatch = useDispatch();

	const orderPay = useSelector((state) => state.orderPay);
	const {
		error: errorPay,
		success: successPay,
		loading: loadingPay,
	} = orderPay;

	const addPayPalScript = async () => {
		const { data } = await Axios.get("/api/config/paypal");
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
		script.async = true;
		script.addEventListener("load", () => {
			setSdkReady({ loading: false, loaded: true });
		});
		document.body.appendChild(script);
		console.log("append script");
	};

	useEffect(() => {
		if (!sdkReady.loading && !sdkReady.loaded) {
			setSdkReady({ loading: true, loaded: false });
			addPayPalScript();
		}

		if (!order || successPay || (order && order._id !== orderId)) {
			dispatch(resetPayOrder());
			dispatch(detailsOrder(orderId));
		}
	}, [dispatch, orderId, order, sdkReady, successPay]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(order, paymentResult));
	};

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<h1>Order {order._id}</h1>
			<div className="row top">
				<div className="col-2">
					<ul>
						<li>
							<div className="card card-body">
								<h2>Shipping</h2>
								<p>
									<strong>Name:</strong>
									{order.shippingAddress.fullName} <br />
									<strong>Address:</strong>
									{order.shippingAddress.address}, {order.shippingAddress.city},{" "}
									{order.shippingAddress.postalCode},{" "}
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<MessageBox variant="success">
										Delivered at {order.deliveredAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not delivered yet</MessageBox>
								)}
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Payment method</h2>
								<p>
									<strong>Name:</strong>
									{order.paymentMethod} <br />
								</p>
								{order.isPaid ? (
									<MessageBox variant="success">
										Paid at {order.paidAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not paid yet</MessageBox>
								)}
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Order items</h2>
								<ul>
									{order.cartItems.map((item) => (
										<li key={item.product}>
											<div className="row">
												<div>
													<img
														src={"." + item.image}
														alt={item.name}
														className="small"
													></img>
												</div>
												<div className="min-30">
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</div>
												<div></div>
												<div>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className="col-1">
					<div className="card card-body">
						<ul>
							<li>
								<h2>Order summary</h2>
							</li>
							<li>
								<div className="row">
									<div>Items</div>
									<div>${order.itemsPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping cost</div>
									<div>${order.shippingPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Taxes</div>
									<div>${order.taxPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Total</strong>
									</div>
									<div>${order.totalPrice.toFixed(2)}</div>
								</div>
							</li>
							{!order.isPaid && (
								<li>
									{sdkReady.loading ? (
										<LoadingBox></LoadingBox>
									) : sdkReady.loaded ? (
										<>
											{errorPay && (
												<MessageBox variant="danger">{errorPay}</MessageBox>
											)}
											{loadingPay && <LoadingBox></LoadingBox>}
											<PayPalButton
												amount={order.totalPrice}
												onSuccess={successPaymentHandler}
											></PayPalButton>
										</>
									) : (
										<></>
									)}
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
