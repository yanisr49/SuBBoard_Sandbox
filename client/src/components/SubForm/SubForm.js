import React, {Component} from "react";
import Switch from "react-switch";
import SideMenu from '../SideMenu/SideMenu';

import SubAPI from "../../utils/SubAPI";
import "./SubForm.css"

export class SubForm extends Component {

    static defaultProps = {
        name: "Nom",
        startDate: new Date(),
        endDate: new Date(),
        price: "0",
        promotion: false, 
        promoStartDate: new Date(),
        promoEndDate: new Date(),
        promoPrice: "0"
    }

    constructor() {
        super();
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            price: '',
            promotion: false, 
            promoStartDate: '',
            promoEndDate: '',
            promoPrice: ''
        };
    }

    handleChange = (promotion) => {
        this.setState({ promotion });
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleStartDate = (event) => {
        this.setState({ startDate: event.target.value })
    }

    handleEndDate = (event) => {
        this.setState({ endDate: event.target.value })
    }

    handlePrice = (event) => {
        this.setState({ price: event.target.value })
    }

    handlePromoStartDate = (event) => {
        this.setState({ promoStartDate: event.target.value })
    }

    handlePromoEndDate = (event) => {
        this.setState({ promoEndDate: event.target.value })
    }

    handlePromoPrice = (event) => {
        this.setState({ promoPrice: event.target.value })
    }

    send = async () => {
        try {
            const { data } = await SubAPI.addSub(
                localStorage.getItem("email"), 
                this.state.name, 
                "", 
                "", 
                this.state.startDate, 
                this.state.endDate, 
                this.state.price, 
                this.state.promotion,
                this.state.startPromotion,
                this.state.endPromotion,
                this.state.promoPrice
            );
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        
        const { name, startDate, endDate, price, promoStartDate, promoEndDate, promoPrice } = this.props
        const test = this.state.promotion ? "block" : "none";
        
        return (
            <div id="subForm">
                <SideMenu id="1" />
                <div className="section">
                    <form  onSubmit={this.send}>
                        <input 
                            type="text"
                            placeholder={name}
                            value={this.state.name}
                            onChange={this.handleName}
                            id="subTitle"
                        />
                        <div className="labelDiv">
                            <p>Du : </p>
                            <input
                                type="Date"
                                placeholder={startDate}
                                value={this.state.startDate}
                                onChange={this.handleStartDate}
                            />
                        </div>
                        <div className="labelDiv">
                            <p>Au : </p>
                            <input
                                type="Date"
                                placeholder={endDate}
                                value={this.state.endDate}
                                onChange={this.handleEndDate}
                            />
                        </div>
                        <div className="labelDiv">
                            <p>Prix : </p>
                            <input
                                type="number"
                                placeholder={price}
                                value={this.state.price}
                                onChange={this.handlePrice}
                            />
                        </div>
                        <div className="promoAsk">
                            <p>Période promotionnelle ?</p>
                            <Switch 
                                className="switch" 
                                onChange={this.handleChange} 
                                checked={this.state.promotion} 
                                onColor="#3A5199" 
                            />
                        </div>
                        <div className="promoDropDown" style={{display: test}}>
                            <div className="labelDiv">
                                <p>Du : </p> 
                                <input
                                    type="Date"
                                    placeholder={promoStartDate}
                                    value={this.state.promoStartDate}
                                    onChange={this.handlePromoStartDate}
                                />
                            </div>
                            <div className="labelDiv">
                                <p>Au : </p>
                                <input
                                    type="Date"
                                    placeholder={promoEndDate}
                                    value={this.state.promoEndDate}
                                    onChange={this.handlePromoEndDate}
                                />
                            </div>
                            <div className="labelDiv">
                                <p>Prix : </p>
                                <input
                                    type="Number"
                                    placeholder={promoPrice}
                                    value={this.state.promoPrice}
                                    onChange={this.handlePromoPrice}
                                />
                            </div>
                        </div>
                        <input 
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}