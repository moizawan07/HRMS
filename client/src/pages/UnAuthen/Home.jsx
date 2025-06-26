import { Button } from "@/components/ui/button";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Register from "@/components/Home/Register";
import { HSection1, HSection2 } from "@/components/Home/HomeSmallCompo";
function Home() {
  return (
    <div className="mb-25">
      <Header />

      {/* Hero Section */}
      <div className="min-h-screen bgcolor">
        <div className="w-full min-h-[135vh] rounded-tl-[150px] rounded-br-[55px]  relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

          <div className="flex flex-wrap justify-center items-center pt-16 px-4">
            <div className="w-[650px] text-center md:text-left p-4 md:p-8">
              {/* Main Headline (H1) */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
                All-in-one HR for a{" "}
                <span className="text-indigo-600">Global Workforce</span>
              </h1>

              {/* Sub-headline / Descriptive Text */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-up delay-100">
                Manage payroll, onboarding, benefits, and compliance from a
                single intuitive platform. Empower your team, simplify your
                operations.
              </p>

              {/* Call to Action Button */}
              <div className="flex justify-center md:justify-start space-x-4 animate-fade-in-up delay-200">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"
                >
                  Request a Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold rounded-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
                >
                  Learn More
                </Button>
              </div>

              {/* Optional: Add some social proof or small text below the CTA */}
              <p className="mt-8 text-sm text-gray-500 animate-fade-in-up delay-300">
                Trusted by thousands of companies worldwide.
              </p>
            </div>
            {/* Register Form */}
            <Register />
          </div>

          <div className="mt-16 px-4">
            <p className="text-center mb-8 text-gray-600 font-medium">
              FlexHR is trusted by 35,000+ companies from startups to enterprise
              businesses
            </p>
            <div className="flex justify-center items-center gap-8 md:gap-25 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-24 h-12  rounded-lg flex items-center justify-center text-white font-bold text-sm">
               <img src="https://deel-website-media-prod.s3.amazonaws.com/Shopify_78a72c1401.svg" alt="logos" />
              </div>
              <div className="w-24 h-12  rounded-lg flex items-center justify-center text-white font-bold text-sm">
               <img src="https://deel-website-media-prod.s3.amazonaws.com/Klarna_bf7fb6ca46.svg" alt="logos" />
              </div>
              <div className="w-24 h-12  rounded-lg flex items-center justify-center text-white font-bold text-sm">
               <img src="https://deel-website-media-prod.s3.amazonaws.com/Reddit_2f73dbe2a1.svg" alt="logos" />
              </div>
              <div className="w-24 h-12  rounded-lg flex items-center justify-center text-white font-bold text-sm">
               <img src="https://deel-website-media-prod.s3.amazonaws.com/Nike_499edbaeb3.svg" alt="logos" />
              </div>
              <div className="w-24 h-12  rounded-lg flex items-center justify-center text-white font-bold text-sm">
               <img src="https://deel-website-media-prod.s3.amazonaws.com/Jelly_Belly_631155cedf.svg" alt="logos" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1*/}
      <HSection1 />
      {/* SECTION 2*/}
      <HSection2 />
      <Footer  />
    </div>
  );
}

export default Home;
