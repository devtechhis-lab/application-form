import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Check,
  GraduationCap,
  RefreshCcw,
  Sparkle,
  UserPlus,
} from "lucide-react";
import { WelcomeSchema, type WelcomeErrors } from "@/utils/Schema";

const WelcomePage = ({
  setDegree,
  degree,
  setType,
  type,
  setIsWelcome,
}: {
  setDegree: (degree: string) => void;
  degree: string;
  setType: (type: string) => void;
  type: string;
  setIsWelcome: (isWelcome: boolean) => void;
}) => {
  const [errors, setErrors] = useState<WelcomeErrors>({});

  const handleDegree = (value: string) => {
    setDegree(value);
    setErrors((prev) => ({ ...prev, degree: undefined }));
  };

  const handleType = (value: string) => {
    setType(value);
    setErrors((prev) => ({ ...prev, type: undefined }));
  };

  const handleStart = () => {
    const result = WelcomeSchema.safeParse({ degree, type });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        degree: fieldErrors.degree?.[0],
        type: fieldErrors.type?.[0],
      });
      return;
    }
    setErrors({});
    setIsWelcome(false);
  };

  return (
    <>
      <div className="px-7 py-5 flex flex-col gap-5">
        <div className="flex flex-col items-start justify-center gap-4">
          <div>
            <span className="flex items-center gap-2 text-[12px] font-medium capitalize tracking-wider text-primary-500">
              <GraduationCap size={14} />
              Degree Level
            </span>
            <p className=" text-[12px] text-slate-500">
              Which programme level are you registering for?
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleDegree("license")}
              className={`flex-1 relative flex flex-col rounded-xl border-[1.5px] p-4.5 text-left transition ${
                degree === "license"
                  ? "border-primary-500 bg-gray-50"
                  : errors.degree
                    ? "border-red-400 bg-white hover:border-primary-500 hover:bg-gray-50"
                    : "border-secondary bg-white hover:border-primary-500 hover:bg-gray-50"
              }`}
            >
              <span
                className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition ${
                  degree === "license"
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-secondary text-transparent"
                }`}
              >
                <Check
                  size={12}
                  className={degree === "license" ? "opacity-100" : "opacity-0"}
                />
              </span>

              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  degree === "license"
                    ? "bg-primary-500 text-white"
                    : "bg-secondary text-primary-500"
                }`}
              >
                <GraduationCap size={21} />
              </span>

              <span className="text-[15px] font-medium text-[#16243f]">
                License Degree
              </span>
              <span className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                Undergraduate Degree 3 Years (Bac+3)
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleDegree("master")}
              className={`flex-1 relative flex flex-col rounded-xl border-[1.5px] p-4.5 text-left transition ${
                degree === "master"
                  ? "border-primary-500 bg-gray-50"
                  : errors.degree
                    ? "border-red-400 bg-white hover:border-primary-500 hover:bg-gray-50"
                    : "border-secondary bg-white hover:border-primary-500 hover:bg-gray-50"
              }`}
            >
              <span
                className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition ${
                  degree === "master"
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-secondary text-transparent"
                }`}
              >
                <Check
                  size={12}
                  className={degree === "master" ? "opacity-100" : "opacity-0"}
                />
              </span>

              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  degree === "master"
                    ? "bg-primary-500 text-white"
                    : "bg-secondary text-primary-500"
                }`}
              >
                <Award size={21} />
              </span>

              <span className="text-[15px] font-medium text-[#16243f]">
                Master Degree
              </span>
              <span className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                Graduate Degree 2 Years (Bac+5)
              </span>
            </button>
          </div>
          {errors.degree && (
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-red-500">
              <AlertCircle size={13} />
              {errors.degree}
            </span>
          )}
        </div>
        <span className="w-full h-0.5 bg-secondary rounded-full"></span>
        <div className="flex flex-col items-start justify-center gap-4">
          <div>
            <span className="flex items-center gap-2 text-[12px] font-medium capitalize tracking-wider text-primary-500">
              <UserPlus size={14} />
              Registration Type
            </span>
            <p className=" text-[12px] text-slate-500">
              Are you joining for the first time or continuing your studies?
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleType("newRegistration")}
              className={`flex-1 relative flex flex-col rounded-xl border-[1.5px] p-4.5 text-left transition ${
                type === "newRegistration"
                  ? "border-primary-500 bg-gray-50"
                  : errors.type
                    ? "border-red-400 bg-white hover:border-primary-500 hover:bg-gray-50"
                    : "border-secondary bg-white hover:border-primary-500 hover:bg-gray-50"
              }`}
            >
              <span
                className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition ${
                  type === "newRegistration"
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-secondary text-transparent"
                }`}
              >
                <Check
                  size={12}
                  className={
                    type === "newRegistration" ? "opacity-100" : "opacity-0"
                  }
                />
              </span>

              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  type === "newRegistration"
                    ? "bg-primary-500 text-white"
                    : "bg-secondary text-primary-500"
                }`}
              >
                <Sparkle size={21} />
              </span>

              <span className="text-[15px] font-medium text-[#16243f]">
                New Registration
              </span>
              <span className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                First time enrolling at the university
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleType("reRegistration")}
              className={`flex-1 relative flex flex-col rounded-xl border-[1.5px] p-4.5 text-left transition ${
                type === "reRegistration"
                  ? "border-primary-500 bg-gray-50"
                  : errors.type
                    ? "border-red-400 bg-white hover:border-primary-500 hover:bg-gray-50"
                    : "border-secondary bg-white hover:border-primary-500 hover:bg-gray-50"
              }`}
            >
              <span
                className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition ${
                  type === "reRegistration"
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-secondary text-transparent"
                }`}
              >
                <Check
                  size={12}
                  className={
                    type === "reRegistration" ? "opacity-100" : "opacity-0"
                  }
                />
              </span>

              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  type === "reRegistration"
                    ? "bg-primary-500 text-white"
                    : "bg-secondary text-primary-500"
                }`}
              >
                <RefreshCcw size={21} />
              </span>

              <span className="text-[15px] font-medium text-[#16243f]">
                Re-registration
              </span>
              <span className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                Returning student renewing enrolment
              </span>
            </button>
          </div>
          {errors.type && (
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-red-500">
              <AlertCircle size={13} />
              {errors.type}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 pt-5 pb-6 border-t border-secondary flex items-center justify-end">
        <button
          type="button"
          onClick={handleStart}
          className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium flex items-center px-4 py-2.5 rounded-md cursor-pointer gap-1.5"
        >
          Start Registration
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default WelcomePage;
