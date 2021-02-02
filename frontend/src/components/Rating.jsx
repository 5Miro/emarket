import React, { Component } from "react";

class Rating extends Component {
	constructor(props) {
		super(props);
		this.rating = this.props.rating;
		this.numReviews = this.props.numReviews;
	}
	state = {};
	render() {
		return (
			<div className="rating">
				<span>
					<i className={this.rating >= 1 ? "fa fa-star" : this.rating >= 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
				</span>
				<span>
					<i className={this.rating >= 2 ? "fa fa-star" : this.rating >= 1.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
				</span>
				<span>
					<i className={this.rating >= 3 ? "fa fa-star" : this.rating >= 2.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
				</span>
				<span>
					<i className={this.rating >= 4 ? "fa fa-star" : this.rating >= 3.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
				</span>
				<span>
					<i className={this.rating >= 5 ? "fa fa-star" : this.rating >= 4.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
				</span>
				<span>{this.numReviews + " reviews"}</span>
			</div>
		);
	}
}

export default Rating;
