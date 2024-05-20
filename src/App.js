import './App.css';
import EngtoThai from './Containers/Engtothai';
import ThaiToEng from './Containers/Thaitoeng';
import History from './Containers/History';
import ThaiToEngTransformer from './Containers/ThaitoengTransformer';
import EngToThaiTransformer from './Containers/EngtothaiTransformer';
import { BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<EngtoThai />} />
        <Route path="/thai2eng" element={<ThaiToEng />} />
        <Route path="/history" element={<History />} />
        <Route path="/thai2engTransformer" element={<ThaiToEngTransformer />} />
        <Route path="/eng2thaiTransformer" element={<EngToThaiTransformer />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
