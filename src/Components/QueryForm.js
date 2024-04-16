import React, { useState } from 'react';
import QueryCard from './QueryCard';
import { toast } from 'react-toastify';

function QueryForm({ email }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [queryResults, setQueryResults] = useState([]);

    const handleQuery = async (event) => {
        // Perform the search operation here
        event.preventDefault();
        const url_query = "https://kqqxlqgdui.execute-api.us-east-1.amazonaws.com/Production/query-music-table"
        
        const payload = {};
        if (title.trim() !== '') payload['titel'] = title;
        if (year.trim() !== '') payload['year'] = parseInt(year, 10);
        if (artist.trim() !== '') payload['artist'] = artist;
        payload['email'] = email;

        try{
            const result = await fetch(url_query, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                
                body: JSON.stringify(payload)
            });
            const data = await result.json();
            setQueryResults(data);
        }catch(error){
            toast.error("No Data Found for entered values",
            {
                position: "top-center",
                autoClose: 5000
            });
            console.error("Error querying data:-", error);
        }
    };

    const handleSubscribe = async (stitle) => {

        const sub_url = "https://1itwoyfp18.execute-api.us-east-1.amazonaws.com/Production/sub-spec-musci";
        try {
            const result = await fetch(sub_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'songtitle': stitle, 'email': email})
            });
            const response = await result.json();
            if (response.statusCode === 200) {
                toast.success("Song Subscribed!", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } else {
                toast.error("Subscription failed. Please try again.", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            toast.error("An error occurred while subscribing. Please try again.", {
                position: "top-center",
                autoClose: 5000,
            });
            console.error("Error subscribing to song:", error);
        }
    };

    return (
        <div>
            <div className="query-form">
                <h3>Music Query</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                />
                <button onClick={handleQuery}>Query</button>
            </div>

            <div className="query-results">
                {queryResults.map(result => (
                    <QueryCard
                        key={result.id}
                        title={result.title}
                        artistName={result.artist}
                        year={result.year}
                        link={result.web_url}
                        img={result.img_s3_url}
                        email={email}
                        onSubscribe={() => handleSubscribe(result.title)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QueryForm;
