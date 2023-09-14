import  profileReducer  from './ProfileReducer';
import  messageReducer  from './MessageReducer';

let store = {
    _state: {
        ProfilePage: {
            PostData: [
                { id: 1, likes: "23", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, atque!" },
                { id: 2, likes: "10", text: "Lorem ipsum dolor, sit amet  elit. Hic, atque!" },
                { id: 3, likes: "53", text: "Lorem ipsum 2, sit amet 4 elit. Hic, atque!" },
            ],
            postNewText: 'anything',
        },
        MessagesPage: {
            UserMessageData: [
                { id: 1, name: "Kevin" },
                { id: 2, name: "John" },
                { id: 3, name: "Lara" },
                { id: 4, name: "Greg" },
                { id: 5, name: "Brandon" },
            ],
            MessagesData: [
                { id: 1, text: "Let's go" },
                { id: 2, text: "Let's go" },
                { id: 3, text: "Let's go" },
                { id: 4, text: "Let's go" },
                { id: 5, text: "Let's go" },
            ],
            messageNewText: 'anything',
        },
    },

    _callSubscriber(){
        console.log('state changed');
    },
 
    getState(){
        return this._state;
    },
 
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    
    dispatch(action) {
        profileReducer(this._state.ProfilePage, action)
        messageReducer(this._state.MessagesPage, action)
        this._callSubscriber(this._state);
    }
}
export default store