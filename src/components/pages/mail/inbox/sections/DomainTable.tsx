import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/mail_inbox';

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const DomainTable = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.domain.items.filter);
    const result = useAppSelector(state => state.domain.items.result);

    const handleRowClick = (domain: string) => {
        dispatch(setFilterValue({ domain: domain }));
    };

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                    {result.data.map(domain => {
                        return (
                            <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                key={domain.id}
                                className=' cursor-pointer'
                                onClick={() => handleRowClick(domain.username)}
                            >
                                <TableCell className='min-w-[50px]'>{domain.id}</TableCell>
                                <TableCell className='w-full'>
                                    <Link color='secondary'>{domain.username}</Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {result.data.length === 0 && (
                        <TableRow className='h-[100px]'>
                            <TableCell colSpan={2} align='center'>
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

export default DomainTable;
