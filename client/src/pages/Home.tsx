import { useState } from "react";
import Header from "@/components/Header";
import WelcomePage from "./WelcomePage";
import ApplicationForm from "./ApplicationForm";

const Home = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [degree, setDegree] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="max-w-3xl w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <Header isWelcome={isWelcome} />
        {/* Body */}
        {isWelcome ? (
          <WelcomePage
            degree={degree}
            setDegree={setDegree}
            type={type}
            setType={setType}
            setIsWelcome={setIsWelcome}
          />
        ) : (
          <ApplicationForm
            degree={degree}
            type={type}
            setIsWelcome={setIsWelcome}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
