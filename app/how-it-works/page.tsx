import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account in minutes. No credit card required.",
      icon: "📝"
    },
    {
      number: "2",
      title: "Connect Your Farm",
      description: "Add your farm details, field locations, and crop information.",
      icon: "🌾"
    },
    {
      number: "3",
      title: "Get AI Insights",
      description: "Receive personalized recommendations based on your farm data.",
      icon: "🤖"
    },
    {
      number: "4",
      title: "Optimize & Grow",
      description: "Implement suggestions and watch your productivity increase.",
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            How <span className="text-yellow-600">KRISHIFY</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with KRISHIFY in four simple steps and transform your farming operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-yellow-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-4xl font-bold text-yellow-600 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-yellow-400 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="/get-started"
            className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Get Started Now
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

