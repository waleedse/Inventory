import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './app.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux/reducer';
//  Importing Components
import AdminLogin from './Admin/Auth/Login';
import AdminIndex from './Admin/Index';
import UserLogin from './Front/Auth/Login';
import FrontIndex from './Front/Index';
const store = createStore(reducer);
function App() {
    return (
        <div>
       <BrowserRouter>
            <Route path="/pos" component={FrontIndex}></Route>
            <Route path="/admin_login" component={AdminLogin}></Route>
            <Route path="/adminpanel" component={AdminIndex}></Route>
            <Route exact path="/" component={UserLogin}></Route>

       </BrowserRouter>
       </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));
}
