"use client"

import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import CheckoutForm from "@/components/checkoutform"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY as string
)

export default function Payment() {
  const [clientSecret, setClientSecret] = React.useState("")

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        console.log("data=", data)
        setClientSecret(data.clientSecret)
      })
  }, [])

  const appearance = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
