import React from 'react'
import { loadStripe } from '@stripe/stripe-js'

const Payment = () => {

	const cart = [
		{
			amount: 40, 
			name: 'Shoes', 
			description: 'Adidas shoes'
		}, 
		{
			amount: 20, 
			name: 'Shirt', 
			description: 'just a simple shirt'
		}
	]

	const submitPayment = async () => {
		const stripe = await loadStripe('pk_test_51Of5IiSBdpqmCMjZCpCYADY3pTPrKxeOo1dQ4hBIrTQnIYsGi1mPb5OreKJQ6GXaA6TO4d4pPrp82WmZsG60kqgg005gUNyk89'); // publishable key
		const body = {
			products: cart, 
		}

		const response = await fetch('http://localhost:5000/create-checkout', {
			method: 'POST', 
			headers: {
				'Content-Type': "application/json"
			}, 
			body: JSON.stringify(body)
		})

		console.log(response); 

		const session = await response.json(); 

		const result = stripe.redirectToCheckout({
			sessionId: session.id
		})

		if(result.error)
		{
			console.log(result.error); 
		}
	}

	return (
		<>
			<h1>Checkout cart</h1>
			<button onClick={submitPayment} style={{ margin: '10px' }}>Pay now</button>
		</>
	)
}

export default Payment; 