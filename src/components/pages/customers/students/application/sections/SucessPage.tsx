import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import { Typography, Button } from '@mui/material';
import { getRequest, postRequest } from '@/utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51Q8aCCBFXHZzE4HbQkdlcIc9yAg7bjgkbyoeCMgchyRuHsfLTyVJpO0yUCNh2Ewty9h5XKoHOtJuoobwevlDYuLN00Ty1eKyKD');

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    const paymentIntent = searchParams.get('payment_intent');
    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (paymentIntent && clientSecret) {
      // const response = getRequest(`v0/student/create-subscription/`, 
      //   id
      // ).then(res=>{
      //   setStatus('支払いが完了しました！');
      // });
      stripePromise
        .then((stripe) => {
          if (!stripe) {
            setStatus('Stripeの初期化に失敗しました。');
            return;
          }
          stripe
            .retrievePaymentIntent(clientSecret)
            .then(async (result: any) => {
              if (result.paymentIntent.status === 'succeeded') {
                console.log("result : ", result)
                console.log("result : ", result)
                console.log("result : ", result.paymentIntent.client_secret)
                setStatus('支払いが成功しました！');
                await postRequest(`v0/student/lecture/`, {
                  clientSecret
                }).then((res)=>{
                  // success message 
                }).catch((e)=>{
                  console.log(e.message)
                });
                // Optionally, you can check the payment plan from the backend here
              } else {
                setStatus('支払いに失敗しました。');
              }
            })
            .catch((error: any) => {
              setStatus('支払い確認中にエラーが発生しました。');
            });
        })
        .catch((error) => {
          setStatus('Stripeの読み込みに失敗しました。');
        });
    } else {
      setStatus('支払い情報が不足しています。');
    }
  }, [searchParams]);

  return (
    <div>
      <TitleBar>
        受講申込みフォーム
      </TitleBar>
      <MainPannel>
          <div className='flex flex-col gap-y-32 items-center my-28'>
            <h1 className='text-[#673ab7] text-2xl'>{status}</h1>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '20px',
                width: '45%',
                color: '#1976d2',
                borderColor: '#1976d2',
                '&:hover': { borderColor: '#1565c0', bgcolor: '#1976d2', color:'#fff' }
              }}
            >
              戻る
            </Button>
          </div>
      </MainPannel>
    </div>
    
  );
};

export default PaymentSuccess;
