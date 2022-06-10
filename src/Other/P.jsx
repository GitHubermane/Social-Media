import {React} from "react";
import Button from './UI/btn/button';

const P = (props) => {
    return (
        <div className="post" >
            <div className="post__content">
                <strong>{props.number} {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btn">
                <Button onClick={() => props.remove(props.post)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};
export default P;