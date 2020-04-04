import React from "react";

import './Thumbnail.css'

const Thumbnail = ({ id, name, logo_path, period, onClick}) => (
    <div className="thumbnail" onClick={() => onClick(id, name)}>
        <div className="top">
            <p className="title">{name}</p>
            {/*<img src={logo_path} alt="logo"/>*/}
        </div>
        {/*
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
        */}
        <div className="middle">
            <p>Début : {period.start}</p>
            <p>Fin : {period.end}</p>
            <p>Fréquence : {period.frequency}</p>
            <p>Prix : {period.price}€</p>
            <p>Promo : {period.type}€</p>
        </div>
    </div>
)

export default Thumbnail