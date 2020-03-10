import React, {Component} from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";
import './SideMenu.css'



const SideMenu = ( { id } ) => (
    <div className="sideMenu">
        <h1>SuBBoard</h1>
        <ul>
            {
                ["Accueil", "Abonnements", "Calendrier", "Statistiques"].map((name, index) => (
                    <li key={index}><a href="#" className={id==index ? "active" : ""}>{name}</a></li>
                ))
            }
        </ul>
    </div>
)

export default SideMenu