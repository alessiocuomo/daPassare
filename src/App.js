import React, {Component} from 'react';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import {firebaseApp} from './Firebase';
import Dashboard from './components/Dashboard'

class App extends Component {

    constructor() {
        super();
        this.state = {
            authed: false,
            userid: null,
            email: null
        }
    }


    componentDidMount() {
        this.removeFirebaseEvent = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({authed: true, userid: user.uid, email: user.email})


            } else {
                this.setState({
                    authed: false,
                })
            }
        })

    }


    logout = ()=> {
        firebaseApp.auth().signOut();
    }

    componentWillUnmount() {
        this.removeFirebaseEvent()
    }

    render() {
        return (
            <HashRouter>
                <center className="App">
                    <div className="App-header">
                        <h1>U-SHOP</h1>
                    </div>

                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container">

                            <ul className="nav navbar-nav pull-right">

                                
                                <li>
                                    {this.state.authed
                                        ? <button
                                        style={{border: 'none', background: 'transparent'}}
                                        className="navbar-brand" onClick={this.logout}>Logout</button>
                                        : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Registrati</Link>
                      </span>}
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <hr />
                    {!this.state.authed ? <div className = "titoli"><h3>Effettua il login se sei un utente.</h3>
                        
                        <h3>Registrati se non sei un utente.</h3>
                    </div> : ''}
                    <div>
                        <Route path='/' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <div></div>}/>
                        <Route path='/login' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <Login/>}/>
                        <Route path='/dashboard'
                               render={()=>this.state.authed ?
                                   <Dashboard userid={this.state.userid} email={this.state.email}/> :
                                   <Redirect to='/login'/>}/>
                        <Route path='/register' component={Register}/>
                    </div>

                </center>
            </HashRouter>
        );
    }
}

export default App;
