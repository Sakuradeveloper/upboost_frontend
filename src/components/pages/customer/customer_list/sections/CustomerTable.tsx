import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UserAnalysisDialog from '../components/UserAnalysisDialog';
import SorterItem from '../components/SorterItem';

interface Props {
    search_url?: string;
}

const CustomerTable = ({ search_url }: Props) => {
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>
                                <SorterItem
                                    label='ID'
                                    value='id'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='広告媒体'
                                    value='ads'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='名前'
                                    value='name'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='電話番号'
                                    value='phone'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 130 }}>
                                <SorterItem
                                    label='メールアドレス'
                                    value='email'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            {user?.role.role_id == 'admin' && (
                                <TableCell style={{ minWidth: 100 }}>
                                    <SorterItem
                                        label='担当者'
                                        value='manager__user_info__name'
                                        current={filter.order_by}
                                        onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                    />
                                </TableCell>
                            )}
                            <TableCell style={{ minWidth: 120 }}>
                                <SorterItem
                                    label='入金日'
                                    value='deposit_date'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 120 }}>
                                <SorterItem
                                    label='契約開始日'
                                    value='contract_start_date'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='契約日数'
                                    value='contract_days'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='有効日数'
                                    value='valid_days'
                                    current={filter.order_by}
                                    onClick={() => {}}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='属性'
                                    value='property__name'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 120 }}>
                                <SorterItem
                                    label='ステータス'
                                    value='status__name'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 140 }}>
                                <SorterItem
                                    label='システム提供'
                                    value='system_provided'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='登録日'
                                    value='created_at'
                                    current={filter.order_by}
                                    onClick={sort => dispatch(setFilterValue({ order_by: sort }))}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.data.map(customer => {
                            let valid_days = 0;
                            if (customer.contract_start_date && customer.contract_days) {
                                valid_days = moment(customer.contract_start_date)
                                    .add(customer.contract_days, 'days')
                                    .diff(moment(), 'days');

                                if (valid_days < 0) valid_days = 0;
                            } else {
                                valid_days = 0;
                            }

                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={customer.id}
                                    className=' hover:cursor-pointer'
                                    onClick={() => router.push(`/customers/${customer.id}?${search_url}`)}
                                >
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.ads}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer?.name}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    {user?.role.role_id == 'admin' && (
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            <Button
                                                color='secondary'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setCurrentUserId(customer.manager.id);
                                                }}
                                            >
                                                {customer.manager.name}
                                            </Button>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {customer?.deposit_date
                                            ? moment(customer?.deposit_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        {customer?.contract_start_date
                                            ? moment(customer?.contract_start_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        {customer.contract_days > 0 ? `${customer.contract_days}日` : ''}
                                    </TableCell>
                                    <TableCell>{valid_days > 0 ? `${valid_days}日` : ''}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer.property?.name}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer.status?.name}</TableCell>
                                    <TableCell>{customer.system_provided ? 'OK' : 'NG'}</TableCell>
                                    <TableCell>{moment(customer?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                    <TableCell>
                                        <Link href={`/customers/${customer.id}?${search_url}`} color='secondary'>
                                            編集
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {result.data.length === 0 && (
                            <TableRow className='h-[100px]'>
                                <TableCell colSpan={user?.role.role_id == 'admin' ? 15 : 14} align='center'>
                                    <div className='w-full flex flex-col items-center justify-center gap-3'>
                                        <FolderOpenIcon sx={{ fontSize: 100 }} className='text-[#697586]' />

                                        <p>
                                            顧客情報が見つかりませんでした。
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

            <UserAnalysisDialog userId={currentUserId} onClose={() => setCurrentUserId(null)} />
        </>
    );
};

export default CustomerTable;
