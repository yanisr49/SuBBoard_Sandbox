import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import './Login.css'

export class Login extends React.Component {

    state = {
        email: "",
        password: "",
        error: ""
    };

    send = async () => {
        const { email, password } = this.state;
        if (!email || email.length === 0) {
            this.setState({error:"Le champ email est vide"});
            return;
        }
        if (!password || password.length === 0) {
            this.setState({error:"Le champ password est vide"});
            return;
        }

        try {
            const { data } = await API.login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email);
            window.location = "/dashboard";
        } catch (error) {
            this.setState({error:"Mauvais identifiants"});
            console.error(error);
        }
    };

    sendToSignUp = async () => {;
        window.location = "/signup";
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    
    render() {
        const { email, password } = this.state;
        return (
            <div className="Login">
                <div className="TopBlue"></div>
                <div className="TopBlack">
                    <h1>SuBBoard - Connexion</h1>
                </div>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Mot de passe</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button onClick={this.send} block bsSize="large" type="submit">
                    Connexion
                </Button>
                <Button className="ButtonSignUp" onClick={this.sendToSignUp}>
                    Inscription
                </Button>
                <p className="ErrorMessage">{this.state.error}</p>
                <div className="BottomBlack"></div>
                <div className="BottomBlue"></div>
            </div>
        );
    }
}