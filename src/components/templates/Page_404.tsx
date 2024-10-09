const Page_404 = () => {
    return (
        <div className='w-full h-screen bg-gradient-to-b from-[rgb(255,246,223)] to-[#fff] flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center px-[16px]'>
                <h1 className='text-[100px] font-black text-[#713f12] mb-[8px]'>404</h1>

                <hr className='w-full max-w-[320px] border border-solid border-[#713f12] mb-[50px]' />

                <p className='w-full max-w-[800px] text-[18px] leading-[24px] font-extrabold'>
                    ページが見つかりません。トップページに行くには
                    <a href='/' className='text-[#713f12] underline underline-offset-4'>
                        ここを
                    </a>
                    クリックしてください。
                </p>
            </div>
        </div>
    );
};

export default Page_404;
