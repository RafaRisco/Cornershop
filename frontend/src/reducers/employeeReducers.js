import { 
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_FAILS,
    EMPLOYEE_LIST_SUCCESS,

    EMPLOYEE_LOGIN_REQUEST,
    EMPLOYEE_LOGIN_FAILS,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGOUT
 } from "../constants/employeeConstants";

 export const employeeListReducer = (state={ loading: false, employees: null }, action) => {
     switch (action.type) {
         case EMPLOYEE_LIST_REQUEST:
             return {
                 loading: true
             }
            case EMPLOYEE_LIST_SUCCESS:
                return {
                    loading: false,
                    employees: action.payload
                }
            case EMPLOYEE_LIST_FAILS:
                return {
                    loading: false,
                    error: action.payload
                }
         default:
             return state
     }
 }

 export const employeeLoginReducer = ( state = { employee: null, loading:false}, action) => {
    switch (action.type) {
        case EMPLOYEE_LOGIN_REQUEST:
            return {
                loading: true,
            }
        case EMPLOYEE_LOGIN_SUCCESS:
            return {
                loading: false,
                employee: action.payload
            }
        case EMPLOYEE_LOGIN_FAILS:
            return {
                loading: false,
                error: action.payload
            }
        case EMPLOYEE_LOGOUT:
            return {
                employee: null
            }
        default :
            return state
    }
}