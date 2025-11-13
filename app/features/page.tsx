import Header from "../components/Header";
import Footer from "../components/Footer";
import { getTranslations } from "next-intl/server";

export default async function FeaturesPage() {
  const t = await getTranslations("features");

  const features = [
    {
      title: t("cropPrediction.title"),
      description: t("cropPrediction.description"),
      icon: "🌾"
    },
    {
      title: t("resourceOptimization.title"),
      description: t("resourceOptimization.description"),
      icon: "💧"
    },
    {
      title: t("aiDrivenInsights.title"),
      description: t("aiDrivenInsights.description"),
      icon: "🧠"
    },
    {
      title: t("userFriendlyDashboard.title"),
      description: t("userFriendlyDashboard.description"),
      icon: "📊"
    },
    {
      title: t("sustainabilityFocused.title"),
      description: t("sustainabilityFocused.description"),
      icon: "🌎"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("title")} <span className="text-yellow-600">{t("titleHighlight")}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
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
