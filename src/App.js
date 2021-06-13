import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Joinbutton from './components/Joinbutton'
import Chat from './components/pages/Chat'
import './App.css';

function App() {
  return (
    <div className="App" style={{color:"black"}}>
      <Header/>
      {/*<Joinbutton/>*/}
      <Chat/>
    </div>
  );
  
}

export default App;
