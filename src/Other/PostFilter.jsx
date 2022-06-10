import React from "react";
import MySelect from './UI/select/MySelect';
import Inputon from './UI/input/input';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <Inputon
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder='Search...'
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort"
                options={[
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' }
                ]}
            />
        </div>
    );
};
export default PostFilter;