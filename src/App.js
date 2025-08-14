

import './App.css';
import TableView from './TaskManagement/TableView';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

function App() {
  
  return (
    <div className="App">
     <Header/>
     <HeroSection/> 
      <TableView/>

    </div>
  );
}

export default App;
