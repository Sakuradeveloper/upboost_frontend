import { FormEvent, useEffect, useState } from 'react';
import { getRequest, patchFormData, postFormdata, postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, setCurrentItem, setCurrentItemValue, setError } from '@/store/features/profile';
import { fetchRoleData } from '@/store/features/shared_data';

import { Avatar, Box, Button, MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';

const ProfileForm = () => {
    const { refresh, setPending, user } = useAuth();
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.profile.item.form);
    const errors = useAppSelector(state => state.profile.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    const [preview, setPreview] = useState<string | null>(null);

    console.log(currentItem.avatar_url, "+++++++++++++++++++++++++++++++++++++++++++")
    useEffect(() => {
        fetchProfile();
        dispatch(fetchRoleData());
    }, []);

    const fetchProfile = async () => {
        const res = await getRequest(`/profile`);
        if (res.status == 200) {
            // console.log(res.data, "===============>>>>>>>>>>>>>>>>")
            dispatch(setCurrentItem({
                email: res.data?.email||"",
                first_name: res.data?.first_name||"",
                first_name_furi: res.data?.first_name_furi||"",
                is_allowed: res.data?.is_allowed||"",
                last_name: res.data?.last_name||"",
                last_name_furi: res.data?.last_name_furi||"",
                major: res.data?.major||"",
                phone: res.data?.phone||"",
                role: res.data?.role||"",
                avatar: res.data?.avatar || "",
                avatar_url: res.data?.avatar_url || "",
            }));
        }
    };
    // console.log(user?.role.role_id, "==========>>>>>========>>>>>>>>>>")
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);
        console.log("currentItem : ", currentItem)
        const formData = new FormData();

        // Append text fields from currentItem
        if (currentItem.last_name) formData.append('last_name', currentItem.last_name);
        if (currentItem.first_name) formData.append('first_name', currentItem.first_name);
        if (currentItem.last_name_furi) formData.append('last_name_furi', currentItem.last_name_furi);
        if (currentItem.first_name_furi) formData.append('first_name_furi', currentItem.first_name_furi);
        if (currentItem.email) formData.append('email', currentItem.email);
        if (currentItem.phone) formData.append('phone', currentItem.phone);
        if (currentItem.role) formData.append('role', currentItem.role.toString());
        if (currentItem.major) formData.append('major', currentItem.major);

        // Append the avatar file if it exists
        if (currentItem.avatar) {
            formData.append('avatar', currentItem.avatar);
        }
        const res = await postFormdata(`/profile`, formData);

        if (res.status == 200) {
            dispatch(clearError());
            refresh && refresh();
        }
        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }

        setPending!(false);
    };

    return (
        <div>
            <TitleBar>アカウント情報</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>氏名</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.last_name}
                                onChange={e => dispatch(setCurrentItemValue({ last_name: e.target.value }))}
                                error={errors.last_name ? true : false}
                                helperText={errors.last_name ? errors.last_name : ''}
                            />
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.first_name}
                                onChange={e => dispatch(setCurrentItemValue({ first_name: e.target.value }))}
                                error={errors.first_name ? true : false}
                                helperText={errors.first_name ? errors.first_name : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>氏名(ふりがな)</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.last_name_furi}
                                onChange={e => dispatch(setCurrentItemValue({ last_name_furi: e.target.value }))}
                                error={errors.last_name_furi ? true : false}
                                helperText={errors.last_name_furi ? errors.last_name_furi : ''}
                            />
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.first_name_furi}
                                onChange={e => dispatch(setCurrentItemValue({ first_name_furi: e.target.value }))}
                                error={errors.first_name_furi ? true : false}
                                helperText={errors.first_name_furi ? errors.first_name_furi : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.email}
                                onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>電話番号</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.phone}
                                onChange={e => dispatch(setCurrentItemValue({ phone: e.target.value }))}
                                error={errors.phone ? true : false}
                                helperText={errors.phone ? errors.phone : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    {/* {user?.role.role_id == 'admin' && (
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>権限</FormLabel>
                            <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                                <Select
                                    fullWidth
                                    size='small'
                                    value={currentItem.role}
                                    onChange={e => dispatch(setCurrentItemValue({ role: e.target.value }))}
                                    readOnly
                                >
                                    {shared_data.role_data.map(role => {
                                        return(
                                        <MenuItem value={role.id} key={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    )})}
                                </Select>
                            </div>
                        </div>
                    )} */}
                     {user?.role.role_id == 'teacher' && ( 
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>権限</FormLabel>
                            <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                                <Select
                                    fullWidth
                                    size='small'
                                    value={currentItem.major}
                                    onChange={e => dispatch(setCurrentItemValue({ major: e.target.value }))}
                                >
                                    {/*{shared_data.role_data.map(role => {
                                        return(
                                        <MenuItem value={role.id} key={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    )})}*/}
                                    <MenuItem value={" 標準語(北部弁)"}>
                                        標準語(北部弁)
                                    </MenuItem>
                                    <MenuItem value={"南部弁"}>
                                        南部弁
                                    </MenuItem>
                                    <MenuItem value={"中部弁"}>
                                        中部弁
                                    </MenuItem>
                                    <MenuItem value={"特にこだわりはない"}>
                                        特にこだわりはない
                                    </MenuItem>
                                </Select>
                            </div>
                        </div>
                    )}
                    {user?.role.role_id == 'teacher' && ( 
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>マイページURL</FormLabel>
                            <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.meeting}
                                    onChange={e => dispatch(setCurrentItemValue({ meeting: e.target.value }))}
                                    error={errors.meeting ? true : false}
                                    helperText={errors.meeting ? errors.meeting : ''}
                                />
                            </div>
                        </div>
                    )}
                    {/*<FormControl required component="fieldset" error={errors.vietnameseDialect}>
                      <FormLabel component="legend">どのベトナム語をメインに学習したいですか？</FormLabel>
                      <RadioGroup name="vietnameseDialect" value={formData.vietnameseDialect} onChange={handleChange} row sx={{display: 'grid', 
                        gridTemplateColumns: { sx: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)'}, 
                         }}>
                        <FormControlLabel value="northern" control={<Radio />} label="標準語(北部弁)" />
                        <FormControlLabel value="southern" control={<Radio />} label="南部弁" />
                        <FormControlLabel value="central" control={<Radio />} label="中部弁" />
                        <FormControlLabel value="noPreference" control={<Radio />} label="特にこだわりはない" />
                      </RadioGroup>
                      {errors.vietnameseDialect && <FormHelperText>このフィールドは必須です</FormHelperText>}
                    </FormControl>*/}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={preview ? preview: currentItem?.avatar_url?currentItem?.avatar_url : '/images/users/user.svg'}  // Fallback to default avatar
                            alt="Avatar"
                            sx={{ width: 56, height: 56 }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=>{
                                const file = e.target.files?.[0] || null;
                                console.log("file : ", file)
                                dispatch(setCurrentItemValue({ avatar: file }))
                                console.log("currentITem =>>>>>>>>>>>>>>>", currentItem)
                                if(file){
                                    const filePreview = URL.createObjectURL(file);
                                    setPreview(filePreview);
                                }
                                }}
                            style={{ display: 'none' }}
                            id="upload-avatar"
                        />
                        <label htmlFor="upload-avatar">
                            <Button variant="outlined" component="span">
                            アバターをアップロード
                            </Button>
                        </label>
                    </Box>
                    {/* ************************************************************************ */}
                    <div className='mt-[16px]'>
                        <Button type='submit' variant='contained' color='secondary'>
                            保存する
                        </Button>
                    </div>
                </form>
            </MainPannel>
        </div>
    );
};

export default ProfileForm;
