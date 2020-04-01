import React, {Component} from "react";
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import SideMenu from '../SideMenu/SideMenu';

import API from "../../utils/API";
import "./SubForm.css"

export class SubForm extends Component {

    constructor() {
        super();
        this.state = { 
            checked: false, 
            background: '#fff',
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    render() {
        const test = this.state.checked ? "block" : "none";
        const date = this.state.startDate;
        
        return (
            <div id="subForm">
                <SideMenu id="1" />
                <div className="section">
                    <form>
                        <input type="text" name="" value="Netflix" id="subTitle" />
                        <div className="labelDiv">
                            <p>Du : </p>
                            <DatePicker 
                                selected={date} 
                            />
                        </div>
                        <div className="labelDiv">
                            <p>Au : </p>
                            <input type="Date" name="" />
                        </div>
                        <div className="promoAsk">
                            <p>Période promotionnelle ?</p>
                            <Switch 
                                className="switch" 
                                onChange={this.handleChange} 
                                checked={this.state.checked} 
                                onColor="#3A5199" 
                            />
                        </div>
                        <div className="promoDropDown" style={{display: test}}>
                            <div className="labelDiv">
                                <p>Du : </p> 
                                <input type="Date" name="" />
                            </div>
                            <div className="labelDiv">
                                <p>Au : </p>
                                <input type="Date" name="" />
                            </div>
                        </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}