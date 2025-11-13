import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks");

  const steps = [
    {
      number: "1",
      title: t("step1.title"),
      description: t("step1.description"),
      icon: "📝"
    },
    {
      number: "2",
      title: t("step2.title"),
      description: t("step2.description"),
      icon: "🌾"
    },
    {
      number: "3",
      title: t("step3.title"),
      description: t("step3.description"),
      icon: "🤖"
    },
    {
      number: "4",
      title: t("step4.title"),
      description: t("step4.description"),
      icon: "📈"
    }
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
          <Link
            href="/get-started"
            className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            {t("getStartedButton")}
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
