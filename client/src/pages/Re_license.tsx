import { useState } from "react";
import Stepper from "@/components/Stepper";
import { ClipboardCheck, GraduationCap, Send, User } from "lucide-react";
import PersonalInfo from "@/steps/PersonalInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReLicenseSchema, fieldsByStep } from "@/utils/Schema";
import ReviewSubmit from "@/steps/ReviewSubmit";
import SubmitSuccess from "@/steps/SubmitSuccess";
import ChooseMajor from "@/steps/ReLicMajor";
import { Spinner } from "@/components/ui/spinner";

const baseDefaultValues = {
  firstName: "",
  lastName: "",
  firstNameLatin: "",
  lastNameLatin: "",
  gender: "",
  familyStatus: "",
  nationality: "",
  NIN: "",
  dateOfExpiration: "",
  dateOfBirth: "",
  birthCountry: "",
  birthWillaya: "",
  birthCommune: "",
  birthAddress: "",
  residenceWillaya: "",
  residenceCommune: "",
  residenceAddress: "",
  email: "",
  phoneNumber1: "",
  phoneNumber2: "",
  medicalCondition: "",
  majors: [],
  language: "",
};

const ReLicense = ({
  setIsWelcome,
  degree,
  type,
}: {
  setIsWelcome: (isWelcome: boolean) => void;
  degree: string;
  type: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const defaultValues = { degree, type, ...baseDefaultValues };
  const STEPS = [
    { key: "personal", label: "Personal info", Icon: User },
    { key: "major", label: "Choose major", Icon: GraduationCap },
    { key: "review", label: "Review & submit", Icon: ClipboardCheck },
  ];

  const form = useForm<any>({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(ReLicenseSchema),
  });

  const goNext = async () => {
    const valid = await form.trigger(fieldsByStep.reLicense[current] as any);
    if (valid) setCurrent((c) => c + 1);
  };

  const onSubmit = async (data: any) => {
    // The whole flow is one <form>, so pressing Enter in any input fires this
    // handler from earlier steps too. Only finalize from the review step;
    // otherwise treat it like Continue so we never skip review.
    // if (current < 2) {
    //   goNext();
    //   return;
    // }
    setLoading(true);
    try {
      const res = await fetch(
        "https://application-form-vdtx.onrender.com/api/v1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCurrent((c) => c + 1);
      } else {
        console.log(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (current > 2) {
    return <SubmitSuccess />;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex items-start flex-col px-7 py-5 gap-5">
        <Stepper current={current} STEPS={STEPS} />
        {current === 0 && <PersonalInfo form={form} />}
        {current === 1 && <ChooseMajor form={form} />}
        {current === 2 && <ReviewSubmit form={form} path="reLicense" />}
      </div>

      <div className="px-7 pt-5 pb-6 border-t border-secondary flex items-center justify-between">
        {current === 0 ? (
          <button
            type="button"
            onClick={() => setIsWelcome(true)}
            className="border-[1.5px] border-slate-500 hover:border-primary-500 text-slate-500 hover:text-primary-500 text-sm font-medium flex items-center justify-center px-4 py-2.5 rounded-md cursor-pointer"
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrent(current - 1)}
            className="border-[1.5px] border-slate-500 hover:border-primary-500 text-slate-500 hover:text-primary-500 text-sm font-medium flex items-center px-4 py-2.5 rounded-md cursor-pointer transition-all"
          >
            Back
          </button>
        )}

        {current === 2 ? (
          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium flex items-center px-4 py-2.5 rounded-md cursor-pointer"
          >
            {loading ? (
              <>
                <Spinner /> Loading
              </>
            ) : (
              <>Submit</>
            )}
            <Send size={15} className="ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium flex items-center px-4 py-2.5 rounded-md cursor-pointer"
          >
            Continue
          </button>
        )}
      </div>
    </form>
  );
};

export default ReLicense;
