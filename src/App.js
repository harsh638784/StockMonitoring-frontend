import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
