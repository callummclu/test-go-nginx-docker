import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import useAuth from './hooks/useAuth';
import { Home } from './pages/home';
import { Error } from './pages/error';
import {BiError} from 'react-icons/bi'
import { LandingPage } from './pages/landingpage';
import { Nav } from './components/nav';
import { About } from './pages/about';
import { Container } from './components/Container';
import { PostPage } from './pages/postpage';

const isAdmin = () => window.location.href.includes('/admin')

function App() {

  const { loggedIn } = useAuth();

  return (
    <BrowserRouter>
      {!isAdmin() && <Nav/>}
      <Container isAdmin={isAdmin()}>
        <Routes>
          <Route path="*" element={<Error code={404} message="Page not found." icon={<BiError size={80}/>}/>}/>
          <Route path="" element={<LandingPage/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="p/:id" element={<PostPage/>}/>
          <Route path="admin" element={loggedIn ? <Home/> :<Login/>}/>
          <Route path="admin/login" element={<Login/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
