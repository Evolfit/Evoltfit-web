import { loadStripe } from "@stripe/stripe-js";

export default async function checkout({lineItems}, nombre){

    localStorage.setItem('Meses', nombre);

    let stripePromise = null
    
    const getStripe = () =>{
        if(!stripePromise){
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
        }
        return stripePromise;
    }

    const stripe = await getStripe();

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `http://localhost:3000/successPay`,
        cancelUrl: `http://localhost:3000/failurePay`
        })
}
