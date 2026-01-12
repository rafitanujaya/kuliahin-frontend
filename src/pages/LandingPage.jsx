const LandingPage = () => {
  return (
    <div>

        {/* Navbar Section */}
        <nav className="w-full bg-blue-100">
            <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
                
                {/* Left */}
                <div className="font-bold text-xl">
                Kuliah<span className="text-indigo-700">In</span> 
                </div>

                {/* Center */}
                <ul className="flex gap-6">
                    <li>Hallo</li>
                    <li>Hallo</li>
                    <li>Hallo</li>
                </ul>

                {/* Right */}
                <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Coba Sekarang
                </button>
                </div>

            </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
            <div className="inline-block bg-indigo-100 px-3 py-1.5 rounded-xl font-semibold text-indigo-500 ">
                AI POWERED LEARNING
            </div>
        </div>


    </div>
  )
}

export default LandingPage
