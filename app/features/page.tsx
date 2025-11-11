import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Crop Prediction",
      description: "Predict crop yields with 92% accuracy using advanced machine learning algorithms.",
      icon: "🌾"
    },
    {
      title: "Resource Optimization",
      description: "Optimize water, fertilizer, and pesticide usage to reduce costs and environmental impact.",
      icon: "💧"
    },
    {
      title: "Real-Time Monitoring",
      description: "Monitor your fields in real-time with IoT sensors and satellite imagery.",
      icon: "📊"
    },
    {
      title: "Weather Integration",
      description: "Get accurate weather forecasts and alerts to protect your crops.",
      icon: "🌤️"
    },
    {
      title: "Market Insights",
      description: "Access market trends and pricing data to make informed selling decisions.",
      icon: "📈"
    },
    {
      title: "Farm Management",
      description: "Manage your entire farm operation from a single, easy-to-use dashboard.",
      icon: "🚜"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Powerful Features for <span className="text-yellow-600">Smart Farming</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to transform your farming operations with AI-powered insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

