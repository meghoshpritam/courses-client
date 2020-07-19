import axios from 'axios';

export default async ({ type, id }) => {
  let res;
  try {
    const typeName = `${type}Id`;
    res = await axios.post(
      '/student/create-order',
      { [typeName]: id },
      {
        headers: {
          authorization: localStorage.getItem('accessToken'),
        },
      }
    );
    // TODO: check price is 0, then show as added else open payment system
  } catch (err) {
    console.log('error: ', err, err.response);
    return;
  }
  console.log('print', res?.data);

  console.log('status: ', res.status);
  if (res.status === 201) {
    console.log('enrolled');
  } else {
    const verifyPayment = async ({ paymentId, orderId, signature, token }) => {
      try {
        const response = await axios.post(
          '/student/verify-order',
          { token, paymentId, orderId, signature },
          {
            headers: {
              authorization: localStorage.getItem('accessToken'),
            },
          }
        );
        return response.data;
      } catch (err) {
        return err?.response;
      }
    };

    const option = {
      key: 'rzp_test_E5IMZYa1Ag0kzr',
      amount: res.data.data.amount,
      currency: res.data.data.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: res.data.data.id,
      handler(response) {
        verifyPayment({
          token: res.data.token,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        })
          .then((r) => {
            console.log(('payment success: ', r));
          })
          .catch((e) => {
            console.log('payment failed: ', e);
          });
      },
      prefill: {
        name: 'Gaurav Kumar',
      },
    };
    try {
      const rPay = new window.Razorpay(option);

      rPay.open();
    } catch (err) {
      console.log('rPayErr', err);
    }
  }
};
