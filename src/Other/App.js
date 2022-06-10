// import React, {useMemo, useState, useRef} from "react";
import React from "react";
// import "./Styles/app.css";
// import PostList from "./Components/PostList.jsx";
// import PostForm from "./Components/PostForm.jsx";
// import PostFilter from './Components/PostFilter';
import ToDo from "./Second_comps/ToDo";

function App() {
  return(
    <div className="App">
      <ToDo/>
    </div>
  );
};

// function App() {
//   const [poston, setPosts] = useState([
//     { id: 1, title: '132', body: '343' },
//     { id: 2, title: '254', body: '6552' },
//     { id: 3, title: '3523', body: '15323' },
//   ]);
//   const [filter, setFilter] = useState({sort:'', query:''})
//   const sortedPosts = useMemo(() => {
//     if (filter.sort) {
//       return [...poston].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
//     }
//     return poston;
//   }, [filter.sort, poston]);
//   const sortedAndSearchedPosts = useMemo(() => {
//     return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
//   }, [filter.query, sortedPosts])
//   const createPost = (newPost) => {
//     setPosts([...poston, newPost])
//   };
//   const removePost = (post) => {
//     setPosts(poston.filter(p => p.id !== post.id))
//   };
//   return (
//     <div className="App">
//       <PostForm create={createPost}/>
//       <PostFilter
//         filter={filter}
//         setFilter={setFilter}
//       />
//       {sortedAndSearchedPosts.length !== 0
//         ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"список 1"}/>
//         :<div className="Attention">Постов нет</div>
//       }
//     </div>
//   );
// };

export default App;
