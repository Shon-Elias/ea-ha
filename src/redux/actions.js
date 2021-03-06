export const GET_MANAGER_DATA = 'GET_MANAGER_DATA';
export const ADD_MANAGER = 'ADD_MANAGER';

export const setManagerData = data => ({
	type: GET_MANAGER_DATA,
	payload: data
});

export const addManager = (id, name, company, status, managerid, managername, highlight, selectedManager, employeesID) => ({
	type: ADD_MANAGER,
	payload: {
		id,
    name,
    company,
    status,
    manager: {
        id: managerid,
        name: managername
		},
		styling: {
			highlight,
			selectedManager
		},
    employeesID
	}
});
