import logo from "@/assets/logo.png";

const Header = ({ isWelcome }: { isWelcome: boolean }) => {
  return (
    <div className="bg-primary-500 px-7 pb-5 pt-6 flex flex-col items-start gap-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 p-1 rounded-lg bg-white text-white">
          <img src={logo} alt="logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-xl font-medium leading-tight text-white">
            HIGHER INSTITUTE OF SCIENCES
          </h1>
          <p className="text-[12px] text-secondary">
            University Registration 2026/2027
          </p>
        </div>
      </div>
      {isWelcome && (
        <div>
          <h1 className="text-2xl text-white font-medium mb-2">
            Welcome to student registration
          </h1>
          <p className="text-sm text-secondary">
            Begin your enrolment for the 2026/2027 academic year. Choose your
            degree level and registration type to get started. Follow the steps
            to submit your application successfully.
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
