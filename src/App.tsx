import { Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h5>To Do List</h5>
      </header>
      
      <section className='body'>
        <Outlet />
      </section>      
    </div>
  );
}

export default App;
