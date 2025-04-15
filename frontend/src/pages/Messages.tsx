import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  user_id_1: number;
  user_id_2: number;
  date: string;
  message: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  phone_num: string;
  profile_name: string;
  propic: File;
  real_name: string
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<Record<number, User>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  const fetchCurrentUser = () => {
    api.get('/api/auth/user/')
      .then(response => {
        setCurrentUserId(response.data.id)
      })
      .catch(error => {
        console.error("Error fetching current user:", error)
      });
  };

  const fetchUserDetails = (userIds: number[]) => {
    const uniqueIds = [...new Set(userIds)]
    
    Promise.all(uniqueIds.map(id => 
      api.get(`/api/auth/user/${id}/`)
        .then(response => ({ id, userData: response.data }))
    ))
    .then(results => {
      const usersData: Record<number, User> = {}
      results.forEach(({ id, userData }) => {
        usersData[id] = userData;
      })
      setUsers(usersData)
    })
    .catch(error => {
      console.error("Error fetching user details:", error)
    })
  }

  const fetchMessages = () => {
    setLoading(true);
    api.get('/api/auth/messageview/')
      .then(response => {
        const messageData = response.data
        setMessages(messageData)
        
        const userIds = messageData.flatMap((msg: Message) => [msg.user_id_1, msg.user_id_2])
        fetchUserDetails(userIds)
        
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching messages:", error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchCurrentUser()
    fetchMessages()
  }, [])

  const isMessageFromCurrentUser = (message: Message) => {
    return message.user_id_1 === currentUserId
  }

  const getOtherUserId = (message: Message) => {
    return isMessageFromCurrentUser(message) ? message.user_id_2 : message.user_id_1
  }

  const getUserName = (userId: number) => {
    const user = users[userId]
    if (!user) return `User ${userId}`
    return user.profile_name
  }

  // Group messages by conversation partner
  const groupedMessages: Record<string, Message[]> = {}
  messages.forEach(message => {
    const otherUserId = getOtherUserId(message)
    const key = otherUserId.toString()
    
    if (!groupedMessages[key]) {
      groupedMessages[key] = []
    }
    groupedMessages[key].push(message)
  })

  if (loading && messages.length === 0) {
    return <div className="flex justify-center p-8">Loading messages...</div>
  }

  return (
    <>
    <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
      <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9d] hover:text-blue-600 transition-colors">
          <Link className="text-2xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/profile" aria-label="Back to Profile">
              <h1>← Back</h1>
          </Link>

      </header>
  </nav>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      {messages.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          No messages yet.
        </div>
      ) : (
        Object.keys(groupedMessages).map(userId => {
          const conversationMessages = groupedMessages[userId]
          const otherUserId = parseInt(userId)
          
          return (
            <div key={userId} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#0c2b9d] text-white p-3">
                <h2 className="font-semibold">
                  {getUserName(otherUserId)}
                </h2>
              </div>
              
              <div className="p-4 max-h-80 overflow-y-auto">
                {conversationMessages.sort((a, b) => 
                  new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(message => (
                    <div key={message.id} className={`mb-3 flex ${isMessageFromCurrentUser(message) ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                          isMessageFromCurrentUser(message) 
                            ? 'bg-[#0c2b9d] text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.message}</p>
                        <p className={`text-xs mt-1 ${isMessageFromCurrentUser(message) ? 'text-blue-100' : 'text-gray-500'}`}>
                          {new Date(message.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="border-t p-3">
                <form onSubmit={(e) => {

                  e.preventDefault()

                  const messageInput = e.currentTarget.elements.namedItem('message') as HTMLInputElement

                  if (messageInput && messageInput.value.trim()) {
                    api.post('/api/auth/messagesend/', {
                      user_id_1: currentUserId,
                      user_id_2: otherUserId,
                      message: messageInput.value.trim()
                    })
                    .then(() => {
                      messageInput.value = ''
                      fetchMessages()
                    })
                    .catch(error => {
                      console.error("Error sending message:", error)
                    })
                  }
                }}>
                  <div className="flex">
                    <input 
                      type="text"
                      name="message" 
                      placeholder="Type a message..." 
                      className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      type="submit"
                      className="bg-[#0c2b9d] text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        })
      )}
    </div>
    </>
  )
}
