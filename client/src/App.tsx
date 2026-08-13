import { Routes, Route } from 'react-router-dom';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { Chatbot } from './components/Chatbot';
import { Landing } from './pages/Landing';
import { Quiz } from './pages/Quiz';
import { Careers } from './pages/Careers';
import { Mentors } from './pages/Mentors';
import { Parents } from './pages/Parents';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopHeader />
      <main className="flex-1 pb-20 sm:pb-0 relative">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Chatbot />
      <BottomNav />
    </div>
  );
}

export default App;
