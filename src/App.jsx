import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import BrowsePage from './pages/BrowsePage';
import Login from './pages/Login';
const App = () => <AuthProvider><BrowserRouter><Routes><Route path="/" element={<BrowsePage />} /><Route path="/login" element={<Login />} /></Routes></BrowserRouter></AuthProvider>;
export default App;
