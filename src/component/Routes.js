import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './App'

const Routes = () => {
  const auth = true;
  return (
    <BrowserRouter>
      <Switch>
        <Route
          render={()=>{
            if(auth) {
              return <App/>
            }

            <Redirect to='/login' />
          }}

        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
