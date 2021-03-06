import { GET_MANAGER_DATA, ADD_MANAGER } from '../actions';

const accounts = (state = [], action) => {

	// console.log("loadddd", action.payload)

	switch (action.type) {
		case GET_MANAGER_DATA:
			return action.payload
		case ADD_MANAGER:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default accounts;
