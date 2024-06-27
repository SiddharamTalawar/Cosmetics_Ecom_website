import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";
import "../styles/Payment.css";
// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

const stripePromise = loadStripe("pk_test_51PVreY2Kpxj32LXyjRVOrOK8Hd2t4NDmRFlK1uJ1PY6nrlzjbK1u9gynQz6VdPWpI8iMzzZ0cmphQH6IrerOIvEP00gHhJVPsK");

 function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
console.log("payment",location)
  useEffect(() => {
    // setClientSecret(clsecret.clsecret);
    setClientSecret(location.state.cl_secret);
  }, []);
  
//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Payment_page">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cl_secret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}

export default  Payment