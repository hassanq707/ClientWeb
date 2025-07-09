import { useState } from 'react';
import { User, Mail, Phone, Hash, Truck, Calendar, Copy, Check, Clock } from 'lucide-react';

const OrderTable = ({ orders = [] }) => {
  const [copiedId, setCopiedId] = useState(null);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: 'N/A', time: '' };

    const [date, time] = dateTimeString.split(',').map(s => s.trim());
    return { date, time };
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatValue = (value, type = 'text') => {
    if (!value) {
      return <span className="text-gray-400 font-medium">—</span>;
    }

    if (type === 'email') {
      return <a href={`mailto:${value}`} className="text-blue-600 hover:underline truncate max-w-[180px]">{value}</a>;
    }

    if (type === 'phone') {
      return <a href={`tel:${value}`} className="text-blue-600 hover:underline">{value}</a>;
    }

    return <span className="truncate max-w-[150px]">{value}</span>;
  };

  const columns = [
    {
      key: 'Date',
      name: (
        <>
          <span className="md:hidden">D&T</span>
          <span className="hidden md:inline">Date & Time</span>
        </>
      ),
      icon: <div className="flex items-center"><Calendar className="mr-1 h-4 w-4" /><Clock className="h-4 w-4" /></div>,
      width: 'w-[180px]',
      isDateTime: true
    },
    { key: 'fullname', name: 'Name', icon: <User className="h-4 w-4" />, width: 'w-[150px]' },
    { key: 'email', name: 'Email', icon: <Mail className="h-4 w-4" />, width: 'w-[200px]' },
    { key: 'phoneNumber', name: 'Phone', icon: <Phone className="h-4 w-4" />, width: 'w-[150px]' },
    { key: 'vinNumber', name: 'VIN', icon: <Hash className="h-4 w-4" />, width: 'w-[150px]' },
    { key: 'vehicleModel', name: 'Model', icon: <Truck className="h-4 w-4" />, width: 'w-[150px]' },
    { key: 'year', name: 'Year', icon: <Calendar className="h-4 w-4" />, width: 'w-[100px]' },
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
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => {
            const { date, time } = formatDateTime(order.Date);
            const copyText = `Order Details:\n\nDate: ${date}\nTime: ${time}\nName: ${order.fullname || 'N/A'}\nEmail: ${order.email || 'N/A'}\nPhone: ${order.phoneNumber || 'N/A'}\nVIN: ${order.vinNumber || 'N/A'}\nModel: ${order.vehicleModel || 'N/A'}\nYear: ${order.year || 'N/A'}`;

            return (
              <tr key={order._id} className="hover:bg-gray-50 group">
                {columns.map((column) => (
                  <td
                    key={`${order._id}-${column.key}`}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    <div className="text-sm text-gray-900 flex items-center">
                      {column.key === 'Date' ? (
                        <div className="flex flex-col">
                          <span className="font-medium">{date}</span>
                          <span className="text-xs text-gray-500">{time}</span>
                        </div>
                      ) : column.key === 'email' ? (
                        formatValue(order[column.key], 'email')
                      ) : column.key === 'phoneNumber' ? (
                        formatValue(order[column.key], 'phone')
                      ) : (
                        formatValue(order[column.key])
                      )}
                    </div>
                  </td>
                ))}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    onClick={() => copyToClipboard(copyText, order._id)}
                    className="text-gray-400 hover:text-blue-500 transition-colors relative p-1 rounded group"
                    title={copiedId === order._id ? 'Copied to clipboard!' : 'Copy all details'}
                    aria-label="Copy order details"
                  >
                    {copiedId === order._id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}

                    {/* Tooltip */}
                    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {copiedId === order._id ? 'Copied!' : 'Copy details'}
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex flex-col items-center">
            <Truck className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm">Orders will appear here once they are placed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
