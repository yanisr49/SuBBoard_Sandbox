import React from "react";

import './Thumbnail.css'

const Thumbnail = ({ title, img, tags, start, end, price, promotion}) => (
    <div className="thumbnail">
        <div className="top">
            <p className="title">{title}</p>
            <img src={img} alt="logo"/>
        </div>
        <div className="tags">
            <div className="wrapper">
                <span className="points">...</span>
                {
                    tags.map(({name, color}, index) => (
                        <span className="tag" style={{backgroundColor: color}}>{name}</span>
                    ))
                }
            </div>
        </div>
        <div className="middle">
            <p>Début : {start}</p>
            <p>Fin : {end}</p>
            <p>Prix : {price}€</p>
            <p>Promo : {promotion}€</p>
        </div>
    </div>
)

export default Thumbnail