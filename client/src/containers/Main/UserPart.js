import React, { Component } from 'react';
import { userService } from '../../service/userService';
import { chatService } from '../../service/chatService';
import jwt from 'jsonwebtoken';
import swal from 'sweetalert';

const token = localStorage.getItem("jwtToken");

class UserPart extends Component {

    state = {
        users: '',
        friends: '',
        chatMsg: '',
        chatRoom: ''
    }

    componentWillMount() {
        if (token) {
            const authUser = jwt.decode(token).username;
            userService.AllUsers(authUser).then((res) => {
                this.setState({
                    users: res.users
                })
            })
            userService.allFriends(authUser).then((res) => {
                this.setState({
                    friends: res.friends
                })
            })
            chatService.getAllMsg(authUser).then((res) => {
                this.setState({
                    chatRoom: res.messages
                })
            })
        }
    }

    chatMessage = (e) => {
        this.setState({
            chatMsg: e.target.value
        })
    }

    sendChat = () => {
        this.setState({
            chatMsg: ""
        })
        if (token) {
            const authUser = jwt.decode(token).username;
            chatService.sendChat(authUser, this.state.chatMsg).then((res) => {
                this.setState({
                    chatRoom: res.messages
                })
            })
        }
    }

    clearChat = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to search together with this friend!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (token) {
                        const authUser = jwt.decode(token).username;
                        chatService.clearChat(authUser).then((res) => {
                            this.setState({
                                chatRoom: ''
                            })
                            swal(res.message, {
                                icon: "success",
                            });
                        })
                    }
                } else {
                    swal("Messages are safe!");
                }
            });
       
    }

    findUser = (e) => {
        this.setState({
            findUser: e.target.value
        })
    }

    addFriends = () => {
        if (token) {
            const authUser = jwt.decode(token).username;
            let friend = this.state.findUser;
            userService.addFriends(authUser, friend).then((res) => {
                if (res.status === 201) {
                    swal(res.message, {
                        icon: "warning",
                    });
                } else {
                    this.setState({
                        friends: res.friends
                    });
                    chatService.getAllMsg(authUser).then((res) => {
                        this.setState({
                            chatRoom: res.messages
                        })
                    })
                }
            })
        }
    }

    delFriends = (friend, e) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to search together with this friend!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (token) {
                        const authUser = jwt.decode(token).username;
                        userService.delFriends(authUser, friend).then((res) => {
                            this.setState({
                                friends: res.friends
                            })
                            swal("Deleted successfully!", {
                                icon: "success",
                            });
                        })
                    }
                } else {
                    swal("Your friend is safe!");
                }
            });
    }

    render() {
        return (
            <div className="col-md-2">
                <div class="mb-2">
                    <div class="chat_room">
                        {this.state.chatRoom !== '' && this.state.chatRoom.map((row, index) => (
                            <p className="chatTxt">{row.sender} : {row.message}</p>
                        ))}
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.state.chatMsg} onChange={this.chatMessage} />
                        <div className="input-group-append">
                            <button type="button" title="Send Msg" className="btn btn-primary" onClick={this.sendChat}><i class="fa fa-paper-plane-o"></i></button>
                            <button type="button" title="Clear All" className="btn btn-danger" onClick={this.clearChat}><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div className="group_list pt-1 mb-2">
                    <div>
                        <span className="list_title">List of your friends</span>
                    </div>
                    <ul className="list-group">
                        {this.state.friends !== '' && this.state.friends.map((row, index) => (
                            <li className="list-group-item"><span className="user_span">{row.username}</span><span className="times_span" title="Delete friend" onClick={this.delFriends.bind(this, row.username)}><i className="fa fa-times"></i></span></li>
                        ))}
                    </ul>
                </div>
                <div className="user_list">
                    <input className="form-control" list="browsers" name="browser" value={this.state.findUser} id="browser" placeholder="list of users" onChange={this.findUser} />
                    <datalist id="browsers">
                        {this.state.users !== '' && this.state.users.map((row, index) => (
                            <option key={index} value={row.username}></option>
                        ))}
                    </datalist>
                    <button type="button" className="btn btn-success mt-2" onClick={this.addFriends}>Add to friends list</button>
                </div>
            </div>
        );
    }
}

export default UserPart;
