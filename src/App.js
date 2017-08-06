import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Map, InfoWindow, HeatMap, Marker, Polygon, Polyline, GoogleApiWrapper} from 'google-maps-react'
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
      screen: null,
      steps: []
    }
    this.calculateRoute = this.calculateRoute.bind(this)
  }
  componentDidMount(){

    let database = firebase.database().ref('users')
    database.on('value', this.gotData, this.errData)

    setTimeout(() => {
      this.setState({
        screen: true
      })
    }, 3000)
  }
	gotData = (data) => {
			let getData = data.val()
			let testKeys = Object.keys(getData)
			for (var i = 0 ; i < testKeys.length; i++){
				let myTest = testKeys[i]
        let myUsers = getData[myTest]
        this.setState({
          steps: myUsers.legs[0].steps
        })

      }		
      
	}
	errData = (err) => {
		console.log("Error! " + err)
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
      isReady = <Body google={this.props.google}
                      steps={this.state.steps}/>
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

class BtnRight extends Component{
  render(){
    return(

      <div className="fixed-action-btn horizontal">
        <a className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </a>
        <ul>
          <li><a className="btn-floating red"><i className="material-icons">search</i></a></li>
        </ul>
      </div>

    )
  }
}

const polygon = [
      { lat: 37.789411, lng: -122.422116 },
      { lat: 37.785757, lng: -122.421333 },
      { lat: 37.789352, lng: -122.415346 }
    ]

    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

class Body extends Component{
  state = {
    myStateJson: []
  }


  componentDidMount(){
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let myJson = []

    this.props.steps.forEach((mystep) => {
      myJson.push(mystep.end_location)
      this.setState({
        myStateJson : myJson
      })
    })
    console.log(this.state.myStateJson)
  }
  render(){

    return(
      <div>
        <NavBar />
        <BtnRight />
        <Map
          google={this.props.google} 
          zoom={14}
          initialCenter={{
          lat: 4.6411269,
          lng: -74.0839427
          }}
        >
      <Polygon
          paths={[this.state.myStateJson]}
          strokeColor="#ff0000"
          strokeWeight={2}
          fillColor="#fff"
          fillOpacity={0} />
    
        <Marker 
          onClick={()=> console.log('hi')}
          name={'Current location'} />                
        </Map>
      </div>
    )
  }
}

          // <HeatMap 
          //   gradient={gradient}
          //   radius={20}
          //   opacity={0.3}          
          //   positions={[polygon]}
          // />


export default GoogleApiWrapper({
  apikey: ('AIzaSyBGY34YUQau2pq2Wfr-nA36eOIXXRezNXM')
})(App)
