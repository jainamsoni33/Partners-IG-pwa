import React from 'react';
import MyNavbar from "./MyNavbar";
import {Grid,Row,Col,Button} from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../css/registerCampaign.css';
import '../css/NewCampaigns.css';

  const Campaign = (props) =>{

    return (
        <Grid>
            <Row className="list-group-item campaignInfo-list-group">
                <Col xs={12} md={12} sm={12}>
                    <h2 className="campaignName">{props.item.patient_name}</h2>
                </Col>
                <Col xs={12} md={6} sm={6}>
                    <p className="list-group-item-text">By {props.item.name}</p>
                </Col>
                <Col xs={12} md={6} sm={6}>
                    <h3 className="campaignNumber">Partner: {props.item.partner_email}</h3>
                </Col>
                <Row>
                    <form className="form-header">
                        <Col xs={12} md={8} sm={8}>
                        <FormGroup className="col-new input-effect" controlId="goalAmount" bsSize="large">
                        <ControlLabel>Enter Goal Amount</ControlLabel>
                        <FormControl
                                    className="effect-17 has-content"
                                    autoFocus
                                    type="amount"
                                    onChange={event => props.handleGoalAmount(event.target.value)}
                                    placeholder="Currency in Rs"
                        />
                        </FormGroup>
                        </Col>
                        <Col xs={6} md={6} sm={6}>
                            <Button
                                className="btn ssp btn-block button_login"
                                block
                                bsSize="large"
                                name="Accept"
                                onClick={event => props.handleCampaignVerdict(props.item.patient_name,event)}
                            >
                                Accept
                            </Button>
                        </Col>
                        <Col xs={6} md={6} sm={6}>
                            <Button
                                className="btn ssp btn-block button_login"
                                block
                                bsSize="large"
                                name="Reject"
                                onClick={event => props.handleCampaignVerdict(props.item.patient_name,event)}
                            >
                                Reject
                            </Button>
                        </Col>
                    </form>
                </Row>
                
            </Row>
        </Grid>
    )
}

const RenderCampaign = ({ handleCampaignVerdict, results ,handleGoalAmount }) => {        
    return (
        results.map( item => <Campaign item={item} key={item.id} handleCampaignVerdict={handleCampaignVerdict}  handleGoalAmount={handleGoalAmount} /> )
    )
}

export default class NewCampaigns extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            goalAmount :'0'
        }

        this.handleGoalAmount = this.handleGoalAmount.bind(this);
    }
    handleGoalAmount(goalAmount){
        this.setState({goalAmount})
    }

    handleCampaignVerdict =(patient_name,event)=>{
        event.preventDefault();
        fetch('https://staging.impactguru.com/reacttest/handleCampaign.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    goalAmount : this.state.goalAmount,
                    patient_name : patient_name,
                    action:event.target.name
                })
            })
                .then((response) => response.json() )
                .then((responseJson)=>{
                    if(responseJson==='ok')
                    {
                        alert("Campaign Updated")
                        window.location.reload()
                    } 
                })
                .catch((error)=>{
                    console.error(error);
                });
    } 
    
    componentDidMount(){
          this.loadCampaign();
    }
    loadCampaign = () =>{
        fetch('https://staging.impactguru.com/reacttest/adminView.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.json() )
                .then((responseJson)=>{
                    if(responseJson!=='no')
                    {
                        this.setState({
                            results : responseJson
                        }); 
                    }
                })
                .catch((error)=>{
                    console.error(error);
                }); 
    }

    render(){
        if(!this.props.userHasAuthenticated)
        {
            this.props.history.push("/");
        }
        return (
           <div className="Profile">
               <MyNavbar  userHasAuthenticated={this.props.userHasAuthenticated} isAuthenticated={this.props.isAuthenticated} />
               <section className="campaignInfo">
                    <Grid>
                        <Row>
                        <h2 className="dashboardTitle">New Campaigns</h2>
                        <div className="campaignInfo-list-group">
                            <RenderCampaign handleCampaignVerdict={this.handleCampaignVerdict} results={this.state.results} handleGoalAmount={this.handleGoalAmount}/>
                        </div>
                        </Row>
                    </Grid>
                </section>
               
           </div>
       );
    }
}

