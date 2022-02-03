import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Container } from 'react-bootstrap'

import { HomeScreen } from './screens/HomeScreen';
import { TodayMenuScreen } from './screens/TodayMenuScreen';
import { OrderPlateScreen } from './screens/OrderPlateScreen'
import { CreatePlateScreen } from './screens/CreatePlateScreen'
import { CreateMenuScreen } from './screens/CreateMenuScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RedirectScreen } from './screens/RedirectScreen'

function App() {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/home/' component={HomeScreen} />
            <Route path='/today_menu/' component={TodayMenuScreen} />
            <Route path='/order_plate/' component={OrderPlateScreen} />
            <Route path='/create_menu/' component={CreateMenuScreen} />           
            <Route path='/create_plate/' component={CreatePlateScreen} />
            <Route path='/' component={LoginScreen} />
            <Route path='/redirect/' component={RedirectScreen} />
            <Redirect path='*' to={{ pathname: '/redirect/', state: { from: window.location.href } }} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
