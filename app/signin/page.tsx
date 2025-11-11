import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            Sign In to <span className="text-yellow-600">KRISHIFY</span>
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back! Sign in to access your farm dashboard.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8 max-w-md mx-auto">
          <form className="space-y-6">
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
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-400" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/get-started" className="text-yellow-600 hover:underline">
              Get Started for Free
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

