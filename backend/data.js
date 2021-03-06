import bcrypt from "bcryptjs";

const data = {
	users: [
		{
			name: "Miro",
			email: "ramiro@miro.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: true,
		},
		{
			name: "Carlos",
			email: "carlos@miro.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: false,
		},
	],

	products: [
		{
			name: "50 inch Sorny TV",
			category: "Electronics",
			image: "./resources/images/tv.jpg",
			price: 750,
			countInStock: 10,
			brand: "Sorny",
			rating: 4.5,
			numReviews: 10,
			description: "IPN 4K Panel",
		},
		{
			name: "Air conditioner LiG",
			category: "Electronics",
			image: "./resources/images/ac.jpg",
			price: 499,
			countInStock: 20,
			brand: "LiG",
			rating: 4.0,
			numReviews: 10,
			description: "A+ power efficiency",
		},
		{
			name: "Gaming Laptop Razor X",
			category: "Electronics",
			image: "./resources/images/laptop.jpg",
			price: 1999,
			countInStock: 0,
			brand: "Razor",
			rating: 4.8,
			numReviews: 17,
			description: "8 cores CPU, 16gb DDR4 memory",
		},
		{
			name: "Refrigerator S100",
			category: "Electronics",
			image: "./resources/images/fridge.jpg",
			price: 809,
			countInStock: 15,
			brand: "Sonsang",
			rating: 4.5,
			numReviews: 14,
			description: "4 different cooling temps",
		},
		{
			name: "White socks",
			category: "Clothes",
			image: "./resources/images/socks.jpg",
			price: 5,
			countInStock: 5,
			brand: "Puna",
			rating: 4.5,
			numReviews: 10,
			description: "100% cotton",
		},
		{
			name: "Smartphone Sonsang",
			category: "Electronics",
			image: "./resources/images/phone.jpg",
			price: 299,
			countInStock: 12,
			brand: "Sonsang",
			rating: 4.5,
			numReviews: 15,
			description: "Budget phone, great camera tho",
		},
	],
};
export default data;
