import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { IoSend } from 'react-icons/io5';

const ChatContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f6f9',
  borderRadius: theme.spacing(2),
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

const ChatBody = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));

const ChatFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const MessageBubble = styled(Box)<{ isOutgoing: boolean }>(({ theme, isOutgoing }) => ({
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  maxWidth: '70%',
  wordBreak: 'break-word',
  borderRadius: theme.spacing(2),
  backgroundColor: isOutgoing ? theme.palette.primary.main : theme.palette.grey[200],
  color: isOutgoing ? '#fff' : '#000',
  alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    [isOutgoing ? 'right' : 'left']: -8,
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: `8px solid ${isOutgoing ? theme.palette.primary.main : theme.palette.grey[200]}`,
  },
}));

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string; timestamp: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    const chatRoom = "example_chat_room"; // Replace this with the actual room name or dynamic value
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${chatRoom}/`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socketRef.current && inputMessage.trim()) {
      const messageData = {
        message: inputMessage,
        sender: 'You', // This should be dynamic based on logged-in user
        timestamp: new Date().toLocaleTimeString(),
      };
      socketRef.current.send(JSON.stringify(messageData));
      setInputMessage('');
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <Avatar src="https://via.placeholder.com/150" />
        <Box ml={2}>
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2">Online</Typography>
        </Box>
      </ChatHeader>

      <ChatBody ref={chatBodyRef}>
        {messages.map((message, index) => (
          <Grid container key={index} justifyContent={message.sender === 'You' ? 'flex-end' : 'flex-start'}>
            <Grid item xs={12} sm={8} md={6}>
              <MessageBubble isOutgoing={message.sender === 'You'}>
                <Typography>{message.text}</Typography>
                <Typography variant="caption" display="block" mt={1} align="right">
                  {message.timestamp}
                </Typography>
              </MessageBubble>
            </Grid>
          </Grid>
        ))}
      </ChatBody>

      <ChatFooter>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent default newline behavior
                  handleSendMessage(e);
                }
              }}
              sx={{
                flex: 1,
                backgroundColor: '#f7f7f7',
                borderRadius: '25px',
                '& .MuiOutlinedInput-root': {
                  padding: '8px',
                },
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
