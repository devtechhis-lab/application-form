import { Check } from "lucide-react";

const Stepper = ({ current, STEPS }: { current: number; STEPS: any[] }) => {
  return (
    <div className="flex items-start w-full">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const { Icon, key, label } = s;

        return (
          <div
            key={key}
            className={`relative flex flex-1 flex-col items-center gap-1.5`}
          >
            {i < STEPS.length - 1 && (
              <span
                className={`absolute left-1/2 top-4.25 z-0 h-0.5 w-full transition-colors ${
                  done ? "bg-[#1e3c73]" : "bg-[#d2d8e3]"
                }`}
              />
            )}
            <span
              className={`z-10 flex h-8.5 w-8.5 items-center justify-center rounded-full border-2 text-sm transition-all ${
                active || done
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-secondary bg-secondary text-primary-500"
              }`}
            >
              {done ? <Check size={16} /> : <Icon size={16} />}
            </span>
            <span
              className={` text-center text-[11px] leading-tight transition-colors ${
                active || done
                  ? "font-medium text-primary-500"
                  : "text-slate-500"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
