export default function AuthLayout({ children }) {
  return (
    <div className="min-h-[120vh] flex pt-10 justify-center relative bgcolor1 p-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl h-[650px]">
        {/* Left Side: Image and Text */}
        <div className="hidden lg:flex w-1/2 bg-blue-700 flex-col items-center justify-center text-white p-8 relative">
          <img src="/assets/loginImg.png" alt="loginsideimg" />
        </div>

        {/* {Right Side dynamic } */}
        {children}
      </div>
      {/* Footer text */}
      <div className="absolute bottom-4 left-20 text-xs  text-gray-800">
        Copyright © 2025 Sellora Enterprises LTD.
      </div>
      <div className="absolute bottom-4 right-4 text-xs">Privacy Policy</div>
    </div>
  );
}
