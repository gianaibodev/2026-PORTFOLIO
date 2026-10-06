import type { ReactNode } from "react";
import { Check, X, Trophy, Star, CalendarDays, MapPin, FileText, ArrowRight, Sparkles, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/* Static, server-rendered UI mockups shown inside the bento tiles.
   Sample values are illustrative, not live data. */

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full rounded-2xl border border-white/10 bg-slate-950/90 p-3 sm:p-4 text-slate-100 shadow-2xl overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </span>
  );
}

function CourtStatus() {
  const courts = [
    { name: "Court 1", state: "In play", tone: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", meta: "Doubles · 12:40 left" },
    { name: "Court 2", state: "Open", tone: "bg-sky-500/15 text-sky-300 border-sky-500/30", meta: "Ready for next group" },
    { name: "Court 3", state: "In play", tone: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", meta: "Singles · 05:10 left" },
    { name: "Court 4", state: "Reserved", tone: "bg-amber-500/15 text-amber-300 border-amber-500/30", meta: "Starts in 15 min" },
  ];
  return (
    <Panel>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Club Status</span>
        <span className="flex items-center gap-2 text-[11px] text-emerald-300">
          <LiveDot /> Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {courts.map((court) => (
          <div key={court.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{court.name}</span>
              <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium", court.tone)}>{court.state}</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">{court.meta}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SessionList() {
  const rows = [
    { initials: "AB", name: "Player A", status: "Checked in", tone: "text-emerald-300" },
    { initials: "CD", name: "Player B", status: "Waiting", tone: "text-amber-300" },
    { initials: "EF", name: "Player C", status: "On court", tone: "text-sky-300" },
  ];
  return (
    <Panel>
      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Session</p>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.initials} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-[10px] font-bold">
              {row.initials}
            </span>
            <span className="flex-1 text-xs font-medium">{row.name}</span>
            <span className={cn("text-[10px]", row.tone)}>{row.status}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PhoneApp() {
  return (
    <div className="mx-auto h-full w-[120px] sm:w-[130px] rounded-[22px] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-slate-700" />
      <div className="flex items-center gap-1.5 mb-2">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-blue-500 text-[8px] font-bold text-white">H</span>
        <span className="text-[10px] font-semibold text-slate-200">Admin</span>
        <span className="ml-auto"><LiveDot /></span>
      </div>
      <div className="space-y-1.5">
        <div className="rounded-lg bg-white/[0.06] p-1.5 text-[9px] text-slate-300">4 courts · 2 in play</div>
        <div className="rounded-lg bg-white/[0.06] p-1.5 text-[9px] text-slate-300">7 players today</div>
        <div className="rounded-lg bg-blue-500 p-1.5 text-center text-[9px] font-semibold text-white">Add to Home Screen</div>
      </div>
    </div>
  );
}

function RlsPolicy() {
  const rules = [
    { who: "anon", action: "SELECT", ok: true },
    { who: "anon", action: "UPDATE", ok: false },
    { who: "admin token", action: "UPDATE", ok: true },
  ];
  return (
    <Panel className="font-mono">
      <p className="text-[11px] text-slate-500 mb-2">-- row level security</p>
      <p className="text-[11px] text-sky-300 mb-3">policy on Player, Session</p>
      <div className="space-y-1.5">
        {rules.map((rule) => (
          <div key={rule.who + rule.action} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-1.5 text-[11px]">
            <span className="w-20 text-slate-300">{rule.who}</span>
            <span className="flex-1 text-slate-400">{rule.action}</span>
            {rule.ok ? (
              <span className="flex items-center gap-1 text-emerald-300"><Check className="size-3" /> allow</span>
            ) : (
              <span className="flex items-center gap-1 text-rose-300"><X className="size-3" /> deny</span>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RewardsCard() {
  return (
    <Panel className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Loyalty card</p>
          <p className="text-lg font-semibold">Paddle Zone</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 text-[11px] font-medium text-amber-300">
          <Trophy className="size-3" /> Member
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
          <span>Progress to next reward</span>
          <span className="text-slate-200">7 / 10</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div className="h-2 w-[70%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "grid aspect-square place-items-center rounded-full border",
              index < 7 ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300" : "border-white/10 text-slate-600",
            )}
          >
            <Star className="size-3" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function EventsList() {
  const events = [
    { day: "SAT", date: "12", title: "Open play night", meta: "7:00 PM" },
    { day: "SUN", date: "13", title: "Mini tournament", meta: "9:00 AM" },
  ];
  return (
    <Panel>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
        <CalendarDays className="size-3.5" /> Events
      </p>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.title} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-500/20 text-center leading-none">
              <span>
                <span className="block text-[8px] text-blue-300">{event.day}</span>
                <span className="block text-sm font-bold">{event.date}</span>
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{event.title}</p>
              <p className="flex items-center gap-1 text-[10px] text-slate-400"><MapPin className="size-2.5" /> Paddle Zone · {event.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function GuideChecklist() {
  const steps = ["Open the admin screen", "Create a loyalty rule", "Scan a member", "Check the reward unlocked"];
  return (
    <Panel>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
        <FileText className="size-3.5" /> Owner guide
      </p>
      <div className="space-y-1.5">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 text-xs">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-300">{index + 1}</span>
            <span className="text-slate-200">{step}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SkillRouter() {
  const skills = ["impeccable", "huashu-design", "taste-skill"];
  return (
    <Panel className="flex flex-col justify-center gap-4">
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
        <span className="text-slate-500">idea › </span>“I want to build a landing page…”
      </div>
      <div className="flex items-center gap-2 text-[11px] text-blue-300">
        <ArrowRight className="size-3.5" />
        <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 font-medium">frontend-skill-picker</span>
        <ArrowRight className="size-3.5" />
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={skill}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px]",
              index === 0 ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300" : "border-white/10 text-slate-500",
            )}
          >
            {index === 0 ? <Check className="size-3" /> : null}
            {skill}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function SkillFile() {
  return (
    <Panel className="font-mono">
      <p className="text-[11px] text-slate-500 mb-2">SKILL.md</p>
      <div className="space-y-1 text-[11px]">
        <p className="text-slate-500">---</p>
        <p><span className="text-sky-300">name:</span> my-skill</p>
        <p><span className="text-sky-300">description:</span> when to use it</p>
        <p className="text-slate-500">---</p>
        <p className="text-slate-300"># Steps</p>
      </div>
    </Panel>
  );
}

function SkillList() {
  const skills = ["impeccable", "huashu-design", "taste-skill"];
  return (
    <Panel>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
        <Sparkles className="size-3.5" /> Installed
      </p>
      <div className="space-y-1.5">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs">
            <span>{skill}</span>
            <Check className="size-3.5 text-emerald-300" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PromptCompare() {
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <div className="rounded-xl bg-white/[0.04] p-3">
          <p className="mb-2 flex items-center gap-1 text-slate-500"><Clock className="size-3" /> Before</p>
          <p className="text-slate-400">Long prompt, standards repeated every time</p>
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3">
          <p className="mb-2 flex items-center gap-1 text-emerald-300"><Zap className="size-3" /> With a skill</p>
          <p className="text-slate-200">One line, standards already loaded</p>
        </div>
      </div>
    </Panel>
  );
}

export const FEATURE_PREVIEWS = {
  "court-status": CourtStatus,
  "session-list": SessionList,
  "phone-app": PhoneApp,
  "rls-policy": RlsPolicy,
  "rewards-card": RewardsCard,
  "events-list": EventsList,
  "guide-checklist": GuideChecklist,
  "skill-router": SkillRouter,
  "skill-file": SkillFile,
  "skill-list": SkillList,
  "prompt-compare": PromptCompare,
} as const;

export type FeaturePreviewId = keyof typeof FEATURE_PREVIEWS;
