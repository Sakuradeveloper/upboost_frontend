import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const DomainTable = () => {
    const router = useRouter();

    const shared_data = useAppSelector(state => state.shared_data);

    const handleRowClick = (domain: string) => {
        router.push(`/mail/inbox/domain/${domain}`);
    };

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                    {shared_data.domain_data.map(domain => {
                        return (
                            <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                key={domain.id}
                                className=' cursor-pointer'
                                onClick={() => handleRowClick(domain.name)}
                            >
                                <TableCell className='min-w-[50px]'>{domain.id}</TableCell>
                                <TableCell className='w-full'>
                                    <Link color='secondary'>{domain.name}</Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {shared_data.domain_data.length === 0 && (
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
