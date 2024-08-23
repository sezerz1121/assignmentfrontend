import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Upload from './upload';
function App() {
  
 

  return (
<Router>
      <Routes>
        <Route path="/link" element={<Home/>} />
        <Route path="/" element={<Upload/>} />
      </Routes>
</Router>
  );
}

export default App;
