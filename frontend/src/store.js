import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    todayMenuReducer,
    platesListReducer,
    createPlateReducer,
    createMenuReducer,
    createEmployeeSelectionReducer
   } from './reducers/menuReducers'
import { 
  employeeListReducer,
  employeeLoginReducer
} from './reducers/employeeReducers'

const reducer = combineReducers({
  todayMenu: todayMenuReducer,
  platesList: platesListReducer,
  createPlate: createPlateReducer,
  menuCreate: createMenuReducer,
  createEmployeeSelection: createEmployeeSelectionReducer,

  employeeList: employeeListReducer,
  employeeLogin: employeeLoginReducer
})

const employeeLoginFromStorage = localStorage.getItem('employeeLogin') ?
    JSON.parse(localStorage.getItem('employeeLogin')) : null

const initialState = {
    employeeLogin: {
      employee: employeeLoginFromStorage
    }
  }

const middleware = [thunk]

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)))

export default store