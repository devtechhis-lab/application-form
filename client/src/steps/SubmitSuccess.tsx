import { Check } from "lucide-react";


function SubmitSuccess() {
  return (
    <div className="px-4 py-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3c73] text-white">
        <Check size={32} />
      </div>
      <h3 className="mb-1 text-lg font-medium text-[#1e3c73]">
        Application submitted
      </h3>
      <p className="text-sm text-slate-500">
        Thank you. We've received your enrolment application and will be in
        touch by email.
      </p>

    </div>
  );
}

export default SubmitSuccess;
