'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getRequest, postRequest } from '@/utils/axios';
import { appendMessage } from '@/store/features/utils';
import { acceptApplication, fetchNotificationTable, fetchNotificationTableAdmin } from '@/store/features/notification';
import { unwrapResult } from '@reduxjs/toolkit';
import { EventBusy } from '@mui/icons-material';

interface Props {
    search_url?: string;
}

const NotificationTable = ({ search_url }: Props) => {
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
    // console.log(user?.id, "ooooo")
    useEffect(()=>{
        if(user?.id){
            if(user?.role.role_id =='admin')
                dispatch(fetchNotificationTableAdmin(user?.id))
            else if(user?.role.role_id =='teacher')
                dispatch(fetchNotificationTable(user?.id))
        }
    },[dispatch, user])


    const handleAccept = async(id:number) => {
        console.log(`Accepted: ${id}`);
        try {
            // Dispatch the acceptApplication thunk and wait for it to resolve
            const resultAction = await dispatch(acceptApplication(id));
    
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
            <TableContainer component={Paper}>
                {result.data.length>0 ? 
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>番号</TableCell>
                        <TableCell>名前</TableCell>
                        <TableCell>言語を選択</TableCell>
                        <TableCell>第1希望日</TableCell>
                        <TableCell>第1希望時間帯</TableCell>
                        <TableCell>第2希望日</TableCell>
                        <TableCell>第2希望時間帯</TableCell>
                        <TableCell>状態</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {result.data.map((row, index) => (
                        <TableRow
                        key={row.id}
                        sx={{
                            backgroundColor: row.is_read == 0 ? 'rgba(255, 0, 0, 0.1)' : 'inherit', // Light red background for unread rows
                            position: 'relative',
                        }}
                        >
                            <TableCell>{row.is_read == 0 && (
                                <Box
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    left: 2,
                                    top: '2%',
                                    transform: 'translateY(-50%) rotate(-15deg)', // Slanted "NEW" label
                                    backgroundColor: '#ff1744',
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
                            )}<Box>{index + 1}</Box></TableCell>
                            <TableCell
                                sx={{
                                fontWeight: row.is_read == 0 ? 'bold' : 'normal', // Bold text for unread rows
                                }}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell>{row.major}</TableCell>
                            <TableCell>{row.first_date}</TableCell>
                            <TableCell>{row.first_time}</TableCell>
                            <TableCell>{row.second_date}</TableCell>
                            <TableCell>{row.second_time}</TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleAccept(row.id)}
                                sx={{ marginRight: 1 }}
                                disabled={row.is_accepted ? true : false}
                                >
                                応募
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                :
                <Box sx={{ textAlign: 'center', padding: 4 }}>
                    <EventBusy sx={{ fontSize: '4rem', color: '#5d5c68' }} />
                    <Typography variant="h3" sx={{ color: '#5d5c68', mt: 2 }}>
                        スケジュールはありません。
                    </Typography>
                </Box>
                }
                </TableContainer>

            {/* <UserAnalysisDialog userId={currentUserId} onClose={() => setCurrentUserId(null)} /> */}
        </>
    );
};

export default NotificationTable;
