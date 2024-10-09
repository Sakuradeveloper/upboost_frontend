import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Avatar, Grid } from '@mui/material';
import { borderRadius, display, styled } from '@mui/system';
import { IoSend } from 'react-icons/io5';
import { useAuth } from '@/contexts/AuthContext';
import { addItem, fetchChat } from '@/store/features/chat';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Student } from '@/interfaces';

const ChatContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#eef2f6',
  borderRadius: theme.spacing(2),
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'inherit',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  // borderTopLeftRadius: theme.spacing(2),
  // borderTopRightRadius: theme.spacing(2),
}));

const ChatBody = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height:'30vh',
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: 'inherit',
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));

const ChatFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  // backgroundColor: theme.palette.background.paper,
  backgroundColor: 'inherit',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// const MessageBubble = styled(Box)<{ isOutgoing: boolean }>(({ theme, isOutgoing }) => ({
//   padding: theme.spacing(1, 2),
//   marginBottom: theme.spacing(1),
//   maxWidth: '100%', // Adjust this for max width
//   minWidth: '30%', // Ensure a minimum width for shorter messages
//   wordBreak: 'break-word',
//   borderRadius: theme.spacing(2),
//   backgroundColor: isOutgoing ? theme.palette.secondary.light : theme.palette.grey[200],
//   color: isOutgoing ? '#000' : '#000',
//   alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
//   position: 'relative',
//   display: 'inline-block',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     [isOutgoing ? 'right' : 'left']: -8,
//     width: 0,
//     height: 0,
//     borderLeft: '8px solid transparent',
//     borderRight: '8px solid transparent',
//     borderBottom: `8px solid ${isOutgoing ? theme.palette.primary.light : theme.palette.grey[200]}`,
//   },
// }));

const MessageBubble = styled(Box)<{ isOutgoing: boolean, lastMessage: boolean }>(({ theme, isOutgoing, lastMessage }) => ({
  // padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  maxWidth: '100%',
  wordBreak: 'break-word',
  borderRadius: theme.spacing(2),
  // backgroundColor: isOutgoing ? theme.palette.secondary.light : theme.palette.grey[200],
  color: isOutgoing ? '#000' : '#000',
  alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
  position: 'relative',
  display: 'inline-block',
  '&::after': { 
    content: '""',
    position: 'absolute',
    // bottom: 28,
    // [isOutgoing ? 'right' : 'left']: -7,
    bottom: 0,
    [isOutgoing ? 'right' : 'left']: -7,
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: `8px solid ${isOutgoing ? '#cabae4' : '#f7f6fa'}`,
    filter: 'drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.3))'
  },

}));

interface Props {
  selectedUser: Student|undefined;
  roomName: string;
}

const ChatRoom = ({selectedUser, roomName}:Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const messages = useAppSelector(state => state.chat.items.result.data);
  // const [messages, setMessages] = useState<{ id: number; message: string; sender: number|undefined; timestamp: Date }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  console.log(selectedUser, "???????????????????????")
  useEffect(() => {
    // Replace 'chatroom' with the appropriate room name
    socketRef.current = new WebSocket(`ws://localhost:8003/ws/chat/${roomName}/`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (socketRef.current && inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        sender: user?.id,
        timestamp: new Date(),
      };

      // Send the message to the WebSocket server
      socketRef.current.send(JSON.stringify({ message: newMessage }));
      console.log("newMessage handlesendmessage : ", newMessage)
      // Update local state
      dispatch(addItem(newMessage))
      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage(''); // Clear the input field after sending
    }
  };
  return (
    <ChatContainer>
      {/* <ChatHeader>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        <Box ml={2}>
          <Typography variant="h6">{selectedUser?.name}</Typography>
          <Typography variant="body2"></Typography>
        </Box>
      </ChatHeader> */}

      <ChatBody ref={chatBodyRef}>
        {messages?.length > 0 ? (
          messages?.map((message:any, index:number, array:any) => {
            const lastMessage = array[index+1]?.sender !== array[index]?.sender;
            return (
              <Grid container key={message.id} justifyContent={message.sender === user?.id ? 'flex-end' : 'flex-start'}>
                <Grid item xs={12} sm={8} md={6} display={'flex'} justifyContent={message.sender === user?.id ? 'flex-end' : 'flex-start'} alignItems={'center'}>
                  {message.sender !== user?.id && <Avatar src={selectedUser?.avatar_url ? selectedUser?.avatar_url:"/images/users/user.svg"} sx={{marginRight:2, backgroundColor:'#8261c2', visibility:`${!lastMessage && 'hidden'}`}}/>}
                  <MessageBubble isOutgoing={message.sender === user?.id} lastMessage={lastMessage}>
                    <Typography sx={{backgroundColor:`${message.sender === user?.id ? '#cabae4' : '#f7f6fa'}`, px:2, py:1, borderRadius:2, boxShadow: 2 }}>
                      {message.message}
                    </Typography>
                    {/* {
                      lastMessage && 
                      <Typography variant="caption" display="block" mt={1} align="right">
                        {message.updated_at ? new Date(message.updated_at).toLocaleTimeString() : 'Time not available'}
                      </Typography>
                    } */}
                  </MessageBubble>
                  {message.sender === user?.id && <Avatar src={user?.avatar_url ? user?.avatar_url:"/images/users/user.svg"} sx={{marginLeft:2, backgroundColor:'#8261c2', visibility:`${!lastMessage && 'hidden'}`}}/>}
                </Grid>
              </Grid>
            )
          })
        ) : (
          // Empty state when no messages exist
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: 'grey.600' }}>
              まだメッセージはありません。
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              以下にメッセージを入力して会話を開始してください。
            </Typography>
          </Box>
        )}
      </ChatBody>

      <ChatFooter>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="メッセージを入力..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              sx={{
                flex: 1,
                marginLeft: 1,
                marginRight:1,
                // marginTop:2,
                backgroundColor: '#f7f7f7',
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={handleSendMessage}>
              <IoSend />
            </IconButton>
          </Grid>
        </Grid>
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatRoom;
