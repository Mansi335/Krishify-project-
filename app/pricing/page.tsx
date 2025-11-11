import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Simple, <span className="text-yellow-600">Free</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            KRISHIFY is completely free forever. No hidden charges, no credit card required.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-12 border-2 border-yellow-200 shadow-xl">
            <div className="text-center">
              <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
                100% FREE FOREVER
              </div>
              <h2 className="text-4xl font-bold text-black mb-4">Free Plan</h2>
              <div className="text-6xl font-bold text-yellow-600 mb-2">$0</div>
              <p className="text-gray-600 mb-8">per month, forever</p>
              
              <div className="text-left max-w-md mx-auto space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">Unlimited farm management</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">AI-powered crop predictions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">Real-time monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">Weather integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">Resource optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">Market insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-700">No credit card required</span>
                </div>
              </div>
              
              <Link
                href="/get-started"
                className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors w-full max-w-md"
              >
                Get Started for Free
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                No hidden charges • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

