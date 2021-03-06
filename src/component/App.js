// import { useState, useEffect } from 'react'
import  Accounts  from "./Accounts";
import './style.css'

const App = () => {

  return (
    <div>
      <Accounts />
    </div>

  )


}

export default App;



/*


import { theadDataManager, accountManagerData, theadDataAccounts,accountsData } from "../data";


  const [accountManagers, setAccountManagers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [ishighlight, setIshighlight] = useState([])
  const [addManager, setAddManager ] = useState(false)


  useEffect(() => {
    setIshighlight(new Array(accountManagerData.length).fill(false))
    setAccounts(accountsData)
    setAccountManagers(accountManagerData)
  },[])

  const cellClickHandler = e => {
    e.preventDefault()
    console.log("find ID", e)

    const manager = e.target.innerHTML;
    const highlightsCells = accountManagers.map(m => {
      return m.manager === manager
      })

      setIshighlight(highlightsCells)
  }

  const cellDoubleClickHandler = e =>{
    e.preventDefault()

    const name =  prompt("Upadte manager name:")

    console.log(name)

  }

  const addManagerHandler = e => {
    e.preventDefault()

    setAddManager(!addManager)


  }

  const managerStatusHandler = e => {
    console.log('managerStatusHandler')
  }


  console.log('higghtlight', ishighlight)

  return (
    <div >
      <button
        onClick={addManagerHandler}>{addManager ? 'Add Manager' : 'Save'}</button>
      <Table
        theadData={theadDataManager} tbodyData={accountManagers} onCellClick={cellClickHandler}
        onCellDoubleClick={cellDoubleClickHandler}
        highlights={ishighlight}
        addManager={addManager}/>
      <Table
        theadData={theadDataAccounts} tbodyData={accounts}
        onCellClick={cellClickHandler}
        onCellDoubleClick={cellDoubleClickHandler}
        onManagerStatus={managerStatusHandler}/>
    </div>
  )

*/
