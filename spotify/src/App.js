import './App.css';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() { 
  return ( 
    <div className="container">
    <div className="component"><Home /></div>
    <div className="component"><Sidebar /></div>
    </div>
  );
  
}

export default App;
