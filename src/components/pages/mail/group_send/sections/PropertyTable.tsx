import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/mail';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const PropertyTable = () => {
    const dispatch = useAppDispatch();

    const shared_data = useAppSelector(state => state.shared_data);

    return (
        <div className='w-full'>
            <h2 className='font-bold text-lg'>顧客属性</h2>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableBody>
                        {shared_data.property_data.map(property => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={0} key={property.id}>
                                    <TableCell>{property.id}</TableCell>
                                    <TableCell className='w-full'>
                                        {property.name}

                                        <span className='ml-3'>( {property.customer_cnt}人 )</span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    setCurrentItemValue({
                                                        group: property,
                                                        group_type: 'property',
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

export default PropertyTable;
