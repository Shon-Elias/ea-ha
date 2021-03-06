export const accountsData= [
	  {
      id: 1,
      name: 'Alice',
      company: 'HP',
      status: 'active',
      manager: {
        id: '',
        name: ''
      },
      employeesID: [2, 3, 4, 5]
    },
    {
      id: 2,
      name: 'Bob',
      company: 'IBM',
      status: 'active',
      manager: {
        id: 1,
        name:'Alice'
      },
      employeesID: [4]
    },
    {
      id: 3,
      name: 'Charlie',
      company: 'Google',
      status: 'active',
      manager: {
        id: 1,
        name: 'Alice'
      },
      employeesID: [5]
    },
    {
      id: 4,
      name: 'Dave',
      company: 'United',
      status: 'active',
      manager: {
        id: 2,
        name:'Bob'
      },
      employeesID: []
    },
    {
      id: 5,
      name: 'Eve',
      company: 'MySpace',
      status: 'inactive',
      manager: {
        id: 3,
        name:'Charlie'
      },
      employeesID: []
    },
    {
      id: 6,
      name: 'Jose',
      company: '',
      status: 'active',
      manager: {
        id: 1,
        name:'Alice'
      },
      employeesID: [5, 4]
    }
];
