import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './view/Home';
import Profile from './view/Profile';
import Login from './view/Login';
import Nav from './layout/Nav';
import { AuthCon } from './layout/AuthProvider';
import Register from './view/Register';
import CreatePost from './view/CRUD/CreatePost';
import DetailPost from './view/CRUD/DetailPost';
import DetailPostP from './view/CRUD/DetailPostP';
import EditPost from './view/CRUD/EditPost';
import EditsProfile from './view/CRUD/EditsProfile';

function App() {
  return (
    <div className="App">
      <AuthCon>
      <BrowserRouter>
      <Nav />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/create' element={<CreatePost />} />
      <Route path='/detail/:id' element={<DetailPost />} />
      <Route path='/detailP/:id' element={<DetailPostP />} />
      <Route path='/edits/:id' element={<EditPost />} />
      <Route path='/editsPosts/:id' element={<EditsProfile />} />
      </Routes>
      
      </BrowserRouter>
      </AuthCon>
    </div>
  );
}

export default App;
