import React, {Component} from "react";
import Switch from "react-switch";
import SideMenu from '../SideMenu/SideMenu';

import SubAPI from "../../utils/SubAPI";
import "./Subscription.css"

export class Subscription extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        try {
            const { data } = await SubAPI.getSub(
                localStorage.getItem("email"),
                localStorage.getItem("name")
            );
            this.setState({data: data.data});
        } catch (error) {
            console.error(error);
        }
    }

    test = () => {this.state.data.periods.map(({id, start, end, frequency, price, type}) => {
        console.log(id);
    })
    }

    formattedDate = (date) => {
        const d = new Date(date);
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${day}/${month}/${year}`;
    }

    deletePeriod = async (id) => {
        try {
            const { data } = await SubAPI.deletePeriod(
                id
            );
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const name = localStorage.getItem("name");
        const link = "http://" + this.state.data.website_link;

        return (
            <div id="subForm">
                <SideMenu id="1" />
                <div className="section">
                    <h1 onClick={this.test}>{name}</h1>
                    {this.state.data.website_link && (<a href={link} target="_blank">Lien du site</a>)}
                    <p>Note</p>
                    {
                        this.state.data.length ?? this.state.data.periods.map(({id, start, end, frequency, price, type}) => (
                            <div className="period" key={id}>
                                <p>Du : {this.formattedDate(start)}</p>
                                <p>Au : {this.formattedDate(end)}</p>
                                <p>Prix : {price}</p>
                                <p>Fréquence : {frequency}</p>
                                <p>Promo : {type ? ("oui") : ("non")} </p>
                                <button onClick={() => this.deletePeriod(id)}>Supprimer</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}