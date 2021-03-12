import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

class Product extends Component {
	state = {};
	render() {
		return (
			<div key={this.props.product._id} className="card">
				<div className="card-image-container">
					<Link to={`/product/${this.props.product._id}`}>
						<img className="medium" src={this.props.product.image} alt={this.props.product.name} />
					</Link>
				</div>				
				<div className="card-body">
					<Link to={`/product/${this.props.product._id}`}>
						<h2>{this.props.product.name}</h2>
					</Link>
					<Rating rating={this.props.product.rating} numReviews={this.props.product.numReviews}></Rating>
					<div className="price">${this.props.product.price}</div>
				</div>
			</div>
		);
	}
}

export default Product;
