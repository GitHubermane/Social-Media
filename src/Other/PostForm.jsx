import React, {useState} from "react";
import Button from "./UI/btn/button.jsx";
import Inputon from "./UI/input/input.jsx";

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', body: '' });

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({ title: '', body: '' })
    }
    
    return (
        <form className="form">
            <Inputon
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Title"
            />
            <Inputon
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Text"
            />
            <Button onClick={addNewPost}>Create</Button>
        </form> 
    );
};
export default PostForm;