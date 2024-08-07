
// import LoginIntro from "./Login/LoginIntro";
import FindPasswordContainer from "./FTG/FindPasswordContainer";
import Home from "./Main/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './FTG/Theme';
import  { ThemeProvider } from 'styled-components';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/findPassword" element={<FindPasswordContainer/>}></Route>
        </Routes>
      </Router>
      {/* <LoginIntro /> */}
    </div>
    </ThemeProvider>
  );
}

export default App;
