import React, {Component} from "react";
import { Button } from "react-bootstrap";

import SubAPI from "../../utils/SubAPI";
import API from "../../utils/API";
import Thumbnail from "./Thumbnail"
import SideMenu from '../SideMenu/SideMenu';

import './Dashboard.css'

export class Dashboard extends Component {

    state = {
        thumbnails: this.generateThumbnails(),
        data : null
    }

    componentWillMount() {
        this.state.data = this.getData();
    }
    
    getData = async () => {
        try {
            const { data } = await SubAPI.getSub(
                localStorage.getItem("email")
            );
        } catch (error) {
            console.error(error);
        }
    };

    componentDidMount() {
        Array.from(document.getElementsByClassName("wrapper")).forEach(element => {
            if(element.clientHeight > 25) {
                element.style.width = "250px";
                element.childNodes.item(0).style.right = "0";
            }
        });
    }

    generateThumbnails() {
        const result = []
        result.push(
            {
                title: "Netflix", 
                img: "/images/photo.png",
                tags: [
                    {
                        name: "FAI",
                        color: "#FFA500"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    }
                ], 
                start: "01/01/2020",
                end: "03/03/2020", 
                price: "10.99", 
                promotion: "5.99"
            }
        )
        result.push(
            {
                title: "Netflix", 
                img: "/images/photo.png",
                tags: [
                    {
                        name: "FAI",
                        color: "#FFA500"
                    },
                    {
                        name: "Box Internet",
                        color: "#FF0000"
                    }
                ], 
                start: "01/01/2020",
                end: "03/03/2020", 
                price: "10.99", 
                promotion: "5.99"
            }
        )
        return result
    }

    redirectNew = () => {
        window.location = "/subscription";
    }

    render() {
        const { thumbnails } = this.state

        return (
            <div id="dashBoard">
                <SideMenu id="1" />
                <div className="section">
                    <div className="title">
                        <h1>Mes abonnements</h1>
                    </div>
                    {
                        thumbnails.map(({title, img, tags, start, end, price, promotion}, index) => (
                            <Thumbnail
                                title={title}
                                img={img}
                                tags={tags}
                                start={start}
                                end={end}
                                price={price}
                                promotion={promotion}
                                key={index}
                            />
                        ))
                    }
                    <div className="thumbnail new" onClick={this.redirectNew}>+</div>
                </div>
            </div>
        );
    }
}