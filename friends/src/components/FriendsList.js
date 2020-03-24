import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'

const FriendsList = () => {
    
    const [friends, setFriends] = useState({})
    const [newFriendData, setNewFriendData] = useState({})

    const handleChange = e => {
        
        setNewFriendData({
            ...newFriendData,
            id: friends.length+1,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        console.log(newFriendData)
        debugger
        axiosWithAuth()
            .post('http://localhost:5000/api/friends', newFriendData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:5000/api/friends')
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return(
   
        <div >
            <h1>My Friends List!</h1>
            
            {friends.length > 0 ? 
                <div className="friends-list-container">
                    {friends.map(friend => {
                        return(
                            <div className='friend-card' key={friend.id}>
                                <h2>{friend.name}</h2>
                                <p>Age: {friend.age}</p>
                                <p>Email: {friend.email}</p>
                                <p>Connection: {friend.connection}</p>
                            </div>
                        )
                    }) }
                </div> 
                :
                <div>loading friends list...</div>}

<div className="add-friend-form">
                <form onSubmit={handleSubmit}>
                    <div>
                    <input
                        type='text'
                        name='name'
                        placeholder='friends name'
                        value={newFriendData.name}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='age'
                        placeholder='age'
                        value={newFriendData.age}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='email'
                        placeholder='email address'
                        value={newFriendData.email}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='connection'
                        placeholder='where did you meet?'
                        value={newFriendData.connection}
                        onChange={handleChange}
                    />
                    </div>
                    <button>Add Friend</button>
                </form>
            </div>
        </div>
        
    )
}

export default FriendsList