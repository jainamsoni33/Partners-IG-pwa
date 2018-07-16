<div>
                        {this.state.results.map(item=>(
                            <div key={item.id}>
                                <h2>{item.patient_name}</h2>
                                <span style={{color:'grey'}}>amount: ${item.amount}</span>
                                <p>{item.email}</p>
                            </div>
                        ))}
                </div>

<div class="signup-header wow fadeInUp animated ceb ceb-c wizard-card" style="visibility: visible; animation-name: fadeInUp; banner-text1">
                        <h3 class="form-title text-center">Sign-in to India's largest crowdfunding site </h3>                        
                        <span class="t-cont"> Login via</span>
                        <div class="social-buttons">
                            <a href="javascript:void(0);" class="btn-fb" onclick="fb_login_signup();"><i class="fa fa-facebook"></i> Facebook</a>                            
                        </div>
                        <div class="text-center or-blog"> or</div>                        
                        <form class="form-header" id="sign_in_form" action="sign-in" role="form" method="post">
                            <div class="col-new input-effect" style="text-align: center;">
                                <label id="login_error_label" generated="true" class="validation_error" style="display: none;color: #f44336"></label>
                            </div>
                            <div class="col-new input-effect">
                                <input type="text" name="email_w" value="" id="email_w" maxlength="150" class="effect-17 has-content" placeholder="">                                <label>Email address</label>
                                <span class="focus-border"></span>
                            </div>                            
                            <div id="email_w-error" class="error" style="display: none;"></div>
                            <div class="col-new input-effect">
                                <input type="password" name="password_w" value="" id="password_w" maxlength="50" class="effect-17 has-content" placeholder="">                                <label>Password</label>
                                <span class="focus-border"></span>                                
                            </div>                            
                            <div id="password_w-error" class="error" style="display: none;"></div> 
                            <div class="col-new input-effect space-d">
                                <div class="bottom text-center">
                                    <a href="https://www.impactguru.com/users/forgot-password" class="help-block-btn">Forgot Password?</a>                                   
                                </div>
                            </div> 
                            <div class="col-new input-effect space-d">
                                <div class="bottom text-center">                                    
                                    New here ? <a href="https://www.impactguru.com/fundraiser/create"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Join Us</a>
                                </div>
                            </div> 
                            <div class="form-group last" id="on-to">
                                <input class="btn ssp btn-block btn-md button_sign_in" value="Login" type="submit">
                            </div>
                        </form>
                    </div>               







const validateForm =()=> {
        return this.state.goalAmount.length > 0
    }
    const handleGoalAmount =(patient_name)=>{
        return(
        fetch('http://localhost/impact_guru/dashboard/react/acceptCampaign.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    goalAmount : goalAmount,
                    patient_name : patient_name
                })
            })
                .then((response) => response.json() )
                .then((responseJson)=>{
                    if(responseJson==='ok')
                    {
                        this.props.history.push("/NewCampaigns")
                    } 
                })
                .catch((error)=>{
                    console.error(error);
                });
        )
    }


    <form className="form-header" onSubmit={this.handleGoalAmount(props.item.patient_name)}>
                    <FormGroup className="col-new input-effect" controlId="goalAmount" bsSize="large">
                    <ControlLabel>Enter Goal Amount</ControlLabel>
                    <FormControl
                                className="effect-17 has-content"
                                autoFocus
                                type="amount"
                                value={this.state.goalAmount}
                                onChange={this.handleChange}
                                placeholder="Currency in Rs"
                    />
                    </FormGroup>
                        <Button
                            className="btn ssp btn-block button_login"
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Accept Campaign
                        </Button>
                </form>