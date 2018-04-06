import React from 'react';
import {Router,Route,Link,Redirect,Switch,HashRouter,BrowserRouter} from 'react-router-dom';
import history from './history'
import App from './App'
import Login from './page/login'
import Home from './page/home'
import Admin from '././page/admin'
import Bike from '././page/useBike'
import Order from './page/order'

export default class ERouter extends React.Component{
    render(){
        return (
            // <HashRouter>
            <Router history={history}>
                <Switch>
                    <Route path='/'>
                        <App>
                            <Switch>
                                <Route exact path='/' component={Login} />
                                <Route path='/home' >
                                    <Home>
                                        <Switch>
                                            <Route exact path='/home' component={Admin} />
                                            <Route path='/home/order' component={Order} />
                                            <Route path='/home/use/bike' component={Bike} />
                                            {/* 没有该地址的时候跳转到哪里 ，缺点是路径不变*/}
                                            {/* <Route  component={Order} /> */}
                                            {/* 这个是地址输入错误的，没有这个地址的时候， 时候跳转到哪里 */}
                                            <Redirect to='/home'/>
                                        </Switch>
                                    </Home>
                                </Route>
                                <Redirect to='/'/>
                            </Switch>
                        </App>
                    </Route>
                </Switch>
            </Router>  
            // </HashRouter>  
        )
    }
}

// export const HomeList = ({ match })=>{
//     return (
//         <BrowserRouter>
//             <Switch>
//                 {/* <Route exact path='/home' component={Home} /> */}
//                 <Route path={`${match}/order `} render={(props)=>{
//                         <div>112233</div>
//                 }} />
//                 <Route path={`${match}/use/bike`} component={Bike} />
//             </Switch>
            
//         </BrowserRouter>
//     )
    
// }

