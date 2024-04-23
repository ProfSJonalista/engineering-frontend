import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import BookingsPage from './pages/BookingsPage';
import Navbar from './Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </div>
    </>
  );
}
