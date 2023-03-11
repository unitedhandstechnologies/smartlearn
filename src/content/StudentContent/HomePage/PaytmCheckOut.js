import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';

const PaytmCheckouts = () => {
  const handlePayment = async () => {
    try {
      let req = { user_id: 2, amount: 100 };
      const response = await API_SERVICES.paymentService.create({
        data: req
      });
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        var config = {
          root: '',
          flow: 'DEFAULT',
          data: {
            orderId: response.data.orderId,
            token: response.data.response.body.txnToken,
            tokenType: 'TXN_TOKEN',
            amount: '100.00'
          },
          handler: {
            transactionStatus: function transactionStatus(paymentStatus) {
              console.log(paymentStatus,"stauts");
            },
            notifyMerchant: function notifyMerchant(eventName, data) {
              console.log('Closed');
            }
          }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
          window.Paytm.CheckoutJS.init(config)
            .then(function onSuccess() {
              window.Paytm.CheckoutJS.invoke();
            })
            .catch(function onError(error) {
              console.log('error => ', error);
            });
        }
      }
    } catch (error) {
      console.error(error, 'error');
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Paytm</button>
    </div>
  );
};

export default PaytmCheckouts;

