    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './components/Header'
    import TortoiseList from './components/TortoiseList'
    import NewTortoise from './components/NewTortoise'

    function App() {
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>  
                <Route exact path='/show' component={TortoiseList} />
                <Route exact path='/create' component={NewTortoise} />
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
  
      export default App;
  //ReactDOM.render(<App />, document.getElementById('app'))