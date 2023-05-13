import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase"
function Plans() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), where("active", "==", true));
            const querySnapshot = await getDocs(q);
            const fetchedProducts = {};

            querySnapshot.forEach(async (productDoc) => {
                fetchedProducts[productDoc.id] = productDoc.data();

                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.forEach((price) => {
                    fetchedProducts[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });

            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    console.log(products)

    return (
        <div className="plans">
            {Object.entries(products).map(([productId, productData]) => {
                //add some logic to check if the user's subscription is active
                return (
                    <div key={productId} className="plans_plan">
                        <div className="plans_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button>Subscribe</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Plans