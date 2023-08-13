import './App.css';
import { BaseLayout } from './Pages/BaseLayout';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BaseLayout>
        <Dashboard />
      </BaseLayout>
    </div>
  );
}

export default App;
