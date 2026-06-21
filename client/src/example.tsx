import React, { useState, useMemo } from "react";
import {
  User,
  BookOpen,
  GraduationCap,
  Files,
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  Send,
  Check,
  CloudUpload,
  FileText,
  IdCard,
  Image as ImageIcon,
  AlertCircle,
  Pencil,
  Languages,
  Wallet,
  ChevronUp,
  ChevronDown,
  X,
  Trophy,
} from "lucide-react";

/**
 * University Enrollment Form — multi-step
 * Palette: navy #1e3c73 / mist #d2d8e3
 * Steps: Personal info · Academic info · Choose major · Documents · Review & submit
 * Tailwind required. Custom colors use arbitrary values, so no config changes.
 */

const STEPS = [
  { key: "personal", label: "Personal info", Icon: User },
  { key: "academic", label: "Academic info", Icon: BookOpen },
  { key: "major", label: "Choose major", Icon: GraduationCap },
  { key: "documents", label: "Documents", Icon: Files },
  { key: "review", label: "Review & submit", Icon: ClipboardCheck },
];

const NATIONALITIES = ["Algeria", "Tunisia", "Morocco", "France", "Other"];
const PROGRAMS = [
  "Computer Science (BSc)",
  "Mechanical Engineering (BEng)",
  "Business Administration (BBA)",
  "Architecture (BArch)",
  "Law (LLB)",
];

const MAJORS = [
  {
    id: "cs",
    name: "Computer Science",
    language: "English",
    total: 480000,
    firstInstallment: 120000,
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    language: "English",
    total: 510000,
    firstInstallment: 130000,
  },
  {
    id: "ba",
    name: "Business Administration",
    language: "French",
    total: 420000,
    firstInstallment: 105000,
  },
  {
    id: "arch",
    name: "Architecture",
    language: "French",
    total: 560000,
    firstInstallment: 140000,
  },
  {
    id: "law",
    name: "Law",
    language: "Arabic",
    total: 390000,
    firstInstallment: 98000,
  },
  {
    id: "med",
    name: "Biomedical Sciences",
    language: "English",
    total: 620000,
    firstInstallment: 160000,
  },
];

const MAX_CHOICES = 3;
const RANK_LABELS = ["1st choice", "2nd choice", "3rd choice"];

const EMPTY_FORM = {
  first: "",
  last: "",
  email: "",
  phone: "",
  dob: "",
  nationality: "",
  address: "",
  program: "",
  term: "Autumn 2026",
  school: "",
  gradYear: "",
  gpa: "",
  mode: "Full-time",
  statement: "",
};

const fmtMoney = (n) => "DZD " + n.toLocaleString("en-US");

/* ---------- small presentational helpers ---------- */

function Field({ label, required, full, children }) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-xs font-medium text-slate-500">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#d2d8e3] bg-white px-3 py-2.5 text-sm text-slate-800 " +
  "outline-none transition focus:border-[#1e3c73] focus:ring-4 focus:ring-[#1e3c73]/15 " +
  "placeholder:text-slate-400";

const Input = (props) => <input {...props} className={inputClass} />;
const Select = ({ children, ...props }) => (
  <select {...props} className={inputClass}>
    {children}
  </select>
);
const Textarea = (props) => <textarea {...props} className={inputClass} />;

function ReviewItem({ k, v }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">
        {k}
      </div>
      <div className="mt-0.5 text-sm text-slate-800">
        {v && String(v).trim() ? v : "—"}
      </div>
    </div>
  );
}

/* ---------- stepper ---------- */

function Stepper({ current, maxReached, onJump }) {
  return (
    <div className="flex items-start px-7 pt-5">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = i <= maxReached;
        const { Icon } = s;
        return (
          <div
            key={s.key}
            onClick={() => clickable && onJump(i)}
            className={`relative flex flex-1 flex-col items-center ${
              clickable ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {i < STEPS.length - 1 && (
              <span
                className={`absolute left-1/2 top-[17px] z-0 h-0.5 w-full transition-colors ${
                  done ? "bg-[#1e3c73]" : "bg-[#d2d8e3]"
                }`}
              />
            )}
            <span
              className={`z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 text-sm transition-all ${
                active
                  ? "border-[#1e3c73] bg-[#1e3c73] text-white"
                  : done
                    ? "border-[#1e3c73] bg-white text-[#1e3c73]"
                    : "border-[#d2d8e3] bg-[#d2d8e3] text-[#1e3c73]"
              }`}
            >
              {done ? <Check size={16} /> : <Icon size={16} />}
            </span>
            <span
              className={`mt-1.5 text-center text-[11px] leading-tight transition-colors ${
                active || done ? "font-medium text-[#1e3c73]" : "text-slate-500"
              }`}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- step panes ---------- */

function PersonalStep({ form, set }) {
  return (
    <div>
      <h3 className="mb-1 mt-1 text-base font-medium text-[#1e3c73]">
        Personal information
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Tell us a little about yourself. Fields marked with an asterisk are
        required.
      </p>
      <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field label="First name" required>
          <Input
            value={form.first}
            onChange={(e) => set("first", e.target.value)}
            placeholder="Amina"
          />
        </Field>
        <Field label="Last name" required>
          <Input
            value={form.last}
            onChange={(e) => set("last", e.target.value)}
            placeholder="Belkacem"
          />
        </Field>
        <Field label="Email address" required>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="amina@email.com"
          />
        </Field>
        <Field label="Phone">
          <Input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+213 ..."
          />
        </Field>
        <Field label="Date of birth">
          <Input
            type="date"
            value={form.dob}
            onChange={(e) => set("dob", e.target.value)}
          />
        </Field>
        <Field label="Nationality">
          <Select
            value={form.nationality}
            onChange={(e) => set("nationality", e.target.value)}
          >
            <option value="">Select…</option>
            {NATIONALITIES.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Field label="Residential address" full>
          <Input
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Street, city, postal code"
          />
        </Field>
      </div>
    </div>
  );
}

function AcademicStep({ form, set }) {
  return (
    <div>
      <h3 className="mb-1 mt-1 text-base font-medium text-[#1e3c73]">
        Academic information
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Your prior education and the programme you wish to join.
      </p>
      <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field label="Programme of study" required>
          <Select
            value={form.program}
            onChange={(e) => set("program", e.target.value)}
          >
            <option value="">Select…</option>
            {PROGRAMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="Intended start term">
          <Select
            value={form.term}
            onChange={(e) => set("term", e.target.value)}
          >
            <option>Autumn 2026</option>
            <option>Spring 2027</option>
          </Select>
        </Field>
        <Field label="Previous institution">
          <Input
            value={form.school}
            onChange={(e) => set("school", e.target.value)}
            placeholder="High school / college"
          />
        </Field>
        <Field label="Graduation year">
          <Input
            value={form.gradYear}
            onChange={(e) => set("gradYear", e.target.value)}
            placeholder="2026"
          />
        </Field>
        <Field label="GPA / average">
          <Input
            value={form.gpa}
            onChange={(e) => set("gpa", e.target.value)}
            placeholder="3.8 / 4.0"
          />
        </Field>
        <Field label="Study mode">
          <Select
            value={form.mode}
            onChange={(e) => set("mode", e.target.value)}
          >
            <option>Full-time</option>
            <option>Part-time</option>
          </Select>
        </Field>
        <Field label="Statement of interest" full>
          <Textarea
            rows={3}
            value={form.statement}
            onChange={(e) => set("statement", e.target.value)}
            placeholder="Briefly, why this programme?"
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Choose major step ---------- */

function MajorCard({ major, selectedRank, disabled, onToggle }) {
  const selected = selectedRank > 0;
  return (
    <button
      type="button"
      onClick={() => !(!selected && disabled) && onToggle(major.id)}
      className={`group relative flex w-full flex-col rounded-xl border p-4 text-left transition ${
        selected
          ? "border-[#1e3c73] bg-[#1e3c73]/[0.04] ring-1 ring-[#1e3c73]"
          : disabled
            ? "cursor-not-allowed border-[#d2d8e3] bg-slate-50 opacity-55"
            : "border-[#d2d8e3] bg-white hover:border-[#1e3c73] hover:shadow-sm"
      }`}
    >
      {/* selection indicator */}
      <span
        className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition ${
          selected
            ? "bg-[#1e3c73] text-white"
            : "border border-[#d2d8e3] text-transparent group-hover:border-[#1e3c73]"
        }`}
      >
        {selected ? selectedRank : ""}
      </span>

      <div className="mb-3 flex items-start gap-2.5 pr-7">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#d2d8e3] text-[#1e3c73]">
          <GraduationCap size={18} />
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-800">
            {major.name}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <Languages size={13} />
            {major.language}
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#d2d8e3] pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-slate-400">
            Total price
          </div>
          <div className="text-[13px] font-semibold text-[#1e3c73]">
            {fmtMoney(major.total)}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-slate-400">
            <Wallet size={11} />
            First installment
          </div>
          <div className="text-[13px] font-semibold text-slate-700">
            {fmtMoney(major.firstInstallment)}
          </div>
        </div>
      </div>
    </button>
  );
}

function RankPanel({ ranked, onMove, onRemove }) {
  if (ranked.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#d2d8e3] bg-slate-50 px-4 py-8 text-center">
        <Trophy size={22} className="text-[#1e3c73]/40" />
        <p className="mt-2 text-xs text-slate-500">
          Select up to three majors.
          <br />
          Your ranked choices will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {ranked.map((m, i) => (
        <div
          key={m.id}
          className="flex items-center gap-3 rounded-xl border border-[#d2d8e3] bg-white p-3"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3c73] text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-slate-800">
              {m.name}
            </div>
            <div className="text-[11px] text-slate-500">
              {RANK_LABELS[i]} · {m.language} · {fmtMoney(m.firstInstallment)}{" "}
              first
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => onMove(i, -1)}
              disabled={i === 0}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-[#d2d8e3] text-[#1e3c73] transition hover:bg-[#d2d8e3]/40 disabled:opacity-30"
              aria-label="Move up"
            >
              <ChevronUp size={14} />
            </button>
            <button
              type="button"
              onClick={() => onMove(i, 1)}
              disabled={i === ranked.length - 1}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-[#d2d8e3] text-[#1e3c73] transition hover:bg-[#d2d8e3]/40 disabled:opacity-30"
              aria-label="Move down"
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(m.id)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Remove"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

function MajorStep({ selectedIds, toggle, move, remove }) {
  const rankOf = (id) => selectedIds.indexOf(id) + 1; // 0 if not selected
  const atLimit = selectedIds.length >= MAX_CHOICES;
  const ranked = selectedIds.map((id) => MAJORS.find((m) => m.id === id));

  return (
    <div>
      <div className="mb-1 mt-1 flex items-center justify-between">
        <h3 className="text-base font-medium text-[#1e3c73]">
          Choose your major
        </h3>
        <span className="rounded-full bg-[#d2d8e3] px-2.5 py-1 text-[11px] font-medium text-[#1e3c73]">
          {selectedIds.length} / {MAX_CHOICES} selected
        </span>
      </div>
      <p className="mb-5 text-sm text-slate-500">
        Pick up to three majors, then rank them in order of preference. Tap a
        card to select; the number shows its current rank.
      </p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        {/* cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MAJORS.map((m) => (
            <MajorCard
              key={m.id}
              major={m}
              selectedRank={rankOf(m.id)}
              disabled={atLimit}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* ranking rail */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
            <Trophy size={13} className="text-[#1e3c73]" />
            Your ranking
          </div>
          <RankPanel ranked={ranked} onMove={move} onRemove={remove} />
        </div>
      </div>
    </div>
  );
}

function DocumentsStep({ docs }) {
  return (
    <div>
      <h3 className="mb-1 mt-1 text-base font-medium text-[#1e3c73]">
        Supporting documents
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Upload PDF or image files, up to 10&nbsp;MB each. These are required for
        review.
      </p>

      <div className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-dashed border-[#d2d8e3] bg-slate-50 p-5 transition hover:border-[#1e3c73] hover:bg-[#1e3c73]/5">
        <CloudUpload size={26} className="text-[#1e3c73]" />
        <span className="text-sm font-medium text-[#1e3c73]">
          Drag files here or browse
        </span>
        <span className="text-[11.5px] text-slate-500">
          PDF, JPG or PNG · max 10 MB
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {docs.map((d) => {
          const { Icon } = d;
          const pending = d.status === "pending";
          return (
            <div
              key={d.name}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-3"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#d2d8e3] text-[#1e3c73]">
                <Icon size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-800">
                  {d.name}
                </div>
                <div className="text-[11.5px] text-slate-500">{d.meta}</div>
              </div>
              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                  pending
                    ? "bg-red-50 text-red-700"
                    : "bg-[#d2d8e3] text-[#1e3c73]"
                }`}
              >
                {pending ? <AlertCircle size={13} /> : <Check size={13} />}
                {pending ? "Pending" : "Ready"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewStep({
  form,
  docs,
  rankedMajors,
  agree,
  setAgree,
  agreeError,
  onEdit,
}) {
  return (
    <div>
      <h3 className="mb-1 mt-1 text-base font-medium text-[#1e3c73]">
        Review &amp; submit
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Please confirm your details are correct before submitting.
      </p>

      <ReviewCard title="Personal info" Icon={User} onEdit={() => onEdit(0)}>
        <ReviewItem k="Name" v={`${form.first} ${form.last}`.trim()} />
        <ReviewItem k="Email" v={form.email} />
        <ReviewItem k="Phone" v={form.phone} />
        <ReviewItem k="Date of birth" v={form.dob} />
        <ReviewItem k="Nationality" v={form.nationality} />
        <ReviewItem k="Address" v={form.address} />
      </ReviewCard>

      <ReviewCard
        title="Academic info"
        Icon={BookOpen}
        onEdit={() => onEdit(1)}
      >
        <ReviewItem k="Programme" v={form.program} />
        <ReviewItem k="Start term" v={form.term} />
        <ReviewItem k="Previous school" v={form.school} />
        <ReviewItem k="Graduation" v={form.gradYear} />
        <ReviewItem k="GPA" v={form.gpa} />
        <ReviewItem k="Study mode" v={form.mode} />
      </ReviewCard>

      <ReviewCard
        title="Major choices"
        Icon={GraduationCap}
        onEdit={() => onEdit(2)}
      >
        {rankedMajors.length === 0 ? (
          <div className="sm:col-span-2 text-sm text-slate-400">
            No majors selected
          </div>
        ) : (
          rankedMajors.map((m, i) => (
            <div key={m.id} className="sm:col-span-2 flex items-center gap-2.5">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3c73] text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-slate-800">
                <span className="font-medium">{m.name}</span>
                <span className="text-slate-500">
                  {" "}
                  · {m.language} · {fmtMoney(m.total)} (
                  {fmtMoney(m.firstInstallment)} first)
                </span>
              </span>
            </div>
          ))
        )}
      </ReviewCard>

      <ReviewCard title="Documents" Icon={Files} onEdit={() => onEdit(3)}>
        {docs.map((d) => (
          <ReviewItem
            key={d.name}
            k={d.name}
            v={d.status === "pending" ? "Pending" : "Uploaded"}
          />
        ))}
      </ReviewCard>

      <div
        className={`mt-1 flex items-start gap-2.5 rounded-md bg-slate-50 px-3.5 py-3 ${
          agreeError ? "outline outline-2 outline-offset-2 outline-red-600" : ""
        }`}
      >
        <input
          id="agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 accent-[#1e3c73]"
        />
        <label
          htmlFor="agree"
          className="text-xs leading-relaxed text-slate-500"
        >
          I certify that the information provided is accurate and complete, and
          I agree to the university's admissions terms and data-processing
          policy.
        </label>
      </div>
    </div>
  );
}

function ReviewCard({ title, Icon, onEdit, children }) {
  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2.5">
        <span className="flex items-center gap-2 text-sm font-medium text-[#1e3c73]">
          <Icon size={15} />
          {title}
        </span>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-[#1e3c73] hover:underline"
        >
          <Pencil size={13} />
          Edit
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 px-3.5 py-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function SuccessState() {
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
      <div className="mt-3.5 inline-block rounded-full bg-[#d2d8e3] px-3.5 py-1.5 text-[12.5px] font-medium text-[#1e3c73]">
        Reference · NCU-2026-48217
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export default function EnrollmentForm() {
  const [current, setCurrent] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedIds, setSelectedIds] = useState([]); // ordered = ranking
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const submitted = current >= STEPS.length;

  const docs = useMemo(
    () => [
      {
        name: "Academic transcript",
        meta: "transcript_2026.pdf · 1.2 MB",
        status: "ready",
        Icon: FileText,
      },
      {
        name: "Identity document",
        meta: "national_id.jpg · 640 KB",
        status: "ready",
        Icon: IdCard,
      },
      {
        name: "Passport photo",
        meta: "Required · not uploaded",
        status: "pending",
        Icon: ImageIcon,
      },
    ],
    [],
  );

  const rankedMajors = useMemo(
    () => selectedIds.map((id) => MAJORS.find((m) => m.id === id)),
    [selectedIds],
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // major selection / ranking
  const toggleMajor = (id) =>
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_CHOICES) return prev;
      return [...prev, id];
    });
  const moveMajor = (index, dir) =>
    setSelectedIds((prev) => {
      const next = [...prev];
      const t = index + dir;
      if (t < 0 || t >= next.length) return prev;
      [next[index], next[t]] = [next[t], next[index]];
      return next;
    });
  const removeMajor = (id) =>
    setSelectedIds((prev) => prev.filter((x) => x !== id));

  const goTo = (i) => {
    setCurrent(i);
    setMaxReached((m) => Math.max(m, i));
  };
  const next = () => {
    if (current === STEPS.length - 1) {
      if (!agree) {
        setAgreeError(true);
        return;
      }
      goTo(STEPS.length);
      return;
    }
    goTo(current + 1);
  };
  const back = () => current > 0 && setCurrent(current - 1);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-[760px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* header */}
        <div className="bg-[#1e3c73] px-7 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#d2d8e3]/20 text-white">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="text-xl font-medium leading-tight text-white">
                Undergraduate enrolment
              </h1>
              <p className="text-[13px] text-[#d2d8e3]">
                Northcrest University · Admissions 2026
              </p>
            </div>
          </div>
        </div>

        {!submitted && (
          <Stepper current={current} maxReached={maxReached} onJump={goTo} />
        )}

        {/* body */}
        <div className="px-7 pb-5 pt-3">
          {submitted ? (
            <SuccessState />
          ) : current === 0 ? (
            <PersonalStep form={form} set={set} />
          ) : current === 1 ? (
            <AcademicStep form={form} set={set} />
          ) : current === 2 ? (
            <MajorStep
              selectedIds={selectedIds}
              toggle={toggleMajor}
              move={moveMajor}
              remove={removeMajor}
            />
          ) : current === 3 ? (
            <DocumentsStep docs={docs} />
          ) : (
            <ReviewStep
              form={form}
              docs={docs}
              rankedMajors={rankedMajors}
              agree={agree}
              setAgree={(v) => {
                setAgree(v);
                if (v) setAgreeError(false);
              }}
              agreeError={agreeError}
              onEdit={goTo}
            />
          )}
        </div>

        {/* footer */}
        {!submitted && (
          <div className="flex items-center justify-between border-t border-slate-200 px-7 pb-6 pt-4">
            <span className="text-xs text-slate-500">
              Step {current + 1} of {STEPS.length}
            </span>
            <div className="flex gap-2.5">
              <button
                onClick={back}
                className={`flex items-center gap-1.5 rounded-md border border-[#d2d8e3] bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#1e3c73] transition hover:bg-slate-50 active:scale-[.98] ${
                  current === 0 ? "invisible" : ""
                }`}
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={next}
                className="flex items-center gap-1.5 rounded-md border border-[#1e3c73] bg-[#1e3c73] px-4 py-2.5 text-[13.5px] font-medium text-white transition hover:bg-[#2a4d8a] active:scale-[.98]"
              >
                {current === STEPS.length - 1 ? (
                  <>
                    Submit application <Send size={16} />
                  </>
                ) : (
                  <>
                    Continue <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   Building2,
//   GraduationCap,
//   Award,
//   Sparkles,
//   RefreshCw,
//   ArrowRight,
//   Check,
//   Clock,
//   Smartphone,
//   ScrollText,
//   UserPlus,
// } from "lucide-react";

// /**
//  * Student Registration — Welcome / entry page (first design)
//  * Palette: navy #1e3c73 / mist #d2d8e3
//  *
//  * Faithful React + Tailwind port of the original welcome widget:
//  *  - navy hero with concentric decorative rings + crest
//  *  - 3-stage roadmap
//  *  - two stacked choice sections: degree level (License / Master)
//  *    and registration type (New / Re-registration)
//  *  - live summary line + gated "Start registration" button
//  *  - footer with deadline / save-resume / help
//  *
//  * Tailwind required. Custom colors use arbitrary values (no config changes).
//  * onStart({ degree, type }) fires when the user begins registration.
//  */

// const DEGREES = [
//   {
//     id: "License",
//     Icon: GraduationCap,
//     title: "License",
//     desc: "Undergraduate degree · 3 years (Bac+3)",
//   },
//   {
//     id: "Master",
//     Icon: Award,
//     title: "Master",
//     desc: "Graduate degree · 2 years (Bac+5)",
//   },
// ];

// const TYPES = [
//   {
//     id: "New registration",
//     Icon: Sparkles,
//     title: "New registration",
//     desc: "First time enrolling at the university",
//   },
//   {
//     id: "Re-registration",
//     Icon: RefreshCw,
//     title: "Re-registration",
//     desc: "Returning student renewing enrolment",
//   },
// ];

// const HERO_STEPS = ["Choose options", "Complete form", "Submit"];

// function OptionCard({ option, selected, onSelect }) {
//   const { Icon } = option;
//   return (
//     <button
//       type="button"
//       onClick={() => onSelect(option.id)}
//       aria-pressed={selected}
//       className={`group relative flex min-h-[118px] flex-col rounded-xl border-[1.5px] p-[18px] text-left transition ${
//         selected
//           ? "border-[#1e3c73] bg-[#1e3c73]/[0.05] shadow-[0_0_0_1px_#1e3c73]"
//           : "border-[#d2d8e3] bg-white hover:border-[#1e3c73] hover:bg-[#1e3c73]/[0.03]"
//       }`}
//     >
//       <span
//         className={`absolute right-[14px] top-[14px] flex h-[21px] w-[21px] items-center justify-center rounded-full border-[1.5px] transition ${
//           selected
//             ? "border-[#1e3c73] bg-[#1e3c73] text-white"
//             : "border-[#d2d8e3] text-transparent"
//         }`}
//       >
//         <Check size={12} className={selected ? "opacity-100" : "opacity-0"} />
//       </span>

//       <span
//         className={`mb-[11px] flex h-10 w-10 items-center justify-center rounded-[11px] transition ${
//           selected ? "bg-[#1e3c73] text-white" : "bg-[#d2d8e3] text-[#1e3c73]"
//         }`}
//       >
//         <Icon size={21} />
//       </span>

//       <span className="text-[15px] font-medium text-[#16243f]">
//         {option.title}
//       </span>
//       <span className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
//         {option.desc}
//       </span>
//     </button>
//   );
// }

// function SectionHead({ icon: Icon, label, step }) {
//   return (
//     <div className="mb-1 flex items-baseline justify-between">
//       <span className="flex items-center gap-[7px] text-[11px] font-medium uppercase tracking-wider text-[#1e3c73]">
//         <Icon size={14} />
//         {label}
//       </span>
//       <span className="text-[11px] text-slate-400">{step}</span>
//     </div>
//   );
// }

// export default function WelcomePage({ onStart }) {
//   const [degree, setDegree] = useState(null);
//   const [type, setType] = useState(null);
//   const ready = degree && type;

//   const summary = ready ? (
//     <>
//       You're registering for a{" "}
//       <span className="font-medium text-[#1e3c73]">{degree}</span> programme ·{" "}
//       <span className="font-medium text-[#1e3c73]">{type}</span>.
//     </>
//   ) : degree || type ? (
//     <>
//       Selected:{" "}
//       <span className="font-medium text-[#1e3c73]">{degree || type}</span>.{" "}
//       <span className="text-slate-400">
//         Pick the remaining option to continue.
//       </span>
//     </>
//   ) : (
//     <span className="text-slate-400">
//       Select a degree level and registration type to continue.
//     </span>
//   );

//   const handleStart = () => {
//     if (ready) onStart?.({ degree, type });
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans">
//       <div className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         {/* hero */}
//         <div className="relative overflow-hidden bg-[#1e3c73] px-[30px] pb-8 pt-9">
//           {/* decorative rings */}
//           <span className="pointer-events-none absolute -right-[50px] -top-[90px] h-[230px] w-[230px] rounded-full border-[1.5px] border-[#d2d8e3]/[0.16]" />
//           <span className="pointer-events-none absolute right-[30px] -top-[40px] h-[150px] w-[150px] rounded-full border-[1.5px] border-[#d2d8e3]/[0.16]" />

//           <div className="relative mb-5 inline-flex items-center gap-2.5">
//             <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-[#d2d8e3] text-white">
//               <Building2 size={18} />
//             </span>
//             <span className="leading-tight">
//               <span className="block text-[13px] font-medium text-white">
//                 Northcrest University
//               </span>
//               <span className="block text-[10px] tracking-widest text-[#d2d8e3]">
//                 ADMISSIONS PORTAL
//               </span>
//             </span>
//           </div>

//           <h1 className="relative mb-2 max-w-xl text-[26px] font-medium leading-tight text-white">
//             Welcome to student registration
//           </h1>
//           <p className="relative max-w-md text-sm leading-relaxed text-[#d2d8e3]">
//             Begin your enrolment for the 2026 academic year. Choose your degree
//             level and registration type to get started — it only takes a few
//             minutes.
//           </p>

//           <div className="relative mt-6 flex flex-wrap gap-x-[18px] gap-y-2">
//             {HERO_STEPS.map((s, i) => (
//               <span
//                 key={s}
//                 className="flex items-center gap-2 text-xs text-[#d2d8e3]"
//               >
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.14] text-[11px] font-medium text-white">
//                   {i + 1}
//                 </span>
//                 {s}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* body */}
//         <div className="px-[30px] pb-[30px] pt-[26px]">
//           {/* degree */}
//           <SectionHead
//             icon={ScrollText}
//             label="Degree level"
//             step="Step 1 of 2"
//           />
//           <p className="mb-[18px] mt-[-2px] text-[12.5px] text-slate-500">
//             Which programme level are you registering for?
//           </p>
//           <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
//             {DEGREES.map((d) => (
//               <OptionCard
//                 key={d.id}
//                 option={d}
//                 selected={degree === d.id}
//                 onSelect={setDegree}
//               />
//             ))}
//           </div>

//           <div className="my-6 h-px bg-[#d2d8e3]" />

//           {/* type */}
//           <SectionHead
//             icon={UserPlus}
//             label="Registration type"
//             step="Step 2 of 2"
//           />
//           <p className="mb-[18px] mt-[-2px] text-[12.5px] text-slate-500">
//             Are you joining for the first time or continuing your studies?
//           </p>
//           <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
//             {TYPES.map((t) => (
//               <OptionCard
//                 key={t.id}
//                 option={t}
//                 selected={type === t.id}
//                 onSelect={setType}
//               />
//             ))}
//           </div>

//           {/* cta */}
//           <div className="mt-[26px] flex flex-col items-stretch gap-[14px] border-t border-slate-200 pt-[21px] sm:flex-row sm:items-center sm:justify-between">
//             <div className="text-[12.5px] leading-relaxed text-slate-600">
//               {summary}
//             </div>
//             <button
//               onClick={handleStart}
//               disabled={!ready}
//               className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-[22px] py-[11px] text-sm font-medium transition ${
//                 ready
//                   ? "border-[#1e3c73] bg-[#1e3c73] text-white hover:bg-[#2a4d8a] active:scale-[.98]"
//                   : "cursor-not-allowed border-[#1e3c73]/0 bg-[#1e3c73] text-white opacity-[0.45]"
//               }`}
//             >
//               Start registration
//               <ArrowRight size={17} />
//             </button>
//           </div>
//         </div>

//         {/* footer */}
//         <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 bg-[#f6f7fb] px-[30px] py-[15px]">
//           <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
//             <Clock size={15} className="text-[#1e3c73]" />
//             Closes 30 Sept 2026
//           </span>
//           <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
//             <Smartphone size={15} className="text-[#1e3c73]" />
//             Save &amp; resume anytime
//           </span>
//           <span className="flex-1" />
//           <a
//             href="#"
//             className="text-[11.5px] font-medium text-[#1e3c73] hover:underline"
//           >
//             Need help?
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
