import React from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import {browserHistory} from "react-router";
import Login from './login';
import '../App.css';
import NotFound from './NotFound';
import campaignDashboard from './campaignDashboard';
import registerCampaign from './registerCampaign';
import AppliedRoute from "./AppliedRoute";
import MyNavbar from "./MyNavbar";
import NewCampaigns from "./NewCampaigns";

export default ({ childProps }) =>(
    <Router history={browserHistory}>
    	<Switch>
	        <AppliedRoute path="/" exact component={Login} props={childProps}/>
	        <AppliedRoute path="/MyNavbar" exact component={MyNavbar} props={childProps} />
	        <AppliedRoute path="/campaignDashboard" exact component={campaignDashboard} props={childProps} />
	        <AppliedRoute path="/registerCampaign" exact component={registerCampaign} props={childProps} />
	        <AppliedRoute path="/NewCampaigns" exact component={NewCampaigns} props={childProps} />
	        <Route component={NotFound} />
	    </Switch>
    </Router>
    );