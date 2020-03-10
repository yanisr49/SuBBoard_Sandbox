import React, {Component} from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class SubForm extends Component {

    render() {
        return (
            <div className="section">
                <form>
                    <label>
                        Nom:
                        <input type="text" name="" />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}