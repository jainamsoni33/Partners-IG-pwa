import React from "react";
import '../css/login.css';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

export default class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            test: "Before"
        };
    }

    componentWillMount()
    {   
        try {
            if (localStorage.getItem('username').length>0) {
                //console.log(localStorage.getItem('username'))
                this.props.history.push("/registerCampaign");
            }
      }
      catch(e) {
        if (e !== 'No current user') {
            console.log("no user")
        }
      }

    }
    sessionUpdate(responseJson){
        if(responseJson === "ok")
            {
                this.props.userHasAuthenticated(true)
                //alert(this.props.userHasAuthenticated)
                localStorage.setItem('username', JSON.stringify(this.state.email));
                this.props.history.push("/registerCampaign");
            }
            else
            {   
                this.setState({ isLoading: false });
                alert("wrong details")
            }
    }

    handleSubmit = async  event => {
            event.preventDefault();
            this.setState({ isLoading: true });

            fetch('https://staging.impactguru.com/reacttest//login.php',{
            method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                // we will pass our input data to server
                email: this.state.email,
                password: this.state.password
            })

        })
        .then((response) => response.json())
        .then((responseJson)=>{
            //console.log(responseJson)
            this.sessionUpdate(responseJson);
        })
        .catch((error)=>{
                console.error(error);
        });
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    render() {
        return(
            <div className="box-d">
                <div className="login-header wow fadeInUp animated ceb ceb-c wizard-card">
                    <h3 className="form-title text-center">Impactguru Partner Login </h3>
                    <form className="form-header" onSubmit={this.handleSubmit}>
                        <FormGroup className="col-new input-effect" controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                className="effect-17 has-content"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <span className="focus-border" />
                        </FormGroup>
                        <FormGroup className="col-new input-effect" controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                className="effect-17 has-content"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                            <span className="focus-border" />
                        </FormGroup>
                        <LoaderButton
                        className="btn ssp btn-block button_login"
                          block
                          bsSize="large"
                          disabled={!this.validateForm()}
                          type="submit"
                          isLoading={this.state.isLoading}
                          text="Login"
                          loadingText="Logging in…"
                        />
                    </form>
                </div>
            </div>

        );
    }
}