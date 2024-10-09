import { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/system';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers, reset, setFilterValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import { fetchUsers } from '@/store/features/user';
import { useAuth } from '@/contexts/AuthContext';
import { Box } from '@mui/material';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';
import { fetchStudent } from '@/store/features/student';
import ChatRoom from './ChatRoom';
import UserList from './UserList';
import { Student, Teacher } from '@/interfaces';

const ChatList = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<Teacher>();
  console.log("selectedUser : ",selectedUser)

  return (
    <ChatContainer>
      <UserListWrapper>
        <UserList selectedUser = {selectedUser} setSelectedUser={setSelectedUser} />
      </UserListWrapper>
      <ChatRoomWrapper>
        {user?.id && <ChatRoom selectedUser={selectedUser} roomName={`${user?.id}${selectedUser?.user_id}`} />}
      </ChatRoomWrapper>
    </ChatContainer>
  );
};

export default ChatList;

const ChatContainer = styled('div')({
    display: 'flex',
    height: '70vh',
    width: '100%',
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    overflow: 'hidden'
  });

const UserListWrapper = styled('div')({
  width: '15%', 
  borderRight: '1px solid #ddd',
  padding: '16px',
  overflowY: 'auto',
});

const ChatRoomWrapper = styled('div')({
  width: '85%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  overflowY: 'auto',
});