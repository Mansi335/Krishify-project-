import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            Get Started with <span className="text-yellow-600">KRISHIFY</span>
          </h1>
          <p className="text-xl text-gray-600">
            Start your journey to smarter farming today.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="City, State, Country"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Create Free Account
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-yellow-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

