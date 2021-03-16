// import { accountsData } from "../../data";


const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED'
const HIGHLIGHTED_ACCOUNTS = 'HIGHLIGHTED_ACCOUNTS'
const INACTIVE_ACCOUNTS = 'INACTIVE_ACCOUNTS'
const CHANGE_MANAGER_NAME = 'CHANGE_MANAGER_NAME'
export const GET_MANAGER_DATA = 'GET_MANAGER_DATA';
export const ADD_MANAGER = 'ADD_MANAGER';

export const initialState = {
  loading: true,
  accounts: [],
  error: ''
}

export const reducer = (state, action) => {

  console.log("action", action)

  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        accounts: action.payload,
        error: ''
      }
    case HIGHLIGHTED_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload
      }
    case INACTIVE_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload
      }
    case ADD_MANAGER:
      return {
        ...state,
        accounts: [...state.accounts,
          {
            id: action.payload.id,
            name: action.payload.name,
            company: action.payload.company,
            status: action.payload.status,
            manager: {
                id: action.payload.manager.id,
                name: action.payload.manager.name
            },
            styling: {
              highlight: action.payload.styling.highlight,
              selectedManager: action.payload.styling.selectedManager
            },
            employeesID: action.payload.employeesID
          }
          ]
      }
    case CHANGE_MANAGER_NAME:
      return {
        ...state,
        accounts: action.payload
      }
    case FETCH_DATA_FAILED:
      return {
        loading: false,
        post: [],
        error: 'Something went wrong'
      }
    default:
      return state;
  }
}


