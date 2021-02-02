import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress.address) {
		props.history.push("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("MercadoPago");
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		props.history.push("/placeorder");
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Choose your payment method</h1>
				</div>
				<div>
					<div>
						<input
							type="radio"
							id="mercadopago"
							value="MercadoPago"
							name="paymentMethod"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						></input>
						<label className="inline" htmlFor="mercadopago">
							MercadoPago
						</label>
					</div>
				</div>
				<div>
					<div>
						<input
							type="radio"
							id="paypal"
							value="PayPal"
							name="paymentMethod"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						></input>
						<label className="inline" htmlFor="paypal">
							PayPal
						</label>
					</div>
				</div>
				<div>
					<button className="primary" type="submit">
						Continue
					</button>
				</div>
			</form>
		</div>
	);
}
