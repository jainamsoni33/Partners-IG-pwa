import React  from 'react';
import MyNavbar from "./MyNavbar";
import {Grid,Row,Col,Badge,ProgressBar} from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import "../css/campaignDashboard.css";

export default class campaignDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            hasMore: true,
            cursor:5,
            total:0,
            search:''
        };
    }
    componentDidMount(){
        this.loadMore();
    }
    loadMore = () =>{
        fetch('https://staging.impactguru.com/reacttest/displayCampaign.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    partneremail:localStorage.getItem('username'),
                    cursor:this.state.cursor
                })
            })
                .then((response) => response.json() )
                .then((responseJson)=>{
                    //console.log(responseJson)
                    if(this.state.cursor===5)
                    {
                         this.setState({
                            results : responseJson.data,
                            total : responseJson.count,
                            cursor : this.state.cursor+5
                        });   
                    }
                    else{
                        if(this.state.cursor>=this.state.total)
                            {
                                this.setState({
                                results :  responseJson.data,
                                hasMore : false
                                });
                                //console.log(this.state.hasMore)
                            }
                        else
                            {
                                this.setState({
                                results :  responseJson.data,
                                cursor : this.state.cursor+5
                                });
                            }

                        }
                })
                .catch((error)=>{
                    console.error(error);
                });
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        if(!this.props.isAuthenticated)
        {
            this.props.history.push("/");
        }
        let filteredCampaigns =this.state.results.filter(
            (results) =>{
                return results.patient_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;  
            }

        );
        return (
            <div>
                <MyNavbar userHasAuthenticated={this.props.userHasAuthenticated} isAuthenticated={this.props.isAuthenticated} />
                <Grid>
                    <Row>
                        <Col xs={12} md={6} sm={6}>
                            <form className="form-header">
                                <FormGroup className="col-new input-effect" controlId="search" bsSize="large">
                                <FormControl
                                    className="effect-17 has-content"
                                    type="text"
                                    value={this.state.search}
                                    onChange={this.handleChange}
                                    placeholder="Search campaigns.."
                                />
                                </FormGroup>
                            </form>
                        </Col>
                    </Row>
                </Grid>
                <InfiniteScroll
                  dataLength={this.state.results.length}
                  next={this.loadMore}
                  hasMore={this.state.hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{textAlign: 'center'}}>
                      <b>Yay! You have seen it all</b>
                    </p>
                    }
                >
                <section className="campaignInfo">
                    <Grid>
                        <Row>
                        <h2 className="dashboardTitle">Campaigns Dashboard</h2>
                        <p>This leaderboard will only reflect funds raised on Impact Guru during the Accelerator campaign between 11 June 2018, 6:30 pm IST to 30 June 2018, 9:30 am IST*</p>
                        <div className="campaignInfo-list-group">
                            {filteredCampaigns.map(item=>(
                            <Row className="list-group-item campaignInfo-list-group" key={item.id}>
                                <Col xs={6} md={2} sm={2}>
                                    <h3 className="campaignNumber">{item.id}</h3>
                                    <p>campaign image </p>
                                </Col>
                                <Col xs={6} md={2} sm={2}>
                                    <h2 className="campaignName">{item.patient_name}</h2>
                                    <p className="list-group-item-text">By {item.name}</p>
                                </Col>
                                <Col xs={12} md={6} sm={12}>
                                    <Badge>
                                        ₹ {item.amount}
                                    </Badge>
                                </Col>
                                <Col xs={12} md={6} sm={12} >
                                    <span> Raised x amount from x donors 
                                        <span className="pull-right">
                                            Goal amount: ₹ {item.goalAmount}
                                        </span>
                                    </span>
                                    <ProgressBar striped bsStyle="success" className="campaignProgressBar" now={item.amount/item.goalAmount*100} />
                                </Col>
                            </Row>
                            ))}
                        </div>
                        </Row>
                    </Grid>
                </section>
                </InfiniteScroll>
            </div>
        );
    }
}