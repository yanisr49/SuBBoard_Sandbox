import React, {Component} from "react";
import { Button, Checkbox } from "react-bootstrap";
import { SliderPicker } from 'react-color';

import API from "../../utils/API";
import "./SubForm.css"

export class SubForm extends Component {

    state = {
        background: '#fff',
    };

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    render() {
        return (
            <div className="section">
                <form>
                    <input type="text" name="" value="Abonnement" />
                    <input type="Date" name="" value="01/01/2020" />
                    <input type="Date" name="" value="01/01/2020" />
                    <input type="text" name="" value="Fréquence" />
                    <label>
                        Période promotionnelle ?
                        <input type="radio" value="Oui" checked={true} />
                        <input type="radio" value="Non" checked={true} />
                    </label>
                    <input type="Date" name="" value="01/01/2020" />
                    <input type="Date" name="" value="01/01/2020" />
                    <div className="test">
                        <SliderPicker
                            color={ this.state.background }
                            onChange={ this.handleChangeComplete }
                        />
                    </div>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}