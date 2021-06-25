import React, { Component } from 'react'
import Video from './Video'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Joinbutton from './components/Joinbutton'
import Chat from './components/pages/Chat'
import SchedulerMain from './components/pages/SchedulerMain'



class App extends Component {
	render() {
		return (
			<div>
		
			<Header/>
			
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />		
						<Route path="/chat" component={Chat}/>
						<Route path="/call" component={Home}/>
						<Route path="/schedule" component={SchedulerMain}/>
						<Route path="/:url" component={Video} />
					</Switch>
				</Router>
				
		    </div>
		)
	}
}

export default App;