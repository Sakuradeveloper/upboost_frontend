import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/mail';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const StatusTable = () => {
    const dispatch = useAppDispatch();
    const shared_data = useAppSelector(state => state.shared_data);

    return (
        <div className='w-full'>
            <h2 className='font-bold text-lg'>顧客状況</h2>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableBody>
                        {shared_data.status_data.map(status => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={0} key={status.id}>
                                    <TableCell>{status.id}</TableCell>
                                    <TableCell className='w-full'>
                                        {status.name}
                                        <span className='ml-3'>( {status.customer_cnt}人 )</span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    setCurrentItemValue({
                                                        group: status,
                                                        group_type: 'status',
                                                        open: true
                                                    })
                                                )
                                            }
                                        >
                                            <span className='whitespace-nowrap'>選択する</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StatusTable;
