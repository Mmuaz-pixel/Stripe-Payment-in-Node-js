const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout', async (req, res, next) => {
	try {
		const { products } = req.body;
		const items = products.map((product) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: product.name
				},
				unit_amount: Math.round(product.amount * 100) 
			},
			quantity: 1 // Quantity of the product
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: items,
			mode: "payment",
			success_url: "http://localhost:3000/success",
			cancel_url: "http://localhost:3000/cancel" 
		});

		console.log(session);

		res.json({ id: session.id });
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
});

app.listen(5000, () => {
	console.log('App is running on port 5000');
});
