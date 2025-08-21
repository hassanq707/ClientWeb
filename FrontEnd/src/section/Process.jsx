import { Steps } from "../constant/process.const";

const Process = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get your vehicle history report in just 4 simple steps
          </p>
        </div>

        {/* Steps wrapper */}
        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block relative top-9">
            <div className="w-[84%] h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 mx-auto rounded-full"></div>
          </div>

          {/* Desktop steps */}
          <div className="hidden lg:grid grid-cols-4 gap-16 relative z-10">
            {Steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div className="flex flex-col items-center text-center" key={index}>
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-500">
                      <span className="text-xs font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Mobile steps */}
          <div className="lg:hidden relative flex justify-center">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 rounded-full z-0"></div>

            <div className="space-y-12 relative z-10">
              {Steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div className="relative flex flex-col items-center text-center" key={index}>
                    <div className="relative mb-4 z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-500">
                        <span className="text-xs font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 relative z-10 bg-white/80 px-3 py-1 rounded-lg">
                      {step.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 border border-blue-200">
            <span className="text-blue-600 font-medium">
              Average time: 3-5 Hours
            </span>
            <span className="ml-3 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
