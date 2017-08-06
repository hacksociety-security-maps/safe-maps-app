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

const locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]

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
              <li>
                <input id="search" type="search" required />
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>                
              </li>
              <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
              <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
            </ul>
          </div>
        </nav> 
    )
  }
}

class Body extends Component{
  componentDidMount(){
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    console.log(locations)   
  }
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
