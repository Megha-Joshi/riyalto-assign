import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './Components/Homepage/homepage';
import { Post } from './Components/Posts/post';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [postDetail, setPostDetail] = useState({title: "", body: "", comment: []});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Homepage posts={posts} setPosts={setPosts} setPostDetail={setPostDetail}/>} />
          <Route path="/post/:postID" element={<Post posts={posts} postDetail={postDetail}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
