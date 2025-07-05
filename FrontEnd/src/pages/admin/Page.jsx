import { useState, useEffect } from 'react';
import { IoIosSearch, IoIosStats } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import { LoadingSkeleton } from '../../component/UI/Loading';
import OrderTable from '../../component/Admin/OrderTable';
import axios from 'axios';
import { FiTruck } from 'react-icons/fi';
import { Tabs, Tab } from '../../component/UI/Tabs';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('confirmed');
  const [filteredData, setFilteredData] = useState([]);

  const url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/orders/admin`);
        if (data.success) {
          setOrders(data.orders.filter(obj => obj.paymentStatus === "confirmed"));
          setPendings(data.orders.filter(obj => obj.paymentStatus !== "confirmed"));
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    const dataToFilter = activeTab === 'confirmed' ? orders : pendings;
    const results = dataToFilter.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [searchTerm, activeTab, orders, pendings]);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Fusion Report</title>
        <meta name="description" content="Admin panel for managing vehicle reports" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <header className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-2 rounded-lg mr-3">
                    <IoIosStats className="text-xl" />
                  </span>
                  Fusions Car Report Dashboard
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Manage all vehicle history reports and customer data
                </p>
              </div>
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'confirmed' ? 'confirmed' : 'pending'} reports...`}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full shadow-sm hover:border-gray-400 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoIosSearch className="absolute top-3 left-3 text-xl text-gray-500" />
              </div>
            </div>
          </header>

          <main className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-blue-800/10">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiTruck className="mr-2 text-blue-600" />
                Vehicle Reports
              </h2>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-600/20">
                  {filteredData.length} {filteredData.length === 1 ? 'report' : 'reports'}
                </span>
              </div>
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
              <Tab label="Confirmed Reports" value="confirmed" count={orders.length} />
              <Tab label="Pending Reports" value="pending" count={pendings.length} />
            </Tabs>

            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="p-6 bg-red-50/80 border-l-4 border-red-500 text-red-700">
                <p>⚠️ Error loading reports: {error}</p>
              </div>
            ) : (
              <div className="max-h-[52vh] overflow-y-auto">
                <OrderTable 
                  orders={filteredData} 
                  isPendingView={activeTab === 'pending'} 
                />
              </div>
            )}
          </main>

          <footer className="mt-6 text-center text-gray-500/80 text-sm">
            <p>© {new Date().getFullYear()} Fusion Report | Vehicle History Analytics</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;