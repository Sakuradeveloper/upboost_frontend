import { useEffect } from 'react';
import { getRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItem } from '@/store/features/user_analysis';
import { setFilterValue } from '@/store/features/customer';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Props {
    userId: number | null;
    onClose: () => void;
}

const UserAnalysisDialog = ({ userId, onClose }: Props) => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.user_analysis.item.form);

    useEffect(() => {
        if (userId != null) fetchData();
    }, [userId]);

    const fetchData = async () => {
        const res = await getRequest(`v0/analysis/${userId}`);
        if (res.status == 200) {
            dispatch(setCurrentItem(res.data));
        }
    };

    const handleRowClick = (id: number) => {
        dispatch(setFilterValue({ manager: userId, status: id, keyword: '', page: 1, property: 0, enable: true }));
        onClose();
    };

    return (
        <Dialog open={userId != null} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle sx={{ fontSize: 14, fontWeight: 700 }}>
                担当 - <span color='secondary'>{currentItem.name}</span>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: 150 }}>#</TableCell>
                                <TableCell style={{ width: '100%' }}>件数</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                className=' cursor-pointer'
                                onClick={() => handleRowClick(0)}
                            >
                                <TableCell>登録数</TableCell>
                                <TableCell>{currentItem.total} 件</TableCell>
                            </TableRow>
                            {currentItem.analysis.map((analysis, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role='checkbox'
                                        tabIndex={-1}
                                        key={index}
                                        className=' cursor-pointer'
                                        onClick={() => handleRowClick(analysis.id)}
                                    >
                                        <TableCell>{analysis.name}</TableCell>
                                        <TableCell>{analysis.count} 件</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button autoFocus color='secondary' onClick={onClose}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserAnalysisDialog;
