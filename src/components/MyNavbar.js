import React, { Fragment  } from 'react';
import {Navbar,Nav,NavItem,Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/MyNavbar.css";

export default class MyNavbar extends React.Component{
  constructor(props) {
        super(props);
        this.state={
          notificationCount :0 
        };
  }

  handleLogout = event => {
        localStorage.removeItem('username');
        this.props.userHasAuthenticated(false);
        //this.props.history.push("/");
    }
  componentDidMount(){
    if(localStorage.getItem('username').includes("admin@impactguru.com"))
    {
      this.loadNotifications();
    }
  }

  loadNotifications =()=>{
    fetch('https://staging.impactguru.com/reacttest/checkNotification.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.json() )
                .then((responseJson)=>{
                    if(responseJson>0)
                    {
                      this.setState({
                          notificationCount : responseJson
                      });
                    }
                    //console.log(this.state.notificationCount)
                })
                .catch((error)=>{
                    console.error(error);
                }); 
  }

render(){
 return (
    <Navbar>
       <Navbar.Header>
           <Navbar.Brand>
           <a href="/registerCampaign">Partner-Impactguru</a>
           </Navbar.Brand>
           <Navbar.Toggle className="toggleMenu"/>
       </Navbar.Header>
       <Navbar.Collapse>
           <Nav>
              {this.props.isAuthenticated ?
                <Fragment>
                 <NavItem componentClass={Link} href="/campaignDashboard" to="/campaignDashboard">Campaign Dashboard</NavItem>
                 <NavItem componentClass={Link} href="/registerCampaign" to="/registerCampaign">Register Campaign</NavItem>
                   {localStorage.getItem('username').includes("admin@impactguru.com")? 
                    <NavItem componentClass={Link} href="/NewCampaigns" to="/NewCampaigns">New Campaigns 
                      {this.state.notificationCount > 0 ?
                        <Badge>
                          {this.state.notificationCount}
                        </Badge>
                      :
                      <Fragment></Fragment>
                      }
                    </NavItem>
                    :<Fragment></Fragment> }
                 <NavItem onClick ={ ()=>{this.handleLogout()} }>Logout</NavItem>
               </Fragment>
               :<NavItem componentClass={Link} href="/" to="/">Login</NavItem> }
           </Nav>
       </Navbar.Collapse>
    </Navbar>
  );
}
}
