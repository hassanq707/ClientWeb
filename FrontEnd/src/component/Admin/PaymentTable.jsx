import { User, Mail, CreditCard, Calendar, DollarSign } from 'lucide-react';
import moment from 'moment';

const PaymentTable = ({ payments = [] }) => {
  const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY h:mm A');
  };

  const columns = [
    {
      key: 'paidAt',
      name: 'Date',
      icon: <Calendar className="h-4 w-4" />,
      width: 'w-[180px]'
    },
    { 
      key: 'orderId', 
      name: 'Customer', 
      icon: <User className="h-4 w-4" />, 
      width: 'w-[180px]' 
    },
    { 
      key: 'paymentMethod', 
      name: 'Method', 
      icon: <CreditCard className="h-4 w-4" />, 
      width: 'w-[120px]' 
    },
    { 
      key: 'amount', 
      name: 'Amount', 
      icon: <DollarSign className="h-4 w-4" />, 
      width: 'w-[120px]' 
    },
    { 
      key: 'transactionId', 
      name: 'Transaction ID', 
      icon: <CreditCard className="h-4 w-4" />, 
      width: 'w-[200px]' 
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width}`}
              >
                <div className="flex items-center">
                  {column.icon}
                  <span className="ml-2">{column.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.reverse().map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(payment.paidAt)}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {payment.orderId?.fullname || 'N/A'}
                </div>
                <div className="text-xs text-gray-500">
                  {payment.orderId?.email || ''}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap capitalize">
                <div className="text-sm text-gray-900">
                  {payment.paymentMethod}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ${parseFloat(payment.amount).toFixed(2)}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900">
                {payment.transactionId || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex flex-col items-center">
            <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium">No payment records found</p>
            <p className="text-sm">Payment records will appear here once transactions are completed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
