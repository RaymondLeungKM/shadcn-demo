const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string)

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json()
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    })
    console.log("paymentIntent=", paymentIntent)
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret })
    )
  } catch (error) {
    return new Response("Could not create payment", { status: 500 })
  }
}
