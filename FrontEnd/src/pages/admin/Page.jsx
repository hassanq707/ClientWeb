import { useState, useEffect } from 'react';
import { IoIosSearch, IoIosStats, IoMdCash } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import { LoadingSkeleton } from '../../component/UI/Loading';
import OrderTable from '../../component/Admin/OrderTable';
import PaymentTable from '../../component/Admin/PaymentTable';
import axios from 'axios';
import { FiTruck, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { Tabs, Tab } from '../../component/UI/Tabs';
import { Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('confirmed');
  const [activeSection, setActiveSection] = useState('orders');
  const [filteredData, setFilteredData] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  const url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [ordersRes, paymentsRes] = await Promise.all([
          axios.get(`${url}/orders/admin`),
          axios.get(`${url}/orders/getpayments`)
        ]);

        if (ordersRes.data.success && paymentsRes.data.success) {
          const allOrders = ordersRes.data.orders;
          const confirmedOrders = allOrders.filter(obj => obj.paymentStatus === "confirmed");
          const pendingOrders = allOrders.filter(obj => obj.paymentStatus !== "confirmed");

          setOrders(confirmedOrders);
          setPendings(pendingOrders);
          setPayments(paymentsRes.data.payments);

          const totalRevenue = paymentsRes.data.payments
            .filter(p => p.orderId?.paymentStatus === 'confirmed')
            .reduce((sum, p) => {
              const amount = parseFloat(p.amount); 
              return sum + amount;
            }, 0);


          setStats({
            totalOrders: allOrders.length,
            totalRevenue,
            pendingOrders: pendingOrders.length
          });
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const dataToFilter = activeTab === 'confirmed' ? orders : pendings;
    const results = dataToFilter.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ))
    setFilteredData(results);
  }, [searchTerm, activeTab, orders, pendings]);

  useEffect(() => {
  const results = payments.filter(payment => {
    const { paymentMethod, transactionId, amount, status, orderId } = payment;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      (paymentMethod && paymentMethod.toLowerCase().includes(lowerSearch)) ||
      (transactionId && transactionId.toLowerCase().includes(lowerSearch)) ||
      (amount && amount.toString().toLowerCase().includes(lowerSearch)) ||
      (status && status.toLowerCase().includes(lowerSearch)) ||
      (orderId?.fullname && orderId.fullname.toLowerCase().includes(lowerSearch)) ||
      (orderId?.email && orderId.email.toLowerCase().includes(lowerSearch))
    );
  });

  setFilteredPayments(results);
}, [searchTerm, payments]);


  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Fusion Report</title>
        <meta name="description" content="Admin panel for managing vehicle reports and payments" />
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
                  Manage all vehicle history reports and payments
                </p>
              </div>
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder={`Search ${activeSection === 'orders' ? 'reports' : 'payments'}...`}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full shadow-sm hover:border-gray-400 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoIosSearch className="absolute top-3 left-3 text-xl text-gray-500" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FiTruck className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                </div>
              </div>

              <div className="bg-green-50/80 border border-green-100 rounded-lg p-4 flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FiDollarSign className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-yellow-50/80 border border-yellow-100 rounded-lg p-4 flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Clock className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Pending Reports</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="flex border-b border-gray-200/50">
              <button
                onClick={() => setActiveSection('orders')}
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <FiTruck className="mr-2" />
                Vehicle Reports
              </button>
              <button
                onClick={() => setActiveSection('payments')}
                className={`px-6 py-4 font-medium flex items-center ${activeSection === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <FiCreditCard className="mr-2" />
                Payment Records
              </button>
            </div>

            {activeSection === 'orders' ? (
              <>
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
              </>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-gray-200/50 flex justify-between items-center bg-gradient-to-r from-green-600/10 to-green-800/10">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <IoMdCash className="mr-2 text-green-600" />
                    Payment Records
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-600/10 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-600/20">
                      {filteredPayments.length} {filteredPayments.length === 1 ? 'payment' : 'payments'}
                    </span>
                  </div>
                </div>

                {loading ? (
                  <LoadingSkeleton />
                ) : error ? (
                  <div className="p-6 bg-red-50/80 border-l-4 border-red-500 text-red-700">
                    <p>⚠️ Error loading payments: {error}</p>
                  </div>
                ) : (
                  <div className="max-h-[52vh] overflow-y-auto">
                    <PaymentTable payments={filteredPayments} />
                  </div>
                )}
              </>
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