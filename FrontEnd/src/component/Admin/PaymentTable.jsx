import { useState } from 'react';
import { User, Mail, CreditCard, Calendar, DollarSign, Copy, Check } from 'lucide-react';
import moment from 'moment';

const PaymentTable = ({ payments = [] }) => {
  const [copiedId, setCopiedId] = useState(null);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: 'N/A', time: '' };

    if (dateTimeString.includes('/')) {
      const [date, time] = dateTimeString.split(',').map(s => s.trim());
      return { date, time };
    }
    return {
      date: moment(dateTimeString).format('DD/MM/YYYY'),
      time: moment(dateTimeString).format('hh:mm A')
    };
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const columns = [
  {
    key: 'paidAt',
    name: 'Date',
    icon: <Calendar className="h-4 w-4" />,
    width: 'w-[180px]'
  },
  { 
    key: 'customer', 
    name: 'Customer', 
    icon: <User className="h-4 w-4" />, 
    width: 'w-[200px]' 
  },
  { 
    key: 'orderId', 
    name: 'Order ID', 
    icon: <Mail className="h-4 w-4" />, 
    width: 'w-[150px]' 
  },
  { 
    key: 'method', 
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
    width: 'w-[220px]' 
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
            <th scope="col" className="relative px-4 py-3 w-12">
              <span className="sr-only">Copy</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => {
            const { date, time } = formatDateTime(payment.paidAt);
            const copyText = `Payment Details:\nDate: ${date}, ${time}\nCustomer: ${payment.orderId?.fullname || 'N/A'}\n\nOrder ID: ${payment.orderId?._id || 'N/A'}\nAmount: $${payment.amount?.toFixed(2) || '0.00'}\nTransaction ID: ${payment.transactionId || 'N/A'}`;

            return (
              <tr key={payment._id} className="hover:bg-gray-50 group">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-medium">{date}</span>
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">
                    {payment.orderId?.fullname || 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {payment.orderId?._id || 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm capitalize font-bold text-gray-900 font-mono">
                    {payment.paymentMethod|| 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${typeof payment.amount === 'number' ? payment.amount.toFixed(2) : '0.00'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {payment.transactionId || 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    onClick={() => copyToClipboard(copyText, payment._id)}
                    className="text-gray-400 hover:text-blue-500 transition-colors relative p-1 rounded group"
                    title={copiedId === payment._id ? 'Copied!' : 'Copy all details'}
                  >
                    {copiedId === payment._id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {copiedId === payment._id ? 'Copied!' : 'Copy details'}
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
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