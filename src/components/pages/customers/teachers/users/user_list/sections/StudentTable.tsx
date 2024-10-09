import { useAppDispatch, useAppSelector } from '@/store/hooks';
import moment from 'moment';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const StudentTable = () => {
    // const filter = useAppSelector(state => state.user.items.filter);
    const result = useAppSelector(state => state.student.items.result);

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                        <TableCell style={{ minWidth: 100 }}>氏名</TableCell>
                        <TableCell>メールアドレス</TableCell>
                        {/* <TableCell style={{ minWidth: 150 }}>電話番号</TableCell>
                        <TableCell style={{ minWidth: 100 }}>権限</TableCell>
                        <TableCell style={{ minWidth: 100 }}>状況</TableCell>
                        <TableCell>登録日時</TableCell> */}
                        <TableCell style={{ minWidth: 100 }}>進捗状況</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result?.data.map(student => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <Link href={`/teachers/progress/?student=${student.id}&&teacher=${student.teacher_id}`}>
                                        <Button variant="contained" color="primary">
                                            進捗状況
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {result.data.length === 0 && (
                        <TableRow className='h-[100px]'>
                            <TableCell colSpan={8} align='center'>
                                <div className='w-full flex flex-col items-center justify-center gap-3'>
                                    <FolderOpenIcon sx={{ fontSize: 100 }} className='text-[#697586]' />

                                    <p>
                                        該当するデータが見つかりませんでした。
                                        <br />
                                        検索条件を変更して再度検索してください。
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentTable;
