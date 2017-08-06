import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import * as firebase from "firebase"

var config = {
  apiKey: "AIzaSyBRGfz9VMLbiN_AwQ0cppg-qAN2cLkFrJA",
  authDomain: "hacksociety-176003.firebaseapp.com",
  databaseURL: "https://hacksociety-176003.firebaseio.com",
  projectId: "hacksociety-176003",
  storageBucket: "hacksociety-176003.appspot.com",
  messagingSenderId: "895934622640"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      screen: null
    }
    this.calculateRoute = this.calculateRoute.bind(this)
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        screen: true
      })
    }, 3000)    
  }
  calculateRoute(){
    let request = {
      origin: 0
    }
  }
  render() {
    let isReady
    if(!this.state.screen){
      isReady = <Preloader />
    }else{
      isReady = <Body google={this.props.google}/>
    }
      return (
        <div className="App">
          {isReady}
        </div>
      )    
  }
}

class Preloader extends Component{
  render(){
    return(
      <div className="center valign-wrapper" style={{ height: '100vh'}} >
      <div className="preloader-wrapper big active" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
class NavBar extends Component{
  render(){
    return(
        <nav>
          <div className="nav-wrapper blue darken-3">
            <a href="#!" className="left brand-logo"><img id="logo-app" src={logo} alt="logo App" /></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html"><i className="material-icons">search</i></a></li>
              <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
              <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
            </ul>
          </div>
        </nav> 
    )
  }
}

class Body extends Component{
  render(){
    return(
      <div>
        <NavBar />
        <Map 
          google={this.props.google} 
          zoom={14}
          initialCenter={{
          lat: 4.6411269,
          lng: -74.0839427
          }}
        >
        <Marker 
          onClick={()=> console.log('hi')}
          name={'Current location'} />                
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apikey: ('AIzaSyBGY34YUQau2pq2Wfr-nA36eOIXXRezNXM')
})(App)
