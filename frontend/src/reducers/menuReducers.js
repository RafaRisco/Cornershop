import {
    TODAY_MENU_REQUEST,
    TODAY_MENU_SUCCESS,
    TODAY_MENU_FAILS,
    PLATES_LIST_REQUEST,
    PLATES_LIST_SUCCESS,
    PLATES_LIST_FAILS,
    PLATES_LIST_RESET,
    PLATE_CREATE_REQUEST,
    PLATE_CREATE_SUCCESS,
    PLATE_CREATE_FAILS,
    PLATE_CREATE_RESET,
    CREATE_MENU_REQUEST,
    CREATE_MENU_SUCCESS,
    CREATE_MENU_FAILS,
    CREATE_MENU_RESET,
    CREATE_EMPLOYEE_SELECTION_REQUEST,
    CREATE_EMPLOYEE_SELECTION_SUCCESS,
    CREATE_EMPLOYEE_SELECTION_FAILS
 } from "../constants/menuConstants";


export const todayMenuReducer = (state={loading:false, menu: null}, action) => {
     switch (action.type) {
         case TODAY_MENU_REQUEST:
             return {
                 loading: true
             }
        case TODAY_MENU_SUCCESS:
            return {
                loading: false,
                menu: action.payload
            }
        case TODAY_MENU_FAILS:
            return {
                loading: false,
                error: action.payload
            }
         default:
             return state
     }
 }

export const platesListReducer = (state={loading: false, plates: null}, action) => {
    switch (action.type) {
        case PLATES_LIST_REQUEST:
            return {
                loading: true
            }
        case PLATES_LIST_SUCCESS:
            return {
                loading: false,
                plates: action.payload
            }
        case PLATES_LIST_FAILS:
            return {
                loading: false,
                error: action.payload
            }
        case PLATES_LIST_RESET:
            return {
                loading: false,
                plates: null
            }
        default:
            return state
    }
}

export const createPlateReducer = (state={loading: false, success: false}, action) => {
    switch (action.type) {
        case PLATE_CREATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PLATE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PLATE_CREATE_FAILS:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        case PLATE_CREATE_RESET:
            return {
                loading: false,
                success: false
            }
        default:
            return state
    }
}

export const createMenuReducer = (state={loading: false, success: false}, action) => {
    switch (action.type) {
        case CREATE_MENU_REQUEST:
            return {
                loading: true
            }
        case CREATE_MENU_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_MENU_FAILS:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_MENU_RESET:
            return {
                loading: false,
                success: false
            }
        default:
            return state
    }
}

export const createEmployeeSelectionReducer = (state={loading: false, success: false}, action) =>{
    switch (action.type) {
        case CREATE_EMPLOYEE_SELECTION_REQUEST:
            return {
                loading: true
            }
        case CREATE_EMPLOYEE_SELECTION_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_EMPLOYEE_SELECTION_FAILS:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

