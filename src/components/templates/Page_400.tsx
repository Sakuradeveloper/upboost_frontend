const Page_400 = () => {
    return (
        <div className='w-full h-screen bg-gradient-to-b from-[rgb(255,246,223)] to-[#fff] flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center px-[16px]'>
                <h1 className='text-[100px] font-black text-[#713f12] mb-[8px]'>400</h1>

                <hr className='w-full max-w-[320px] border border-solid border-[#713f12] mb-[50px]' />

                <p className='w-full max-w-[800px] text-[18px] leading-[24px] font-extrabold'>
                    パスワード再設定の有効期限が切れています。再度、パスワード再設定の手続きをお願いいたします。
                </p>
            </div>
        </div>
    );
};

export default Page_400;
