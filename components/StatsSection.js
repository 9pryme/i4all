export default function StatsSection() {
  return (
    <section className="w-full bg-no-repeat bg-cover bg-center py-20" style={{ backgroundImage: "url('/assets/images/bg/green-bg.png')" }}>
      <div className="site-layout px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - 73% Stats */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full">
            <div className="mb-6 w-32 md:w-48 h-32 md:h-48 flex-shrink-0">
              <img 
                src="/assets/images/stats/rural-path.png" 
                alt="Rural path with people" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 text-black min-h-[4em] flex items-center">
              73% of Nigerians<br />Unbanked
            </h2>
            <p className="text-black mb-6 flex-grow">
              73% of Nigeria's unbanked adults identified in the 2020 EFInA survey did not have the required ID to open a Tier-3 bank account.
            </p>
            <a href="#" className="inline-block w-[160px] border-2 border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
              Read More
            </a>
          </div>

          {/* Card 2 - Identity Start */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full">
            <div className="mb-6 w-32 md:w-48 h-32 md:h-48 mx-auto">
              <img 
                src="/assets/images/stats/rural-path.png" 
                alt="Scatter plot visualization" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 text-black min-h-[4em] flex items-center">
              Identity is just<br />a start
            </h2>
            <p className="text-black mb-6 flex-grow">
              Having ID does not make these groups formally included, but transitioning into formal inclusion is dependent on it.
            </p>
            <a href="#" className="inline-block w-[160px] border-2 border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
              Read More
            </a>
          </div>

          {/* Card 3 - Rural Women */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full">
            <div className="mb-6 w-32 md:w-48 h-32 md:h-48 mx-auto">
              <img 
                src="/assets/images/stats/rural-path.png" 
                alt="Rural market scene" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 text-black min-h-[4em] flex items-center">
              Women living in rural areas<br />are most vulnerable
            </h2>
            <p className="text-black mb-6 flex-grow">
              The poorer you are, the less likely you are to have an ID, with rural women being the most affected group.
            </p>
            <a href="#" className="inline-block w-[160px] border-2 border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 