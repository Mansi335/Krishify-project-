import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const features = [
    t("features.unlimited"),
    t("features.predictions"),
    t("features.monitoring"),
    t("features.weather"),
    t("features.optimization"),
    t("features.market"),
    t("features.support"),
    t("features.noCard")
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("title")} <span className="text-yellow-600">{t("titleHighlight")}</span> {t("titleSuffix")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-12 border-2 border-yellow-200 shadow-xl">
            <div className="text-center">
              <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
                {t("freePlan")}
              </div>
              <h2 className="text-4xl font-bold text-black mb-4">{t("planName")}</h2>
              <div className="text-6xl font-bold text-yellow-600 mb-2">{t("price")}</div>
              <p className="text-gray-600 mb-8">{t("pricePeriod")}</p>
              
              <div className="text-left max-w-md mx-auto space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-yellow-600 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link
                href="/get-started"
                className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors w-full max-w-md"
              >
                {t("getStartedButton")}
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                {t("footer")}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
