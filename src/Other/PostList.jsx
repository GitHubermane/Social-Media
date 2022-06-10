import {React} from "react";
import P from "./P.jsx";

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h1>
                {title}
            </h1>
            {posts.map((post, index)=>
                <P remove={remove} number={index + 1 +'.'} post={post} key={post.id} />
            )}
        </div>
    );
};
export default PostList;