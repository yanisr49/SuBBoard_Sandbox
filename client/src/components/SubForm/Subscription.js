import React, {Component} from "react";
import Switch from "react-switch";
import SideMenu from '../SideMenu/SideMenu';
import Popup from "reactjs-popup";

import SubAPI from "../../utils/SubAPI";
import "./Subscription.css"

export class Subscription extends Component {

    static defaultProps = {
        price: "0"
    }

    constructor() {
        super();
        this.state = {
            data: [],
            startDate: '2020-04-04',
            endDate: '2020-04-04',
            frequency: 'monthly',
            price: '',
            promotion: false,
            
            startDateError: '',
            displayStartDateError: "none",
            endDateError: '',
            displayEndDateError: "none",
            priceError: '',
            displayPriceError: "none"
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

    handlePromotion = (promotion) => {
        this.setState({ promotion });
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

    formattedDate = (date) => {
        const d = new Date(date);
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${day}/${month}/${year}`;
    }

    deletePeriod = async (idSub, idPeriod) => {
        try {
            const { data } = await SubAPI.deletePeriod(
                idSub,
                idPeriod
            );
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    deleteSub = async () => {
        try {
            const { data } = await SubAPI.deleteSub(
                localStorage.getItem("email"),
                localStorage.getItem("name")
            );
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };

    addPeriod = async () => {
        try {
            const { data } = await SubAPI.addPeriod(
                localStorage.getItem("idSub"),
                this.state.startDate,
                this.state.endDate,
                this.state.price,
                this.state.frequency,
                this.state.promotion
            );
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    engToFrFrequence = (frequency) => {
        if(frequency == "daily")
            return "Quotidient";
        if(frequency == "weekly")
            return "Hebdomadaire";
        if(frequency == "monthly")
            return "Mensuelle";
        if(frequency == "yearly")
            return "Annuelle";
    }

    render() {
        const name = localStorage.getItem("name");
        const idSub = localStorage.getItem("idSub");
        const link = "http://" + this.state.data.website_link;
        
        const { price } = this.props

        return (
            <div id="subForm">
                <SideMenu id="1" />
                <div className="section">
                    <button onClick={this.deleteSub}>Supprimer l'abbonnement</button>
                    <h1>{name}</h1>
                    {this.state.data.website_link && (<a href={link} target="_blank">Lien du site</a>)}
                    {this.state.data.note && (<p>{this.state.data.note}</p>)}
                    {
                        this.state.data.length ?? this.state.data.periods.map(({id, start, end, frequency, price, type}) => (
                            <div className="period" key={id}>
                                <p>Du : {this.formattedDate(start)}</p>
                                <p>Au : {this.formattedDate(end)}</p>
                                <p>Prix : {price}</p>
                                <p>Fréquence : {this.engToFrFrequence(frequency)}</p>
                                <p>Promotion : {type ? ("oui") : ("non")} </p>
                                <button onClick={() => this.deletePeriod(idSub, id)}>Supprimer</button>
                            </div>
                        ))
                    }
                    <Popup 
                        trigger={<button>Ajouter une période</button>}
                        modal
                        closeOnDocumentClick
                    >
                        <form>
                            <h1>Nouvelle période</h1>
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
                        <button onClick={this.addPeriod}>Valider</button>
                    </Popup>
                </div>
            </div>
        );
    }
}