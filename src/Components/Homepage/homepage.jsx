import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Homepage = ({posts, setPosts, setPostDetail}) => {

const [modal, setModal] = useState(false);
const [singlePost, setSinglePost] = useState({id: "", title: "", body: "", comment: []});
const [editing, setEditing] = useState(false);
const [currTask, setCurrTask] = useState({});
const navigate = useNavigate();

useEffect(() => {
fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
return res.json();
}).then((resp) => {
console.log(resp);
setPosts(resp);
}).catch((err) => {
console.log(err.message);
});
}, []);

const postHandler = (currTask) => {
console.log("current task", currTask.id);
if(editing){
fetch(`https://jsonplaceholder.typicode.com/posts/${currTask.id}`, {
method: "PUT",
headers: {
'Content-type': 'application/json; charset=UTF-8',
},
body: JSON.stringify(singlePost)
}).then((response) => response.json())
.then((resp) => {
let newList = posts.map(item=> item.id === resp.id ? {...resp, title: resp.title, body: resp.body} : item)
setPosts(newList);
console.log("response" ,resp);
console.log("singlePost", singlePost);
alert("Edited Successfully");
setSinglePost({title: "", body: "", comment: ""});
}).catch((err) => {
console.log(err.message);
});
setEditing(false);
}
else{
fetch("https://jsonplaceholder.typicode.com/posts", {
method: "POST",
headers: {
'Content-type': 'application/json; charset=UTF-8',
},
body: JSON.stringify(singlePost)
})
.then((response) => response.json())
.then((resp) => {
alert("Saved Successfully");
console.log(resp);
setPosts((posts) => posts.concat(resp));
setSinglePost({title: "", body: "", comment: ""});
})
.catch((err) => {
console.log(err.message);
});
console.log(singlePost);
}
}

const postDetailsHandler = (id) => {
navigate(`/post/${id}`);
console.log("in");
const data = posts.filter((post) => post.id === id);
console.log(data);
setPostDetail(data);
console.log("out");
}

const editHandler = (post) => {
setModal(true);
setSinglePost({...singlePost, id: post.id, title: post.title, body: post.body})
setCurrTask(post);
setEditing(true);
}

const deleteHandler = (id) => {
fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
method: "DELETE"
}).then((response) => response.json())
.then((resp) => {
console.log(resp);
let deletePost = posts.filter((post) => (
post.id !== id
))
setPosts(deletePost)
alert("Removed Successfully");
}).catch((err) => {
console.log(err.message);
});
}
return (
<div className="relative overflow-x-auto shadow-md m-4">
  <div className="bg-gray-500 flex justify-center items-center">
    <h1 className="mr-auto m-3 font-bold">POSTS</h1>
    <button className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded m-3" onClick={()=> setModal(true)}>Add
      Post</button>
  </div>
  <table class="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th scope="col" className="px-6 py-3 text-s font-bold text-gray-500 uppercase ">
          ID
        </th>
        <th scope="col" className="px-6 py-3 text-s font-bold text-gray-500 uppercase ">
          Title
        </th>
        <th scope="col" className="px-6 py-3 text-s font-bold text-gray-500 uppercase ">
          Body
        </th>
        <th scope="col" className="px-6 py-3 text-s font-bold text-gray-500 uppercase ">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {
      posts &&
      posts.map((post) => (
      <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-200 cursor-pointer">
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-normal">
          {post.id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-normal" onClick={()=> postDetailsHandler(post.id)}>
          {post.title}</td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-normal">
          {post.body}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-normal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6" onClick={()=> editHandler(post)}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-normal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6" onClick={()=> deleteHandler(post.id)}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </td>
      </tr>
      ))
      }
    </tbody>
  </table>

  {
  modal && (
  <Modal isOpen={ modal }
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center flex-col">
    <div className="w-1/4 h-auto bg-gray-300 p-3">
      <header className="flex space-x-48 m-1 mb-5">
        <h3>Create New Post</h3>
        <p className="cursor-pointer" onClick={()=> setModal(false)}>x</p>
      </header>
      <main className="flex flex-col space-y-4 justify-center items-center">
        <input type="text" placeholder="Post Title" required className="rounded p-3 text-left w-3/4"
          value={singlePost.title} onChange={(e)=>
        setSinglePost({...singlePost, title: e.target.value})}/>
        <textarea type="text" placeholder="Post Description" className="rounded p-3 text-left w-3/4"
          value={singlePost.body} onChange={(e)=> setSinglePost({...singlePost, body: e.target.value})}></textarea>
        <textarea type="text" placeholder="Post Comment" className="rounded p-3 text-left w-3/4"
          value={singlePost.comment}
          onChange={(e)=> setSinglePost({...singlePost, comment: e.target.value})}></textarea>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-3" onClick={()=>
          postHandler(currTask)}>CREATE POST</button>
      </main>
    </div>
  </Modal>
  )
  }
</div>


);
};

export {Homepage};