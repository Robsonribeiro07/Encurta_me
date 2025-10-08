export default function LoadingSpinner() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        {/* Logo/Icon com animação de pulso */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <svg
              className="w-10 h-10 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>

          {/* Círculos animados ao redor do logo */}
          <div className="absolute inset-0 animate-spin">
            <div className="w-24 h-24 border-2 border-transparent border-t-blue-300 border-r-purple-300 rounded-full"></div>
          </div>
          <div
            className="absolute inset-1 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '3s' }}
          >
            <div className="w-22 h-22 border-2 border-transparent border-b-pink-300 border-l-indigo-300 rounded-full"></div>
          </div>
        </div>

        {/* Animated Loading Dots mais sofisticados */}
        <div className="flex justify-center space-x-1 mb-6">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: '100ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: '200ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-rose-500 rounded-full animate-bounce"
            style={{ animationDelay: '400ms' }}
          ></div>
        </div>

        {/* Brand Name com gradiente */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Encurta.me
        </h1>

        {/* Loading Text com animação */}
        <p className="text-gray-600 dark:text-gray-400 text-lg animate-pulse mb-6">
          Preparando sua experiência...
        </p>

        {/* Progress Bar com gradiente animado */}
        <div className="w-80 mx-auto">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>

        {/* Subtle animation text */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 animate-pulse">
          ✨ Criando links mais inteligentes
        </p>
      </div>
    </div>
  )
}
