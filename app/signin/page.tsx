import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function SignInPage() {
  const t = await getTranslations("signIn");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("title")} <span className="text-yellow-600">{t("titleHighlight")}</span>{t("titleSuffix") && ` ${t("titleSuffix")}`}
          </h1>
          <p className="text-xl text-gray-600">
            {t("subtitle")}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8 max-w-md mx-auto">
          <form className="space-y-6">
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
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-400" />
                <span className="ml-2 text-sm text-gray-600">{t("form.rememberMe")}</span>
              </label>
              <a href="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                {t("form.forgotPassword")}
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              {t("form.submitButton")}
            </button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            {t("form.noAccount")}{" "}
            <Link href="/get-started" className="text-yellow-600 hover:underline">
              {t("form.signUpLink")}
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
