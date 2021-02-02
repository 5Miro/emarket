import React from "react";

import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const dispatch = useDispatch();

	const signoutHandler = () => {
		dispatch(signout());
	};

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<Link className="brand" to="/">
							eMARKET
						</Link>
					</div>
					<div>
						<Link to="/cart">
							Cart
							{cartItems.length > 0 && (
								<span className="badge">{cartItems.length}</span>
							)}
						</Link>
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name} <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/history">Order history</Link>
									</li>
									<li>
										<Link to="/profile">User profile</Link>
									</li>
									<li>
										<Link to="/" onClick={signoutHandler}>
											Sign out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<main>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/" component={HomeScreen} exact></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/shipping" component={ShippingAdressScreen}></Route>
					<Route path="/payment" component={PaymentMethodScreen}></Route>
					<Route path="/placeorder" component={PlaceOrderScreen}></Route>
					<Route path="/order/:id" component={OrderScreen}></Route>
					<Route path="/history" component={OrderHistoryScreen}></Route>
					<PrivateRoute
						path="/profile"
						component={ProfileScreen}
					></PrivateRoute>
				</main>
				<footer className="row center">made by miroMIRO</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
