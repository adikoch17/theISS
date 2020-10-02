import React from 'react';
import './App.css';
import Space from './components/space/space.js'



class App extends React.Component {
  Location = () =>{
    
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response=>response.json())
    .then(data=>{
        // this.setState({latitude:data.latitude,longitude:data.longitude});
        let lat = data.latitude;
        let longi = data.longitude;
        fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=T8546H6U13P4&format=json&by=position&lat=${lat}&lng=${longi}`)
        .then(response=>response.json())
        .then(country=>{
          if(country.status==="FAILED"){
            if(this.state.loc!=="over international waters"){
              this.setState({loc:"over international waters"});
            }
          }
          else{
            this.setState({loc:country.countryName})
          }
          
        });
    });
  }

  
  constructor(){
    super();
    this.state={
      loc : ""
    }
    
  }

  render(){
    window.setInterval(this.Location(),10000);
    console.log(this.state.loc);
    this.Location();
    return(
      <div id="App">
        <Space/>
        <h2>{this.state.loc}</h2>
      </div>
    );

  }


}

// function App() {
//   return (
//     <div id="App">
      
//     </div>
//   );
// }

export default App;
