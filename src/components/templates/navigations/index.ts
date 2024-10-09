import { useAuth } from '@/contexts/AuthContext';

import member from './member';
import super_list from './super';
import owner from './owner';
import admin from './admin';
import teacher from './teacher';
import student from './student';

const useMenuItems = () => {
    const { user } = useAuth();

    // if (user?.permission === 'super' || user?.permission === 'owner') {
    //     return {
    //         items: [admin, owner, member]
    //     };
    // }

    // if (user?.permission === 'customer') {
    //     if(user.user_info.role.role_id == 'teacher'){
    //         return {
    //             items: [teacher]
    //         };
    //     }
    //     else return {
    //         items: [member]
    //     };
    // } else{
    //     return {items:[member]}
    // }
    if(user?.role.role_id === 'admin'){
        return{
            items:[admin]
        }
    } else if(user?.role.role_id === 'teacher'){
        return{
            items:[teacher]
        }
    } else if(user?.role.role_id === 'student'){
        return {
            items:[student]
        }
    }
    // if(user?.permission === 'customer' && user && user?.user_info.role.role_id == 'teacher')
    //     return {
    //         items: [teacher]
    //     }
    // else if(user?.permission === 'customer' && user && user?.user_info.role.role_id == 'member')
    //     return {
    //         items: [member]
    //     };
    
    // if (user && user?.user_info.role.role_id == 'teacher')
    //     return {
    //         items: [owner, member]
    //     };
    // else if (user && user?.user_info.role.role_id == 'member')
    //     return {
    //         items: [member]
    //     };
    // else
    //     return {
    //         items: []
    //     };
};

export default useMenuItems;
