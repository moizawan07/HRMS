import { Button } from "@/components/ui/button";

function TopHeader() {
  return (
    <div className="bg-[#a867f7] mt-5 relative w-[96%] mx-auto h-35 content-center rounded-xl text-white">
      <img
        src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/bg/welcome-bg-02.svg"
        alt="logo1"
        className="absolute top-0"
      />
      <div className="flex justify-between  items-center px-15">
        <div>
          <h1 className="md:text-2xl font-bold">Welcome Back, Adrian</h1>
          <p className="md:text-sm">14 New Companies Subscribed Today !!!</p>
        </div>
        <img
          src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/bg/welcome-bg-03.svg"
          alt="logo1"
          // className="absolute top-0"
        />
        <div>
          <Button>Campanies</Button>
          <Button variant="outline" className="text-black ml-3">
            Packages
          </Button>
        </div>
        <img
          src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/bg/welcome-bg-01.svg"
          alt="logo1"
          className="absolute bottom-0 right-7"
        />
      </div>
    </div>
  );
}

export default TopHeader;
