import axios from 'axios';

import { 
    TODAY_MENU_REQUEST,
    TODAY_MENU_SUCCESS,
    TODAY_MENU_FAILS,
    PLATES_LIST_REQUEST,
    PLATES_LIST_SUCCESS,
    PLATES_LIST_FAILS,
    PLATE_CREATE_REQUEST,
    PLATE_CREATE_SUCCESS,
    PLATE_CREATE_FAILS,
    CREATE_MENU_REQUEST,
    CREATE_MENU_SUCCESS,
    CREATE_MENU_FAILS,
    CREATE_EMPLOYEE_SELECTION_REQUEST,
    CREATE_EMPLOYEE_SELECTION_SUCCESS,
    CREATE_EMPLOYEE_SELECTION_FAILS
} from '../constants/menuConstants'


export const todayMenuAction = () => async(dispatch) => {
    try {
        dispatch({
            type:TODAY_MENU_REQUEST
        })

        const res = await axios.get('/api/menu/today_menu/')

        const { data } = res

        dispatch({
            type:TODAY_MENU_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: TODAY_MENU_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message        
        })  
    }
}

export const platesListAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PLATES_LIST_REQUEST
        })

        const {
            employeeLogin: { employee }
        } = getState()
    
        const config = {
            headers: {
                Authorization: `Bearer ${employee.token}`
            }
        }

        const res = await axios.get('/api/menu/plates/', config)

        const { data } = res

        dispatch({
            type: PLATES_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PLATES_LIST_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message        
        })          
    }
}

export const createPlateAction = (plate_name) => async(dispatch) => {
    try {
        dispatch({
            type: PLATE_CREATE_REQUEST
        })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/menu/plates/create/', { name: plate_name }, config)

        const {data} = res

        dispatch({
            type: PLATE_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PLATE_CREATE_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
} 

export const createMenuAction = (day, plates) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_MENU_REQUEST
        })
        
        const {
            employeeLogin: { employee }
        } = getState()
    
        const config = {
            headers: {
                Authorization: `Bearer ${employee.token}`
            }
        }


        const res = await axios.post('/api/menu/today_menu/create/', { day, plates }, config)

        const { data } = res
    
        dispatch({
            type: CREATE_MENU_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_MENU_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const createEmployeeSelectionAction = (menu, plate, comments) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_EMPLOYEE_SELECTION_REQUEST
        })

        const {
            employeeLogin: { employee }
        } = getState()
    
        const config = {
            headers: {
                Authorization: `Bearer ${employee.token}`
            }
        }

        const res = await axios.post('/api/menu/employee_selection/create/', 
        { menu:menu, plate:plate, comments:comments }, config)

        const { data } = res

        dispatch({
            type: CREATE_EMPLOYEE_SELECTION_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_EMPLOYEE_SELECTION_FAILS,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}