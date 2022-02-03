import axios from 'axios';

import { 
    // EMPLOYEE_LIST_REQUEST,
    // EMPLOYEE_LIST_SUCCESS,
    // EMPLOYEE_LIST_FAILS,
    EMPLOYEE_LOGIN_REQUEST,
    EMPLOYEE_LOGIN_FAILS,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGOUT

 } from '../constants/employeeConstants'

//  export const employeeListAction = () => async(dispatch) => {
//      try {
//          dispatch({type: EMPLOYEE_LIST_REQUEST})

//          const res = await axios.get('/api/employees/')

//          const { data } = res

//          dispatch({
//              type: EMPLOYEE_LIST_SUCCESS,
//              payload: data
//          })
//      } catch (error) {
//          dispatch({
//              type: EMPLOYEE_LIST_FAILS,
//              payload: error.response && error.response.data.detail
//              ? error.response.data.detail
//              : error.message        
//           })
//      }
//  }

 export const employeeLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({type: EMPLOYEE_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/employees/login/',
                {'email':email, 'password':password},
                config)

        const { data } = res

        dispatch({
            type: EMPLOYEE_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('employeeLogin', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: EMPLOYEE_LOGIN_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message        
        })                
    }
}