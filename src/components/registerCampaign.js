import React  from 'react';
import '../css/registerCampaign.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import MyNavbar from "./MyNavbar";

export default class registerCampaign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            campaignerName:"",
            campaignerEmail:"",
            campaignerMobile:"",
            campaignerCity:"",
            campaignPatient:""
        };
    }
    validateForm() {
        return this.state.campaignerEmail.length > 0 && this.state.campaignerMobile.length > 0;
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit =async event => {
        event.preventDefault();
        fetch('https://staging.impactguru.com/reacttest/registerCampaign.php',{
            method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                // we will pass our input data to server
                name:this.state.campaignerName,
                email: this.state.campaignerEmail,
                mobile:this.state.campaignerMobile,
                city:this.state.campaignerCity,
                patient:this.state.campaignPatient,
                partneremail: localStorage.getItem('username')
            })

        })
            .then((response) => response.json())
            .then((responseJson)=>{
                if(responseJson === "ok"){
                    // redirect to profile page
                    alert("Successfully Registered");
                    //this.props.history.push("/profile");
                    this.setState({
                        campaignerName:"",
                        campaignerEmail:"",
                        campaignerMobile:"",
                        campaignerCity:"",
                        campaignPatient:""
                    })
                }else{
                    alert("Wrong Login Details");
                }
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    render() {
        if(!this.props.isAuthenticated)
        {
            this.props.history.push("/");
        }
        return(
            <div className="registerCampaign">
            <MyNavbar userHasAuthenticated={this.props.userHasAuthenticated} isAuthenticated={this.props.isAuthenticated} />
                <form className="form-header" onSubmit={this.handleSubmit}>
                    <FormGroup className="col-new input-effect" controlId="campaignerEmail" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            className="effect-17 has-content"
                            type="email"
                            value={this.state.campaignerEmail}
                            onChange={this.handleChange}
                            placeholder="Campaigner's Email"
                        />
                    </FormGroup>
                    <FormGroup className="col-new input-effect" controlId="campaignerName" bsSize="large">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            className="effect-17 has-content"
                            value={this.state.campaignerName}
                            onChange={this.handleChange}
                            placeholder="Campaigner's Name"
                        />
                    </FormGroup>
                    <FormGroup className="col-new input-effect" controlId="campaignerMobile" bsSize="large">
                        <ControlLabel>Mobile</ControlLabel>
                        <FormControl    
                            className="effect-17 has-content"
                            value={this.state.campaignerMobile}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="col-new input-effect" controlId="campaignerCity" bsSize="large">
                        <ControlLabel>City</ControlLabel>
                        <FormControl
                            className="effect-17 has-content"
                            value={this.state.campaignerCity}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="col-new input-effect" controlId="campaignPatient" bsSize="large">
                        <ControlLabel>Patient Name</ControlLabel>
                        <FormControl
                            className="effect-17 has-content"
                            value={this.state.campaignPatient}
                            onChange={this.handleChange}
                            placeholder="Patient's Name"
                        />
                    </FormGroup>
                    <Button
                        className="btn ssp btn-block button_login"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Register Campaign
                    </Button>
                </form>
            </div>

        );
    }
}