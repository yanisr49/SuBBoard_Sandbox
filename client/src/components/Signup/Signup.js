import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import './Signup.css'

export class Signup extends React.Component {

    state = {
        email: "",
        password: "",
        cpassword: "",
        error: ""
    };

    send = async () => {
        const { email, password, cpassword } = this.state;
        if (!email || email.length === 0) {
            this.setState({error:"Le champ email est vide"});
            return;
        }
        if (!password || password.length === 0){
            this.setState({error:"Les champs password et confirmation de password doivent être rempli"});
            return;
        } 
        if(password !== cpassword){
            this.setState({error:"Les champs password et confirmation de password doivent être identique"});
            return;
        }
        
        try {
            const { data } = await API.signup({ email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email);
            window.location = "/dashboard";
        } catch (error) {
            this.setState({error:"Erreur lors de la création du compte"});
            console.error(error);
        }
    };

    sendToLogin = async () => {
        window.location = "/";
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const { email, password, cpassword } = this.state;
        return (
            <div className="Login">
                <div className="TopBlue"></div>
                <div className="TopBlack">
                    <h1>SuBBoard - Inscription</h1>
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
                <FormGroup controlId="cpassword" bsSize="large">
                    <ControlLabel>Confirmation du mot de passe</ControlLabel>
                    <FormControl
                        value={cpassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button onClick={this.send} block bsSize="large" type="submit">
                    Inscription
                </Button>
                <Button className="ButtonLogin" onClick={this.sendToLogin}>
                    Connexion
                </Button>
                <p className="ErrorMessage">{this.state.error}</p>
                <div className="BottomBlack"></div>
                <div className="BottomBlue"></div>
            </div>
        );
    }
}