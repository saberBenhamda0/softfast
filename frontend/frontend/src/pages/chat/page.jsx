import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import { useSentGetMessagesQuery } from '../../services/general_api';
import send_symbole from '/icons/send_symbole.svg'
import {jwtDecode} from 'jwt-decode'
import { useSendGetConversationsForUserQuery } from '../../services/general_api';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
  const { access } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  if (!access){
    navigate("/login")
  }

  const location = useLocation()

  const ws = useRef(null);

  const [input, setInput] = useState('');
  const [clicked, setClicked] = useState(false);
  const [listMessages , setListMessages] = useState([])
  const [participant, setParticipant] = useState("")
  const [profilePicture, setProfilePicture] = useState("")

  const USER_ID = jwtDecode(access).user_id
  const PROFILE_PICTURE = jwtDecode(access).profile_picture
  
  const {data:conversations, refetch } = useSendGetConversationsForUserQuery()
  
  useEffect(() => {
    refetch()
  }, [refetch])
  

  const handleSendMessage = () => {

    let sent_message = JSON.stringify({ type: 'chat_message', messages: input, sender: USER_ID, receiver:participant, sender_profile_picture:PROFILE_PICTURE })
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(sent_message);
      setInput('');
    } else {
      console.log('WebSocket is not open.');
    }
  };

  useEffect(() => {
    if (clicked && PROFILE_PICTURE) {
      handleSendMessage();
      setClicked(false); // Reset clicked state after sending

    }
  }, [clicked]);

  useEffect(() => {
    ws.current = new WebSocket('ws://127.0.0.1:8000/ws/socket-server/');

    ws.current.onopen = () => {
      console.log('The connection established');
    };

    ws.current.onclose = () => {
      console.log('The connection is closed');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
        if (data.message !== "chfiha zbo lol") {
          setListMessages(prevListMessages => [...prevListMessages, { type: 'chat_message', messages: data.message, sender:data.sender, receiver:data.receiver, sender_profile_picture:PROFILE_PICTURE }])

        }
      
    };


    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    setProfilePicture(PROFILE_PICTURE)
  }, [profilePicture])
  

  const ReceiverMessageComponent = ( {receiver_profile_image, message} )=> {

    return(
        <div className='w-full h-20 ml-10 '>
        <div 
    className='flex flex-row-reverse items-center justify-start w-full h-full px-10 '>
            <img className='w-10 h-10 rounded-full ' src={`http://127.0.0.1:8000/media/${receiver_profile_image}`} />
            <div className='w-2/6  min-h-12  text-white rounded-2xl bg-[#6E8BF0]'>
              <p className='w-full h-full mx-3 mt-1 break-all '>
              {message}
              </p>
            </div>
        </div>
        </div>
    )
}

  const SenderMessageComponent = ( {sender_profile_image, message} )=> {
    return(
        <div className='w-full h-20 '>
        <div 
    className='flex flex-row items-center w-full h-full mx-10 '>
            <img className='w-10 h-10 rounded-full 'src={`http://127.0.0.1:8000/media/${sender_profile_image}`} />
            <div className='w-2/6  min-h-12  text-black rounded-2xl bg-[#E8ECFE]'>
              <p className='w-full h-full mx-3 mt-1 break-all '>
              {message}
              </p>
            </div>
        </div>
        </div>
    )
}

const ChatHistoryCard = ({index, username, id, profile_image}) => {
  const [sent, setSent] = useState(false)
  const { data: list2 } = useSentGetMessagesQuery(id);

  // Use useEffect to set listMessages when `sent` is true and `list2` has data
  useEffect(() => {
    if (sent && list2) {
      setListMessages(list2);
      setParticipant(username)
      setSent(false)
    }
  }, [sent, list2]); 
  
return(
  <div onClick={()=>setSent(!sent)}  key={index} className='flex flex-row w-10/12 mt-8 hover:bg-[#E3E3E3] border-2 border-solid border-[#E3E3E3] h-28 rounded-2xl'>
  <div className='flex flex-col items-center justify-center h-full '>
      <img className='w-10 h-10 ml-6 rounded-full' src={`http://127.0.0.1:8000/media/${profile_image}`} width={10} height={10} />
  </div>
  <div className='flex flex-col w-full h-full'>

  <div className='flex flex-row items-start justify-between w-full h-full '>
      <h3 className='mt-2 ml-5 font-bold text-black '>{username}</h3>
      <p className='mt-2 mr-5 text-gray-500'>4:33PM</p>
  </div>
  <p className='mb-5 ml-5 overflow-hidden text-gray-400'>
      click to see messages 
  </p>
  </div>
</div>
)
}


  
  return  (
    <div className='flex flex-row w-full min-h-screen '>
        <Navbar />
        <div className='w-1/6 mt-16 border-solid flex flex-col items-center border-r-2 border-[#AFAFAF] h-screen '>
          {conversations && conversations.map((conversation, index)=> {
            const id = conversation.first_user === USER_ID ? conversation.second_user : conversation.first_user
            return(
              <ChatHistoryCard profile_image={conversation.contact_profile_picture} index={index} username={conversation.contact_username} id={id} />
            )
          })}
        </div>
        <div className='relative flex flex-col w-5/6 mt-20 mb-40 '>
          {listMessages && listMessages?.map((message, index)=> {

            return(
              <div  key={index}>
                {message?.sender === USER_ID ?
              <ReceiverMessageComponent receiver_profile_image={profilePicture} message={message?.messages} />
                :
              <SenderMessageComponent sender_profile_image={profilePicture}  message={message?.messages} />
              }

              </div>
            )
          })}


            <div className='fixed w-[80%] bg-gray-200 h-20 rounded-2xl flex flex-row items-center justify-between bottom-2 right-4'>
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} className='w-11/12 pl-6 ml-5 bg-gray-200 rounded-2xl h-3/4' placeholder='entre your message ... '/>
                <img src={send_symbole}  onClick={()=> handleSendMessage()} className='w-10 h-10 mr-8 ' />
            </div>
        </div>

    </div>
  );
};

export default Chat;
