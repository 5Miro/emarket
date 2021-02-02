import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderListUser } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrderHistoryScreen = (props) => {
	const orderList = useSelector((state) => state.orderListUser);
	const { loading, error, orders } = orderList;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(orderListUser());
	}, [dispatch]);

	return (
		<div>
			<h1>Order History</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<th>{order._id}</th>
								<th>{order.createdAt.substring(0, 10)}</th>
								<th>${order.totalPrice.toFixed(2)}</th>
								<th>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</th>
								<th>
									{order.isDelivered
										? order.deliveredAt.substring(0, 10)
										: "No"}
								</th>
								<th>
									<button
										type="button"
										className="small"
										onClick={() => {
											props.history.push(`/order/${order._id}`);
										}}
									>
										Details
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrderHistoryScreen;
