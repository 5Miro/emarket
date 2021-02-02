import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, resetCreateOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const PlaceOrderScreen = (props) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;
	if (!cart.paymentMethod) {
		props.history.push("/payment");
	}
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	const toPrice = (num) => Number(num.toFixed(2)); // only 2 numbers after comma

	cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const dispatch = useDispatch();
	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart }));
	};

	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._id}`);
			dispatch(resetCreateOrder());
		}
	}, [dispatch, order, props.history, success]);
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className="row top">
				<div className="col-2">
					<ul>
						<li>
							<div className="card card-body">
								<h2>Shipping</h2>
								<p>
									<strong>Name:</strong>
									{shippingAddress.fullName} <br />
									<strong>Address:</strong>
									{shippingAddress.address}, {shippingAddress.city},{" "}
									{shippingAddress.postalCode}, {shippingAddress.country}
								</p>
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Payment method</h2>
								<p>
									<strong>Name:</strong>
									{paymentMethod} <br />
								</p>
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Order items</h2>
								<ul>
									{cartItems.map((item) => (
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
									<div>${cart.itemsPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping cost</div>
									<div>${cart.shippingPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Taxes</div>
									<div>${cart.taxPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Total</strong>
									</div>
									<div>${cart.totalPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<button
									type="button"
									onClick={placeOrderHandler}
									className="primary block"
									disabled={cartItems.length === 0}
								>
									Place order
								</button>
							</li>
							<li>
								{loading && <LoadingBox></LoadingBox>}
								{error && <MessageBox variant="danger">{error}</MessageBox>}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
