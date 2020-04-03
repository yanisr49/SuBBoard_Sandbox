import React, {Component} from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";
import './SideMenu.css'

export class SideMenu extends Component {

    disconnect = () => {
        API.logout();
        window.location = "/";
    };
    
    render() {
        return (
            <div className="sideMenu">
                <h1>SuBBoard</h1>
                <ul>
                    {
                        [["Accueil", '/'], ["Abonnements", '/dashboard'], ["Calendrier", ''], ["Statistiques", '']].map((name, index) => (
                            <li key={index}>
                                <a href={name[1]} className={this.props.id==index ? "active" : ""}>{name[0]}</a>
                            </li>
                        ))
                    }
                </ul>
                <button onClick={this.disconnect} id="deconnect">
                    Se déconnecter
                </button>
            </div>
        );
    }
}

export default SideMenu