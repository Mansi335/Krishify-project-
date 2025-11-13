import Header from "./components/Header";
import Footer from "./components/Footer";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-16 lg:py-24">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                {t("badgeAI")}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
                {t("badgeFree")}
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-black">{t("headline1")}</span>
              <br />
              <span className="text-yellow-600">{t("headline2")}</span>
              <br />
              <span className="text-black">{t("headline3")}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              {t("description")}
            </p>
            
            {/* Disclaimer */}
            <p className="text-yellow-600 font-medium">
              {t("disclaimer")}
            </p>
          
           
          </div>
          
          {/* Right Visual Area */}
          <div className="relative lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            {/* Yellow Field Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-700 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    rgba(234, 179, 8, 0.1),
                    rgba(234, 179, 8, 0.1) 10px,
                    rgba(250, 204, 21, 0.1) 10px,
                    rgba(250, 204, 21, 0.1) 20px
                  )`
                }}></div>
              </div>
            </div>
            
            {/* Tablet Dashboard Preview */}
            <div className="relative z-10 w-full max-w-md px-4">
              <div className="bg-white rounded-2xl shadow-2xl p-1 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Tablet Frame */}
                <div className="bg-gray-900 rounded-xl p-2">
                  <div className="bg-white rounded-lg overflow-hidden">
                    {/* Tablet Screen */}
                    <div className="bg-gray-50 p-4 space-y-3 min-h-[400px]">
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between pb-2 border-b">
                        <h3 className="font-bold text-gray-800 text-sm">Dashboard</h3>
                        <span className="text-xs font-semibold text-yellow-600">26.74</span>
                      </div>
                      
                      {/* Crop Images Row */}
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-yellow-100 rounded p-1 h-12 flex items-center justify-center">
                            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bar Charts */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 rounded p-2">
                          <div className="h-16 flex items-end gap-1">
                            <div className="flex-1 bg-blue-400 rounded-t" style={{ height: "60%" }}></div>
                            <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "80%" }}></div>
                            <div className="flex-1 bg-blue-400 rounded-t" style={{ height: "45%" }}></div>
                          </div>
                        </div>
                        <div className="bg-yellow-50 rounded p-2">
                          <div className="h-16 flex items-end gap-1">
                            <div className="flex-1 bg-yellow-400 rounded-t" style={{ height: "70%" }}></div>
                            <div className="flex-1 bg-yellow-500 rounded-t" style={{ height: "50%" }}></div>
                            <div className="flex-1 bg-yellow-400 rounded-t" style={{ height: "90%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Line Chart */}
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <div className="h-16 flex items-end justify-around">
                          {[60, 75, 50, 85, 65, 70, 80].map((height, i) => (
                            <div 
                              key={i} 
                              className="w-3 bg-yellow-500 rounded-t" 
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                        <div className="h-8 mt-1 flex items-center">
                          <div className="flex-1 h-0.5 bg-yellow-400"></div>
                        </div>
                      </div>
                      
                      {/* Progress Circle */}
                      <div className="flex items-center justify-center py-2">
                        <div className="relative w-20 h-20">
                          <svg className="transform -rotate-90 w-20 h-20">
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke="#e5e7eb"
                              strokeWidth="6"
                              fill="none"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke="#facc15"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 32 * 0.7} ${2 * Math.PI * 32}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-800">30.46</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map Preview */}
                      <div className="bg-gray-100 rounded p-2 h-12 flex items-center justify-center border border-gray-200">
                        <div className="text-xs text-gray-500 font-medium">Global Operations Map</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
