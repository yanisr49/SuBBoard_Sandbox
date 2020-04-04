import React from "react";

import './Thumbnail.css'

const Thumbnail = ({ id, name, logo_path, period, onClick, frequencyFunction, dateFunction}) => (
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
            <p>Début : {dateFunction(period.start)}</p>
            <p>Fin : {dateFunction(period.end)}</p>
            <p>Fréquence : {frequencyFunction(period.frequency)}</p>
            <p>Prix : {period.price}€</p>
            <p>Période promotionelle : {period.type ? ("oui") : ("non")}</p>
        </div>
    </div>
)

export default Thumbnail