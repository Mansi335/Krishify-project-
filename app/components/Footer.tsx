import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-black font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold">KRISHIFY</span>
          </div>
          <p className="text-gray-400">
            {t("description")}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">{t("product.title")}</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/features" className="hover:text-white">{t("product.features")}</Link></li>
            <li><Link href="/benefits" className="hover:text-white">{t("product.prediction")}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">{t("resources.title")}</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/how-it-works" className="hover:text-white">{t("resources.howItWorks")}</Link></li>
            <li><Link href="/blog" className="hover:text-white">{t("resources.blog")}</Link></li>
            <li><Link href="/support" className="hover:text-white">{t("resources.support")}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">{t("company.title")}</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/about" className="hover:text-white">{t("company.about")}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t("company.contact")}</Link></li>
            <li><Link href="/privacy" className="hover:text-white">{t("company.privacy")}</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
}
