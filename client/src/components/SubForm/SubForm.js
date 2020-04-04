import React, {Component} from "react";
import Switch from "react-switch";
import SideMenu from '../SideMenu/SideMenu';

import SubAPI from "../../utils/SubAPI";
import "./SubForm.css"

export class SubForm extends Component {

    static defaultProps = {
        name: "Nom",
        note: "Note",
        price: "0",
        websiteLink: "www.siteweb.fr",
        promoPrice: "0"
    }

    constructor() {
        super();
        this.state = {
            name: '',
            note: '',
            startDate: '',
            endDate: '',
            frequency: 'monthly',
            price: '',
            websiteLink: '',
            promotion: false,
            
            nameError: '',
            displayNameError: "none",
            startDateError: '',
            displayStartDateError: "none",
            endDateError: '',
            displayEndDateError: "none",
            priceError: '',
            displayPriceError: "none"
        };
    }

    handlePromotion = (promotion) => {
        this.setState({ promotion });
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })

        if(event.target.value == '') {
            this.state.nameError = 'Le champ Nom ne peux pas être vide';
            this.state.displayNameError = "block";
        }
        else {
            this.state.nameError = '';
            this.state.displayNameError = "none";
        }
    }

    handleNote = (event) => {
        this.setState({ note: event.target.value })
    }

    handleStartDate = (event) => {
        this.setState({ startDate: event.target.value })

        if(new Date(event.target.value).getTime() != new Date(event.target.value).getTime()) {
            this.state.startDateError = "Le date choisit n'est pas valide";
            this.state.displayStartDateError = "block";
        }
        else {
            this.state.startDateError = '';
            this.state.displayStartDateError = "none";
        }
    }

    handleEndDate = (event) => {
        this.setState({ endDate: event.target.value })

        if(new Date(event.target.value).getTime() != new Date(event.target.value).getTime()) {
            this.state.endDateError = "Le date choisit n'est pas valide";
            this.state.displayEndDateError = "block";
        }
        else if (new Date(event.target.value) < new Date(this.state.startDate)) {
            this.state.endDateError = "Le date de fin doit être après la date de début";
            this.state.displayEndDateError = "block";
        }
        else {
            this.state.endDateError = '';
            this.state.displayEndDateError = "none";
        }
    }

    handleFrequency = (event) => {
        this.setState({ frequency: event.target.value })
    }

    handlePrice = (event) => {
        if(event.target.value.search(/^\s*-?[1-9]\d*((\.|,)\d{1,2})?\s*$/) != -1)
            this.setState({ price: event.target.value })
            
        if(event.target.value == '') {
            this.state.priceError = 'Le champ Prix ne peux pas être vide';
            this.state.displayPriceError = "block";
        }
        else {
            this.state.priceError = '';
            this.state.displayPriceError = "none";
        }
    }

    handleWebsiteLink = (event) => {
        this.setState({ websiteLink: event.target.value })
    }

    send = async () => {
        try {
            const { data } = await SubAPI.addSub(
                localStorage.getItem("email"),
                this.state.name,
                this.state.note,
                this.state.websiteLink,
                this.state.startDate,
                this.state.endDate,
                this.state.frequency,
                this.state.price,
                this.state.promotion,
            );
        } catch (error) {
            console.error(error);
        }
        window.location = "/dashboard";
    };

    render() {
        
        const { name, note, price, websiteLink } = this.props
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