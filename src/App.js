import React from 'react';
import Routes from "./components/Routes";

export default class App extends React.Component{
constructor(props) {
  super(props);

  this.state = {
    isAuthenticated: false,
    isAuthenticating: true,
  };
}
async componentDidMount() {
  try {
    if (localStorage.getItem('username')) {
      this.userHasAuthenticated(true);
    }
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }

  this.setState({ isAuthenticating: false });
  //this.props.history.push("/profile")
  }

userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
}

handleLogin = event => {
    this.props.history.push("/");
}

render(){
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
 return(
     !this.state.isAuthenticating &&
     <Routes childProps={childProps} /> 
    );
}
}