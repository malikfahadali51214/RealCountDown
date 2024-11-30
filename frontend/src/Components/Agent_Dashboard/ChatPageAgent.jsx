import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Avatar, Badge, Paper, Tooltip, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
import Navbar from './Navbar'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  shadows: Array(25).fill('none').map((_, index) => index === 2 ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none')
});

const CenteredWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingTop: '180px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90vw',
  height: '80vh',
  backgroundColor: theme.palette.background.default,
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '10px',
  marginBottom: '20px',
  boxShadow: theme.shadows[2],
  width: '100%',
  height: '87vh',
  maxWidth: '1200px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  },
}));

const MainChatArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '8px',
  '@media (max-width: 600px)': {
    padding: '8px',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '250px',
  height:'599px',
  marginTop:'8px',
  marginLeft:'7px',
  backgroundColor: theme.palette.background.paper,
  padding: '16px',
  borderRadius:'8px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: 'auto',
  '@media (max-width: 600px)': {
    display: 'none',
  },

  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0)',

}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  marginBottom: '16px',
  border: `1px solid ${theme.palette.divider}`,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: '16px',

  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0)',

}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  gap: '8px',
  border: `1px solid ${theme.palette.divider}`,
}));


const MessageItem = styled(ListItem)(({ theme, sender }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: '12px',
  padding: '12px',
  borderRadius: '12px',
  background: (sender === 'user')
      ? `linear-gradient(135deg, #ffffff,${theme.palette.primary.light})`
      : `linear-gradient(135deg, #06b6d4,#ffffff)`,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  maxWidth: '100%',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
}));

const Timestamp = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  marginTop: '4px',
}));

const ActionIcons = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginLeft: '8px',
  alignItems: 'center',
});

const AgentListItem = styled(ListItem)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.light : theme.palette.background.paper,
  borderRadius: '8px',
  marginBottom: '8px',
  border: selected ? `2px solid ${theme.palette.primary.light}` : 'none',  // Border added
  boxShadow: selected ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : '0px 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.light : theme.palette.action.hover,
    boxShadow: selected ? '0px 6px 15px rgba(0, 0, 0, 0.15)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.02)',
  },
  '& .MuiAvatar-root': {
    width: '40px',
    height: '40px',
  },
  '& .MuiListItemText-primary': {
    color: theme.palette.text.primary,
  },
}));

const EmojiPicker = ({ onSelectEmoji }) => {
  // Example of emoji picker component (replace with your preferred library/component)
  const emojis = ['😀', '😂', '😍', '🎉', '👍', '❤️', '👋'];

  return (
    <Paper elevation={3} style={{ position: 'absolute', bottom: '70px', right: '750px', zIndex: '9999', marginBottom:'45px' }}>
      <Divider />
      <Box style={{ display: 'flex', flexWrap: 'wrap', padding: '8px' }}>
        {emojis.map(emoji => (
          <Typography key={emoji} style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => onSelectEmoji(emoji)}>
            {emoji}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

const ChatPage = () => {
  const agents = [
    { id: 1, name: 'Qasid', avatar: 'https://shorturl.at/XZ5VP' },
    { id: 2, name: 'Usama', avatar: 'https://shorturl.at/XZ5VP' },
    { id: 3, name: 'Ahmad', avatar: 'https://shorturl.at/iqz83' },
  ];

  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'other', time: new Date(), reactions: {} },
    { text: 'I am looking for a property in downtown.', sender: 'user', time: new Date(), reactions: {} },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [
        ...messages,
        { text: newMessage, sender: 'user', time: new Date(), reactions: {} },
      ];

      setMessages(updatedMessages);
      setNewMessage('');

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sure, I have some options for you.', sender: 'other', time: new Date(), reactions: {} },
        ]);
      }, 1000);
    }
  };

  const handleAddReaction = (message, reaction) => {
    setMessages(messages.map((msg) =>
      msg === message
        ? {
            ...msg,
            reactions: {
              ...msg.reactions,
              [reaction]: (msg.reactions[reaction] || 0) + 1,
            },
          }
        : msg
    ));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([...messages, { text: URL.createObjectURL(file), sender: 'user', time: new Date(), reactions: {}, type: 'image' }]);
    }
  };

  const toggleEmojiKeyboard = () => {
    setShowEmojiKeyboard(!showEmojiKeyboard);
  };

  const handleSelectEmoji = (emoji) => {
    if (emoji) {
      setNewMessage(prevMessage => prevMessage + emoji);
    }
    setShowEmojiKeyboard(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.background.default,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            padding: '20px',
          }}
        >
          <CenteredWrapper>
            <ChatContainer>
              <Sidebar>
                <Typography 
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.7rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '10px',
                  }}
                >
                  Inbox
                </Typography>
                <List>
                  {agents.map((agent) => (
                    <AgentListItem
                      button
                      key={agent.id}
                      selected={selectedAgent.id === agent.id}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <Avatar alt={agent.name} src={agent.avatar} />
                      <ListItemText primary={agent.name} sx={{ marginLeft: '16px' }} />
                    </AgentListItem>
                  ))}
                </List>
              </Sidebar>
              <MainChatArea>
                <Header>
                  <Box display="flex" alignItems="center">
                    <Badge color="success" variant="dot">
                      <Avatar alt={selectedAgent.name} src={selectedAgent.avatar} />
                    </Badge>
                    <Typography variant="h6" marginLeft="8px">
                      {selectedAgent.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Online
                    </Typography>
                  </Box>
                </Header>
                <MessagesContainer>
                  <List>
                    {messages.map((message, index) => (
                      <MessageItem
                        key={index}
                        sender={message.sender}
                      >
                        <Box display="flex" alignItems="center" flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}>
                          {message.type === 'image' ? (
                            <img

                            />
                          ) : (
                            <ListItemText primary={message.text} sx={{ margin: message.sender === 'user' ? '0 0 0 12px' : '0 12px 0 0' }} />
                          )}
                          <ActionIcons>
                            <Tooltip title="Like">
                              <IconButton size="small" onClick={() => handleAddReaction(message, 'like')}>
                                <ThumbUpIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </ActionIcons>
                        </Box>
                        <Timestamp>{formatDistanceToNow(new Date(message.time), { addSuffix: true })}</Timestamp>
                      </MessageItem>
                    ))}
                    <div ref={messagesEndRef} />
                  </List>
                </MessagesContainer>
                <MessageInputContainer>
                  <IconButton component="label">
                    <AttachFileIcon />
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  </IconButton>
                  <IconButton onClick={toggleEmojiKeyboard}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                  {showEmojiKeyboard && (
                    <EmojiPicker onSelectEmoji={handleSelectEmoji} />
                  )}
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </MessageInputContainer>
              </MainChatArea>
            </ChatContainer>
          </CenteredWrapper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatPage;
