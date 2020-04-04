import React, {Component} from "react";
import Switch from "react-switch";
import SideMenu from '../SideMenu/SideMenu';

import SubAPI from "../../utils/SubAPI";
import "./Subscription.css"

/*
Nom
note
site internet

startdate
enddate
prix

*/

export class Subscription extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    send = async () => {
        try {
            const { data } = await SubAPI.addSub(
                localStorage.getItem("email"),
                this.state.name
            );
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        
        const { name, note, price, websiteLink, promoPrice } = this.props
        const display = this.state.promotion ? "block" : "none";

        return (
            <div id="subForm">
                <SideMenu id="1" />
                <div className="section">
                    <form>
                        <input 
                            type="text"
                            placeholder={name}
                            value={this.state.name}
                            onChange={this.handleName}
                            id="subTitle"
                        />
                        <span className="errorMessage" style={{display: this.state.displayNameError}}>{this.state.nameError}</span>
                        <div className="labelDiv">
                            <p>Note : </p>
                            <textarea
                                placeholder={note}
                                value={this.state.note}
                                onChange={this.handleNote}
                            />
                        </div>
                        <div className="labelDiv">
                            <p>Du : </p>
                            <input
                                type="date"
                                value={this.state.startDate}
                                onChange={this.handleStartDate}
                            />
                            <span className="errorMessage" style={{display: this.state.displayStartDateError}}>{this.state.startDateError}</span>
                        </div>
                        <div className="labelDiv">
                            <p>Au : </p>
                            <input
                                type="date"
                                value={this.state.endDate}
                                onChange={this.handleEndDate}
                            />
                            <span className="errorMessage" style={{display: this.state.displayEndDateError}}>{this.state.endDateError}</span>
                        </div>
                        <div className="labelDiv">
                            <p>Période de paiement : </p>
                            <select value={this.state.frequency} onChange={this.handleFrequency}>
                                <option value="daily">Quotidient</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="monthly">Mensuelle</option>
                                <option value="yearly">Annuelle</option>
                            </select>
                        </div>
                        <div className="labelDiv">
                            <p>Prix : </p>
                            <input
                                type="number"
                                placeholder={price}
                                value={this.state.price}
                                onChange={this.handlePrice}
                            />
                            <span className="errorMessage" style={{display: this.state.displayPriceError}}>{this.state.priceError}</span>
                        </div>
                        <div className="labelDiv">
                            <p>Site internet : </p>
                            <input
                                type="text"
                                placeholder={websiteLink}
                                value={this.state.websiteLink}
                                onChange={this.handleWebsiteLink}
                            />
                        </div>
                        <div className="promoAsk">
                            <p>Période promotionnelle ?</p>
                            <Switch 
                                className="switch" 
                                onChange={this.handlePromotion} 
                                checked={this.state.promotion} 
                                onColor="#3A5199" 
                            />
                        </div>
                    </form>
                    <button onClick={this.send}>Valider</button>
                </div>
            </div>
        );
    }
}