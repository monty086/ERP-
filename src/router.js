
import React from 'react'
// import {Router , hashHistory, Route, IndexRedirect } from 'react-router';
import {Router, hashHistory, Route, IndexRedirect}  from 'react-router';

import App from './App'
import Login from './pages/login'
import Order from './pages/order'
import Home from './pages/home'

export default class ERouter extends React.Component{
    render (){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    {<IndexRedirect to='/login'/>}
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={Home}>
                        <Route path='/order' component={Order}/>
                    </Route>
                </Route>
            </Router>  
        )
    }
}