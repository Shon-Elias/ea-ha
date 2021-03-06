import { useEffect, useState, useReducer } from 'react';
import { accountsData } from "../data";
import './style.css'
import { reducer, initialState } from './useReducer/reducer'

const Accounts = () => {

  const [add, setAdd] = useState(false)
  const [name, setName] = useState("")
  const [manager, setManager] = useState("")

  const [storedAccounts, dispatch] = useReducer(reducer, initialState)


  // works with useReducer
  useEffect(() => {

    const accountList =  resetStyling(accountsData)
    dispatch({type: 'FETCH_DATA_SUCCESS', payload: accountList})

  },[])

  // helper method
  const resetStyling = allAccounts => {
     return allAccounts.map(a => {
      return {...a, styling: {selectedManager: false, highlight:false}  }
    })

  }

  // works with useReducer
  const highlightEmployeeHandler = (id) => {
    let highlightedAccounts = resetStyling(storedAccounts.accounts)

    const selectedManager = storedAccounts.accounts.findIndex(u => {
      return u.id === id
    })
    highlightedAccounts[selectedManager].styling.highlight = true
    highlightedAccounts[selectedManager].styling.selectedManager = true

    highlightedAccounts[selectedManager].employeesID.map(employee => {
      // console.log(employee)
      const selectedEmployee = storedAccounts.accounts.findIndex(u => {
        return u.id === employee
      })
      highlightedAccounts[selectedEmployee].styling.highlight = true

      // return highlightedAccounts;
    })

    dispatch({type: 'HIGHLIGHTED_ACCOUNTS', payload: highlightedAccounts})

  }

  // works with useReducer
  const editingNameHandler = e => {

    const name = prompt("Update " + e.target.innerHTML+  " name:", e.target.innerHTML)
    if(name === null){
      return
    }
    // const editedAccounts = storedAccounts.map(account => {
      storedAccounts.accounts.map(account => {

      if(account.name === e.target.innerHTML){
        account.name = name;
      }else if(account.manager.name === e.target.innerHTML){
        account.manager.name = name
      }
        return account;
    })

    dispatch({type: 'CHANGE_MANAGER_NAME', payload: storedAccounts.accounts})

  }

  // works with useReducer
  const inactiveHandler = id => {
    let editedAccounts = [...storedAccounts.accounts]
    storedAccounts.accounts.map(account => {
      if(account.id === id){
        account.status = 'inactive';
      }
        return account;
    })

    console.log("accuonts", storedAccounts.accounts)
    console.log("inactive", editedAccounts)
    // dispatch(setManagerData(editedAccounts));
    dispatch({type: 'INACTIVE_ACCOUNTS', payload: storedAccounts.accounts})
    // setAccounts(editedAccounts)
  }

  // works with useReducer
  const addAccountManager = () => {

    dispatch({type: 'ADD_MANAGER', payload:
     {
       id: storedAccounts.accounts.length+1,
       name,
       company: '',
       status: 'active',
       manager: {
         id: '',
         name: manager
        },
       styling: {
          highlight: false,
          selectedManager: false
        },employeesID: []}} )

    setAdd(!add)
    setName("")
    setManager("")
  }

  const accountManagerTable = (accounts) => {

    const accountManagerList = accounts.map((account, i) => {
      return (
        <tr
          key={account.id}
          className={account.company === '' ? 'no-employees' :null}>
          <td key={account.id}>{account.id}</td>
          <td
            className={account.styling.highlight ? 'highlight' : null }
            key={account.name}
            onClick={() => highlightEmployeeHandler(account.id)}>
            {account.name}</td>
          <td
            className={''}
            key={account.manager.name}
            onDoubleClick={editingNameHandler}>{account.manager.name}</td>
        </tr>
      )
   })



    return (
      <table>
        <thead>
          <tr >
            <td >ID</td>
            <td >Name</td>
            <td >Manager</td>
          </tr>
        </thead>
        <tbody>
        {
          accountManagerList
        }
        {
          add ?

            <tr>
              <td><label>{accounts.length+1}</label></td>
              <td ><input autoFocus value={name} onChange={e => setName(e.target.value)}/></td>
              <td><input value={manager} onChange={e => setManager(e.target.value)}/></td>
            </tr>
          :null
        }
        </tbody>
      </table>
    )

  }

  const accountsTable = (accounts) => {
    console.log('before rend accountsTable', accounts)
    const accountList = accounts.map((account, i) => {

      return (
        account.company !== '' ?
        <tr
          key={account.id}
          onDoubleClick={account.status === 'active' ? ()=> inactiveHandler(account.id) : null}>
          <td key={account.id}>
            {account.id}
          </td>
          <td
            className={account.styling.selectedManager ? 'highlight' : null }
            key={account.company}>
            {account.company}
          </td>
          <td key={account.name}>
            {account.name}
          </td>
          <td key={account.status}>
            {account.status}
          </td>
        </tr>
       : null
      )
   })


    return (
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Account Manager</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {
            accountList
          }

        </tbody>
      </table>
    )
  }



console.log('before rend', storedAccounts)
  return (
    <div>
        <button onClick={()=> setAdd(!add)}>{add ? 'cancel' : 'add'}</button>
        {
          add ? <button onClick={addAccountManager}>Save</button> : null
        }
        {
          storedAccounts.loading ?  '   Loading...' : storedAccounts.error !== '' ? storedAccounts.error : accountManagerTable(storedAccounts.accounts)
        }
        {
          storedAccounts.loading ? null : storedAccounts.error !== '' ? null :  accountsTable(storedAccounts.accounts)
        }
    </div>
  )

}


export default Accounts;
