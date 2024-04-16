import React from 'react';
import { toast } from 'react-toastify';

function QueryCard({ key, title, img, artistName, year, link, email, onSubscribe}) {
    return (
        <div className="card">
            <img src={img} alt="Artist" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{artistName}</h6>
                <p className="card-text">Year: {year}</p>
                <a href={link} className="card-link" target="_blank" rel="noopener noreferrer">Listen</a>
                <button className="btn btn-primary" onClick={(event) => onSubscribe(event)}>Subscribe</button>
            </div>
        </div>
    );
}

export default QueryCard;