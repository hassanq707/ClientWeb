import { motion } from 'framer-motion';
import {
    FaLock, FaCcVisa, FaCcAmex, FaCcDiscover, FaCcDinersClub, FaCcJcb, FaPaypal
} from 'react-icons/fa';


const TrustBadges = () => {
    const paymentMethods = [
        {
            name: 'Visa',
            icon: <FaCcVisa className="text-5xl text-[#1A1F71]" />,
            color: '#1A1F71'
        },
        {
            name: 'MasterCard',
            icon: (
                <img
                    src="./masterCard.png"
                    alt="MasterCard"
                    className="w-12 h-12 object-contain"
                />
            ),
            color: '#EB001B'
        },


        {
            name: 'American Express',
            icon: <FaCcAmex className="text-5xl text-[#006FCF]" />,
            color: '#006FCF'
        },
        {
            name: 'Discover',
            icon: <FaCcDiscover className="text-5xl text-[#FF6000]" />,
            color: '#FF6000'
        },
        {
            name: 'Diners Club',
            icon: <FaCcDinersClub className="text-5xl text-[#0079BE]" />,
            color: '#0079BE'
        },
        {
            name: 'JCB',
            icon: <FaCcJcb className="text-5xl text-[#0B4EA2]" />,
            color: '#0B4EA2'
        },
        // {
        //     name: 'PayPal',
        //     icon: <FaPaypal className="text-5xl text-[#003087]" />,
        //     color: '#003087'
        // }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-white py-8 px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-6"
                >
                    <h1 className="text-gray-600 text-xl font-bold uppercase tracking-wider mb-2">
                        We Accept
                    </h1>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8"
                >
                    {paymentMethods.map((method) => (
                        <motion.div
                            key={method.name}
                            variants={itemVariants}
                            className="flex items-center justify-center bg-blue-50 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 p-1"
                            whileHover={{ scale: 1.05 }}
                        >
                            {method.icon}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t border-gray-100"
                >
                    <div className="flex items-center gap-2 text-green-600">
                        <FaLock className="text-lg" />
                        <span className="text-sm font-medium">SSL Secure Payment</span>
                    </div>

                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

                    <div className="text-sm text-gray-500">
                        All transactions are encrypted and secure
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TrustBadges;