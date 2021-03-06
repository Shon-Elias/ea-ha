import { useEffect, useState } from 'react';
import { accountsData } from "../data";
import './style.css'
import { addManager, setManagerData } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const Accounts = () => {

  const [accounts, setAccounts] = useState([])
  const [add, setAdd] = useState(false)
  const [name, setName] = useState("")
  const [manager, setManager] = useState("")
  const dispatch = useDispatch();
  const storedAccounts = useSelector(state => state.accounts)



  useEffect(() => {

    const accountList =  resetStyling(accountsData)

    setAccounts(accountList)


  },[])


  const resetStyling = allAccounts => {
     return allAccounts.map(a => {
      return {...a, styling: {selectedManager: false, highlight:false}  }
    })

  }

  const highlightEmployeeHandler = (id) => {
    let highlightedAccounts = resetStyling(accounts)

    const selectedManager = accounts.findIndex(u => {
      return u.id === id
    })
    highlightedAccounts[selectedManager].styling.highlight = true
    highlightedAccounts[selectedManager].styling.selectedManager = true

    highlightedAccounts[selectedManager].employeesID.map(employee => {
      // console.log(employee)
      const selectedEmployee = accounts.findIndex(u => {
        return u.id === employee
      })
      highlightedAccounts[selectedEmployee].styling.highlight = true

      return highlightedAccounts;
    })

    setAccounts(highlightedAccounts)

  }

  const editingNameHandler = e => {

    const name = prompt("Update " + e.target.innerHTML+  " name:", e.target.innerHTML)
    if(name === null){
      return
    }
    const editedAccounts = accounts.map(account => {

      if(account.name === e.target.innerHTML){
        account.name = name;
      }else if(account.manager.name === e.target.innerHTML){
        account.manager.name = name
      }
        return account;
    })

    setAccounts(editedAccounts)

  }

  // works!!
  const inactiveHandler = id => {
    const editedAccounts = accounts.map(account => {
      if(account.id === id){
        account.status = 'inactive';
      }
        return account;
    })

    setAccounts(editedAccounts)
  }

  // works!!
  const addAccountManager = () => {

    dispatch(setManagerData(accounts));

    dispatch(addManager(accounts.length+1, name, '', 'active', '',manager, false, false,[]));

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


  // Comparing leangth of state with the stored state
  if(storedAccounts.length > accounts.length){
    setAccounts(storedAccounts)
  }

  return (
    <div>
        <button onClick={()=> setAdd(!add)}>{add ? 'cancel' : 'add'}</button>
        {
          add ? <button onClick={addAccountManager}>Save</button> : null
        }
        {
          accounts ?  accountManagerTable(accounts) : null
        }
        {
          accounts ? accountsTable(accounts) :null
        }
    </div>
  )

}


export default Accounts;
