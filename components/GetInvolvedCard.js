export default function GetInvolvedCard({ category, onOpenModal }) {
  return (
    <button 
      onClick={() => onOpenModal(category)}
      className="block w-full text-left bg-white p-6 rounded-xl shadow-md h-full transition-all duration-300 hover:shadow-lg"
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-gray bg-opacity-10 flex items-center justify-center">
          {category.icon ? (
            <img src={category.icon} alt="" className="w-6 h-6" />
          ) : (
            <svg className="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
      <p className="mt-2 text-gray-600">{category.description}</p>
    </button>
  );
}