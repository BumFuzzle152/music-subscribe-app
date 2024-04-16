import React, { useState, useEffect } from 'react';
import SubscriptionCard from './SubscribedCard';
import { toast } from 'react-toastify';

function SubscriptionArea({ email }) {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        async function fetchSubscriptions() {
            const url_sub_list = "https://mhfdy4a2t9.execute-api.us-east-1.amazonaws.com/Production/retrive-sub";
            try {
                const response = await fetch(url_sub_list, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "email": email })
                });
                const data = await response.json();
                console.log(data);
                setSubscriptions(data.body || []); // Assuming data.body contains the array of subscriptions
            } catch (error) {
                console.error("Failed to fetch subscriptions:", error);
                setSubscriptions([]); // Handle error by setting no subscriptions
            }
        }

        fetchSubscriptions();
    }, [email]); // Dependency array with email to refetch when email changes

    const handleRemove = async (stitle) => {

        const sub_url = "https://rxcibosa33.execute-api.us-east-1.amazonaws.com/Production/remove-sub";
        try {
            console.log({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'songtitle': stitle, 'email': email})
            });
            const result = await fetch(sub_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'songtitle': stitle, 'email': email})
            });
            const response = await result.json();
            if (response.statusCode === 200) {
                toast.success("Song Unsubscribed!", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } else {
                toast.error("Unsubscribed Failed. Please try again.", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            toast.error("An error occurred while unsubscribed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
            });
            console.error("Error subscribing to song:", error);
        }
    };

    return (
        <div>
            <div className=".subscription-area">
                {subscriptions.map(subscription => (
                    <SubscriptionCard
                        key={subscription.id}
                        title={subscription.title}
                        artistName={subscription.artist}
                        year={subscription.year}
                        link={subscription.web_url}
                        img={subscription.img_url}
                        onRemove={() => handleRemove(subscription.title)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SubscriptionArea;
