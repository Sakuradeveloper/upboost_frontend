import TitleBar from '@/components/atoms/TitleBar';
import TrialForm from './sections/TrialForm';
import TitleImg from './sections/TitleImg';

const TrialFormPage = () => {

    return (
            <>
                <TitleBar>
                    <div className=' w-full flex justify-between items-center'>
                        <h5 className='text-[#F29C2E]'>無料体験レッスンお申し込み</h5>
                        <div><a href="/sign_up" className='text-[#F29C2E]'>会員登録</a></div>
                    </div>
                </TitleBar>
                <div className='w-full bg-white rounded-lg'>
                    <TitleImg/>
                    <div className='w-full sd:p-10 py-[5rem] sm:px-[24px] px-2 bg-[#FAFAFA] -translate-y-4'>
                        <TrialForm/>
                    </div>
                </div>
            </>
    );
};

export default TrialFormPage;
