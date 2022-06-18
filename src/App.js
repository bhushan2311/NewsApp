import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
export default class App extends Component {
  pageSize=6;
  render() {
    return (
      <>
      <div>
        <Router>
          <Navbar/>
            <Routes>
              <Route exact path="/" element={<News key="Home" pageSize={this.pageSize} country="in" category="general"/>}/>
              <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="in" category="business"/>}/>
              <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="in" category="sports"/>}/>
              <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}/>
              <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country="in" category="general"/>}/>
              <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="in" category="technology"/>}/>
              <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="in" category="health"/>}/>
            </Routes>
        </Router>
      </div>
      </>
    )
  }
}

// export default App;
