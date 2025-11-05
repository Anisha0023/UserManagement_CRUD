import './App.css';
import Toast from './Component/toast';
import Home from './Pages/Home';
import UserView from './Pages/UserView';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route element={<UserView/>} path="userView/:id"/>
        <Route element={<Home/>} path="/"/>
      </Routes>
      <Toast/>
     
    </div>
  );
}



export default App;
