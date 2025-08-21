import { motion } from 'framer-motion';
import { Services } from '../constant/services.const';

const ServicesWeCover = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-8 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services We Cover</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive vehicle history reports for all types of vehicles, ensuring transparency and confidence in your purchase
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {Services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            className={`${service.bgColor} rounded-2xl p-8 border ${service.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-2`}
                        >
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mx-auto mb-6`}>
                                <service.icon className="text-4xl md:text-5xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">{service.title}</h3>
                            <p className="text-gray-600 text-center">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-lg text-gray-600">
                        All reports include accident history, ownership records, mileage verification, and more
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesWeCover;

