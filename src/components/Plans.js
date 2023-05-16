import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase"
import "./Plans.css"
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setProduct, selectProduct } from "../features/productSlice";
import { loadStripe } from "@stripe/stripe-js";

function Plans() {
    const dispatch = useDispatch()
    const products = useSelector(selectProduct)
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        const getSubscription = async () => {
            const q = query(collection(db, "customers", user.uid, "subscriptions"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            })
        }
        getSubscription()
    }, [user.uid])

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), where("active", "==", true));
            const querySnapshot = await getDocs(q);
            const fetchedProducts = {};

            const pricePromises = querySnapshot.docs.map(async (productDoc) => {
                fetchedProducts[productDoc.id] = productDoc.data();


                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.forEach((price) => {
                    fetchedProducts[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            await Promise.all(pricePromises);
            dispatch(setProduct(fetchedProducts))

        };

        fetchProducts();
    }, []);

    const loadCheckout = async (priceId) => {
        const collectionRef = collection(db, 'customers', user.uid, 'checkout_sessions');

        const docRef = await addDoc(collectionRef, {
            price: priceId,
            success_url: window.location.origin + '/profile',
            cancel_url: window.location.origin + '/profile'
        });

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                //show an error to your customer and inspect your cloud function logs in the firebase console
                alert(`An error occured: ${error.message}`)
            }
            if (sessionId) {
                //we have a session, let's redirect to checkout
                //init stripe
                const stripe = await loadStripe("pk_test_51N7GeiBFDzAg6pAWzUW9029WKty4z8ezmIOJLo9cDudQVnvY24PHoqNtDyGaoio24z99pdTHCjsH64MeCNGiJTfe00yu8DXgfx")
                stripe.redirectToCheckout({ sessionId })

            }
        })
    }

    // eslint-disable-next-line react/prop-types
    const Button = ({ isCurrentPackage, priceId }) => {
        const [buttonText, setButtonText] = useState('Subscribe')
        const [buttonDisabled, setButtonDisabled] = useState(false)

        useEffect(() => {
            console.log(priceId)
            if (isCurrentPackage) {
                setButtonText('Current Package')
                setButtonDisabled(true)
            }
        }, [subscription, priceId, isCurrentPackage])


        return (
            <button onClick={() => {
                loadCheckout(priceId)
                setButtonText('Loading...')
                setButtonDisabled(true)
            }} className="plans_subscribe" disabled={buttonDisabled}>{buttonText}</button>
        )
    }

    useEffect(() => {
        console.log(products)
    }, [])


    return (
        <div className="plans">
            <br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
            }
            {Object.entries(products).map(([productId, productData]) => {
                //add some logic to check if the user's subscription is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
                return (
                    <div key={productId} className={`${isCurrentPackage && 'plans_plan--disbale'} plans_plan`}>
                        <div className="plans_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        {/*                         <button onClick={() => {
                            loadCheckout(productData.prices.priceId)
                        }} className="plans_subscribe" disabled={isCurrentPackage}>{isCurrentPackage ? 'Current Package' : 'Subscribe'}</button> */}
                        <Button isCurrentPackage={isCurrentPackage} priceId={productData.prices?.priceId} />
                    </div>
                )
            })}
        </div>
    )
}

export default Plans