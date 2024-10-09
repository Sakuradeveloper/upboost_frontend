'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Tooltip } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getRequest, postRequest } from '@/utils/axios';
import { appendMessage } from '@/store/features/utils';
import { acceptApplication, allowApplication, fetchNotificationTable, fetchNotificationTableAdmin } from '@/store/features/notification';
import { unwrapResult } from '@reduxjs/toolkit';

import { styled } from '@mui/material/styles';
interface Props {
    search_url?: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.divider}`,
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: 80,
    margin: theme.spacing(0.5),
  }));

const NotificationTableAdmin = ({ search_url }: Props) => {
    const { user, setPending, refresh } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const filter = useAppSelector(state => state.customer.items.filter);
    // const result = useAppSelector(state => state.customer.items.result);
    const result = useAppSelector(state => state.notification?.items.result);

    const data = {
        id:user?.id,
        read:true
    }
    
    useEffect(()=>{
        if(user?.id){
            
            if(user?.role.role_id =='admin')
                dispatch(fetchNotificationTableAdmin(user?.id))
            else if(user?.role.role_id =='teacher')
                dispatch(fetchNotificationTable(user?.id))
        }
    },[dispatch, user])


    const handleAllowed = async(id:number) => {
        console.log(`Accepted: ${id}`);
        try {
            // Dispatch the acceptApplication thunk and wait for it to resolve
            const resultAction = await dispatch(allowApplication(id));
    
            // Unwrap the result to access the actual payload or throw an error if it failed
            const response = unwrapResult(resultAction);
            
            // After successfully unwrapping, dispatch a success message
            dispatch(appendMessage({ type: 'success', message: '管理者が承認するまでお待ちください。' }));
    
            // Optionally, check specific data conditions here
            // if (response.data) {
            //     console.log(response.data, "__________________________+++++++++++++++++")
            //     // Do something with the response data if needed
            // }
    
        } catch (error) {
            console.error('Error during accept request:', error);
            // Handle any errors here, optionally dispatch an error action
            dispatch(appendMessage({ type: 'error', message: 'An error occurred while processing your request.' }));
        } finally {
            // Reset the pending state or loading state
            // setPending!(false);
        }
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table aria-label="enhanced table">
        <TableHead>
          {/* First Row: Dividing Student and Teacher Sections */}
          <TableRow>
            <StyledTableCell colSpan={4} align="center">
              学生情報
            </StyledTableCell>
            <StyledTableCell colSpan={4} align="center">
              先生情報
            </StyledTableCell>
            <StyledTableCell rowSpan={2} align="center" sx={{ backgroundColor: '#e8eaf6' }}>
              承認
            </StyledTableCell>
          </TableRow>
          {/* Second Row: Column Headers */}
          <TableRow>
            <StyledTableCell>申請者名前</StyledTableCell>
            <StyledTableCell>申請者メール</StyledTableCell>
            <StyledTableCell>言語を選択</StyledTableCell>
            <StyledTableCell>希望時間帯</StyledTableCell>
            <StyledTableCell>先生名前</StyledTableCell>
            <StyledTableCell>先生メール</StyledTableCell>
            <StyledTableCell>言語を選択</StyledTableCell>
            <StyledTableCell>希望時間帯</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.data.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor: row.is_admin_read === 0 ? '#fff3e0' : 'inherit', // Light orange background for unread rows
                position: 'relative',
                '&:hover': {
                  backgroundColor: '#f1f1f1', // Add hover effect for better UX
                },
              }}
            >
              <TableCell>
                {row.is_admin_read === 0 && (
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      left: 2,
                      top: '50%',
                      transform: 'translateY(-50%) rotate(-15deg)', // Slanted "NEW" label
                      backgroundColor: '#ff5722',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      animation: 'blinker 1.5s linear infinite', // Blinking animation
                      zIndex: 1,
                    }}
                  >
                    NEW
                  </Box>
                )}
                <Box sx={{ fontWeight: row.is_admin_read === 0 ? 'bold' : 'normal' }}>
                  {row.name}
                </Box>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.major}</TableCell>
              <TableCell>{`${row.first_date}`}<br/>{`${row.first_time}`}</TableCell>
              <TableCell>{row.teacher_name}</TableCell>
              <TableCell>{row.teacher_email}</TableCell>
              <TableCell>{row.teacher_major}</TableCell>
              <TableCell>{row.is_accepted ? '適用済み' : '適用されない'}</TableCell>
              <TableCell>
                <Tooltip title={row.is_allowed ? 'Already Accepted' : 'Accept'}>
                  <StyledButton
                    variant="contained"
                    color="success"
                    onClick={() => handleAllowed(row.id)}
                    disabled={row.is_allowed}
                  >
                    承認
                  </StyledButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            {/* <UserAnalysisDialog userId={currentUserId} onClose={() => setCurrentUserId(null)} /> */}
        </>
    );
};

export default NotificationTableAdmin;
