import { useState } from 'react';
import {FiUser,FiMail,FiPhone,FiCode,FiTruck,FiCalendar,FiCopy,FiCheck} from 'react-icons/fi';

const OrderTable = ({ orders }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const columns = [
    { key: 'fullname', name: 'Name', icon: <FiUser className="mr-2" />, width: 'w-1/6' },
    { key: 'email', name: 'Email', icon: <FiMail className="mr-2" />, width: 'w-1/4' },
    { key: 'phoneNumber', name: 'Phone', icon: <FiPhone className="mr-2" />, width: 'w-1/6' },
    { key: 'vinNumber', name: 'VIN', icon: <FiCode className="mr-2" />, width: 'w-1/6' },
    { key: 'vehicleModel', name: 'Model', icon: <FiTruck className="mr-2" />, width: 'w-1/6' },
    { key: 'year', name: 'Year', icon: <FiCalendar className="mr-2" />, width: 'w-1/12' }
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
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width}`}
              >
                <div className="flex items-center text-[12px] md:text-[13px]">
                  {column.icon}
                  {column.name}
                </div>
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={`${order._id}-${column.key}`} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 truncate max-w-xs">
                    {column.key === 'email' ? (
                      <a href={`mailto:${order[column.key]}`} className="text-blue-600 hover:underline">
                        {order[column.key]}
                      </a>
                    ) : column.key === 'phoneNumber' ? (
                      <a href={`tel:${order[column.key]}`} className="text-blue-600 hover:underline">
                        {order[column.key]}
                      </a>
                    ) : (
                      order[column.key] || 'N/A'
                    )}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Name: ${order.fullname}, Email: ${order.email}, Phone: ${order.phoneNumber}, VIN: ${order.vinNumber}, Model: ${order.vehicleModel}, Year: ${order.year}`,
                      order._id
                    )
                  }
                  className="text-gray-400 hover:text-gray-600"
                  title="Copy order details"
                >
                  {copiedId === order._id ? (
                    <FiCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <FiCopy className="h-4 w-4" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderTable;


