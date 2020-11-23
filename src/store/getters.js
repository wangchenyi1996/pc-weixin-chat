import { getChatTime } from "@/utils/timeFunc.js";
const getters = {
    // 筛选出含有搜索值的聊天列表
    searchedChatlist(state) {
        let sessions = state.chatlist.filter(sessions => sessions.user.name.includes(state.searchText));
        return sessions
    },
    // 筛选出含有搜索值的好友列表
    searchedFriendlist(state) {
        let friends = state.friendlist.filter(friends => friends.remark.includes(state.searchText));
        return friends
    },
    // 通过当前选择是哪个对话匹配相应的对话
    selectedChat(state) {
        let session = state.chatlist.find(session => session.id === state.selectId);
        return session

        // let session = state.chatlist.find(session => session.id === state.selectId);
        // if (session.messages.length > 0) {
        //     for (let i = 0; i < session.messages.length; i++) {
        //         if (session.messages[i].date) {
        //             // console.log(typeof session.messages[i].date)
        //             if (typeof session.messages[i].date === 'object') {
        //                 session.messages[i].date = getChatTime(new Date(session.messages[i].date).getTime(), i > 0 ? new Date(session.messages[i - 1].date).getTime() : 0);
        //             }else{
        //                 session.messages[i].date = session.messages[i].date
        //             }
        //         }
        //     }
        //     console.log(session)
        //     return session
        // }
        
    },
    // 通过当前选择是哪个好友匹配相应的好友
    selectedFriend(state) {
        let friend = state.friendlist.find(friend => friend.id === state.selectFriendId);
        return friend
    },
    messages(state) {
        let session = state.chatlist.find(session => session.id === state.selectId);
        return session.messages
    }
}

export default getters;