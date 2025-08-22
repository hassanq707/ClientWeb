import { motion } from 'framer-motion';
import { Services } from '../constant/services.const'

const ServicesWeCover = () => {
    const overlayVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Services We Cover
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Professional vehicle history checks across all sectors, delivering accurate reports for transparency, safety, and confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Services.map((service, index) => (
                        <div
                            key={service.id}
                            className="relative group h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} group-hover:from-black/60 group-hover:to-black/40 transition-all duration-500`} />

                            <motion.div
                                variants={overlayVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                            >

                                <motion.h3
                                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-yellow-100 transition-colors duration-300"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {service.title}
                                </motion.h3>

                                <motion.p
                                    className="text-white/95 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300 line-clamp-4 md:line-clamp-none"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 + 0.15 }}
                                    viewport={{ once: true }}
                                >
                                    {service.description}
                                </motion.p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesWeCover;
