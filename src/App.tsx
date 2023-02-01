import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RiddleTabs from './components/RiddleTabs';

const App = () => (
  <Router>
    <Routes>
      <Route path='/:tabName' element={<RiddleTabs />} />
      <Route path='*' element={<Navigate to='/search' />} />
    </Routes>
  </Router>
);

export default App;
