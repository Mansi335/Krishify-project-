import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function GetStartedPage() {
  const t = await getTranslations("getStarted");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("title")} <span className="text-yellow-600">{t("titleHighlight")}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {t("subtitle")}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("form.fullName")}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder={t("form.fullNamePlaceholder")}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("form.email")}
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder={t("form.emailPlaceholder")}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("form.password")}
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder={t("form.passwordPlaceholder")}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("form.farmLocation")}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder={t("form.farmLocationPlaceholder")}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              {t("form.submitButton")}
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            {t("form.terms")}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            {t("form.alreadyHaveAccount")}{" "}
            <Link href="/signin" className="text-yellow-600 hover:underline">
              {t("form.signInLink")}
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
