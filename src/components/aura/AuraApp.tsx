import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  BatteryMedium,
  Bell,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileHeart,
  Globe2,
  HeartPulse,
  Home,
  Info,
  Languages,
  Link2,
  Settings2,
  Share2,
  Sparkles,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { activeHeartRate, dailyHeartRate, initialEpisodes, type Episode } from "@/lib/aura-data";
import { cn } from "@/lib/utils";

type Language = "en" | "ar";
type Tab = "home" | "episodes" | "heart" | "profile";
type View = Tab | "session" | "complete" | "episode" | "summary" | "device";

const copy = {
  en: {
    tagline: "Connected calm. Better understanding.", calmer: "A calmer way to stay connected.",
    intro: "Your AURA wearable helps deliver stimulation while the app securely tracks your sessions and heart-rate data.",
    getStarted: "Get Started", connectTitle: "Connect your AURA", readyConnect: "Ready to connect", connectDevice: "Connect Device",
    connecting: "Connecting…", connected: "Connected", continue: "Continue", trackedTitle: "Your data, automatically tracked.",
    episodeTracking: "Episode tracking", dateTime: "Date & time", monitoring: "Heart-rate monitoring", continueAura: "Continue to AURA",
    home: "Home", episodes: "Episodes", heart: "Heart", profile: "Profile", greeting: "Good afternoon", feeling: "How are you feeling today?",
    auraDevice: "AURA Device", battery: "Battery", lastSynced: "Last synced 2:36 PM", today: "Today", noEpisodes: "No episodes recorded today",
    episodesToday: "episodes today", latestAt: "Latest at", heartRate: "Heart Rate", live: "Live", startSession: "Start AURA Session",
    viewActivity: "View Today’s Activity", thisWeek: "This Week", dataGlance: "Your data at a glance", recordedWeek: "episodes recorded this week",
    avgSessions: "Average heart rate during recorded sessions", viewDetails: "View details", stimulation: "Stimulation in progress", remaining: "Remaining",
    sessionStarted: "Session started", device: "Device", comfortable: "Stay comfortable. AURA will complete the session automatically.",
    sessionComplete: "Session Complete", sessionRecorded: "Session recorded", duration: "Duration", averageHr: "Average Heart Rate", peakHr: "Peak Heart Rate",
    started: "Started", ended: "Ended", viewEpisode: "View Episode", backHome: "Back to Home", recordedEpisodes: "Recorded episodes",
    week: "Week", month: "Month", recordedEpisode: "Recorded episode", peak: "Peak HR", yesterday: "Yesterday", noPeriod: "No data is available for this period.",
    episodeDetails: "Episode Details", sessionSummary: "Session Summary", startingHr: "Starting HR", time: "Time", bpm: "BPM",
    episodeDetected: "Episode detected", stimulationStarted: "Stimulation started", sessionCompleted: "Session completed",
    autoRecorded: "Automatically recorded by AURA", viewHealth: "View Health Summary", current: "Current", average: "Average", minimum: "Minimum", maximum: "Maximum",
    duringEpisodes: "During recorded episodes", avgDuring: "Average during episodes", peakRecorded: "Peak recorded", healthSummary: "Health Summary",
    recordedOverview: "Recorded data overview", dateRange: "September 1 – September 23, 2026", totalRecorded: "Total recorded episodes",
    avgPerWeek: "Average episodes per week", recordedSessions: "Recorded Sessions", generateReport: "Generate Report", preparing: "Preparing your report…",
    reportReady: "Report ready", viewReport: "View Report", shareReport: "Share Report", disclaimer: "A summary of recorded AURA device and app data. This is not a medical diagnosis.",
    account: "Your AURA account", preferences: "Preferences", language: "Language", englishArabic: "English / العربية", notifications: "Notifications",
    sound: "Sound", haptic: "Haptic Feedback", data: "Data", healthData: "Health Data", heartRecords: "Heart-rate records", available: "Available",
    clinicalSummary: "Clinical Summary", viewGenerate: "View / Generate", privacy: "Privacy & Data",
    privacyText: "Your health data should be handled securely and shared only with people you choose.", about: "About AURA", version: "Version 1.0 Prototype",
    deviceSettings: "Device Settings", connection: "Connection", deviceName: "Device Name", sessionFeedback: "Session Feedback", disconnect: "Disconnect Device",
    disconnected: "AURA is disconnected", disconnectedText: "Connect your device to start a session and sync your health data.", connectAura: "Connect AURA",
    on: "On", back: "Back", summaryReady: "Your recorded-data report is ready to review or share.", activity: "Activity", report: "Report",
  },
  ar: {
    tagline: "هدوء متصل. فهم أفضل.", calmer: "طريقة أكثر هدوءًا للبقاء على اتصال.",
    intro: "يساعد جهاز AURA على تقديم التحفيز، بينما يتتبع التطبيق جلساتك وبيانات معدل نبض القلب بأمان.",
    getStarted: "ابدأ", connectTitle: "وصّل جهاز AURA", readyConnect: "جاهز للاتصال", connectDevice: "توصيل الجهاز",
    connecting: "جارٍ الاتصال…", connected: "متصل", continue: "متابعة", trackedTitle: "بياناتك تُسجل تلقائيًا.",
    episodeTracking: "تتبع النوبات", dateTime: "التاريخ والوقت", monitoring: "مراقبة نبض القلب", continueAura: "المتابعة إلى AURA",
    home: "الرئيسية", episodes: "النوبات", heart: "القلب", profile: "الملف", greeting: "مساء الخير", feeling: "كيف تشعر اليوم؟",
    auraDevice: "جهاز AURA", battery: "البطارية", lastSynced: "آخر مزامنة ٢:٣٦ م", today: "اليوم", noEpisodes: "لم تُسجل نوبات اليوم",
    episodesToday: "نوبات اليوم", latestAt: "الأحدث في", heartRate: "معدل نبض القلب", live: "مباشر", startSession: "بدء جلسة AURA",
    viewActivity: "عرض نشاط اليوم", thisWeek: "هذا الأسبوع", dataGlance: "نظرة على بياناتك", recordedWeek: "نوبات مسجلة هذا الأسبوع",
    avgSessions: "متوسط نبض القلب أثناء الجلسات المسجلة", viewDetails: "عرض التفاصيل", stimulation: "التحفيز قيد التقدم", remaining: "متبقٍ",
    sessionStarted: "بدأت الجلسة", device: "الجهاز", comfortable: "ابقَ مرتاحًا. ستُنهي AURA الجلسة تلقائيًا.",
    sessionComplete: "اكتملت الجلسة", sessionRecorded: "تم تسجيل الجلسة", duration: "المدة", averageHr: "متوسط نبض القلب", peakHr: "أعلى نبض",
    started: "البدء", ended: "الانتهاء", viewEpisode: "عرض النوبة", backHome: "العودة للرئيسية", recordedEpisodes: "النوبات المسجلة",
    week: "أسبوع", month: "شهر", recordedEpisode: "نوبة مسجلة", peak: "أعلى نبض", yesterday: "أمس", noPeriod: "لا تتوفر بيانات لهذه الفترة.",
    episodeDetails: "تفاصيل النوبة", sessionSummary: "ملخص الجلسة", startingHr: "نبض البداية", time: "الوقت", bpm: "نبضة/د",
    episodeDetected: "تم رصد النوبة", stimulationStarted: "بدأ التحفيز", sessionCompleted: "اكتملت الجلسة",
    autoRecorded: "سُجلت تلقائيًا بواسطة AURA", viewHealth: "عرض الملخص الصحي", current: "الحالي", average: "المتوسط", minimum: "الأدنى", maximum: "الأعلى",
    duringEpisodes: "أثناء النوبات المسجلة", avgDuring: "المتوسط أثناء النوبات", peakRecorded: "أعلى نبض مسجل", healthSummary: "الملخص الصحي",
    recordedOverview: "نظرة عامة على البيانات المسجلة", dateRange: "١ سبتمبر – ٢٣ سبتمبر ٢٠٢٦", totalRecorded: "إجمالي النوبات المسجلة",
    avgPerWeek: "متوسط النوبات أسبوعيًا", recordedSessions: "الجلسات المسجلة", generateReport: "إنشاء التقرير", preparing: "جارٍ إعداد تقريرك…",
    reportReady: "التقرير جاهز", viewReport: "عرض التقرير", shareReport: "مشاركة التقرير", disclaimer: "ملخص لبيانات جهاز وتطبيق AURA المسجلة. لا يُعد تشخيصًا طبيًا.",
    account: "حساب AURA الخاص بك", preferences: "التفضيلات", language: "اللغة", englishArabic: "English / العربية", notifications: "الإشعارات",
    sound: "الصوت", haptic: "الاهتزاز", data: "البيانات", healthData: "البيانات الصحية", heartRecords: "سجلات نبض القلب", available: "متاحة",
    clinicalSummary: "الملخص السريري", viewGenerate: "عرض / إنشاء", privacy: "الخصوصية والبيانات",
    privacyText: "ينبغي التعامل مع بياناتك الصحية بأمان ومشاركتها فقط مع من تختار.", about: "حول AURA", version: "الإصدار ١.٠ التجريبي",
    deviceSettings: "إعدادات الجهاز", connection: "الاتصال", deviceName: "اسم الجهاز", sessionFeedback: "ملاحظات الجلسة", disconnect: "فصل الجهاز",
    disconnected: "جهاز AURA غير متصل", disconnectedText: "وصّل جهازك لبدء جلسة ومزامنة بياناتك الصحية.", connectAura: "توصيل AURA",
    on: "مفعّل", back: "رجوع", summaryReady: "تقرير بياناتك المسجلة جاهز للعرض أو المشاركة.", activity: "النشاط", report: "التقرير",
  },
} as const;

function AuraLogo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3"><div className={cn("relative grid shrink-0 place-items-center", compact ? "size-9" : "size-14")}><span className="absolute inset-0 rounded-full border border-primary/30"/><span className="absolute inset-[7px] rounded-full border-2 border-primary/65"/><span className="size-2.5 rounded-full bg-primary shadow-aura"/></div><div><div className={cn("font-semibold tracking-[0.2em] text-foreground", compact ? "text-base" : "text-2xl")}>AURA</div>{!compact && <div className="mt-1 text-xs text-muted-foreground">Connected calm. Better understanding.</div>}</div></div>;
}

function LanguageControl({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return <div className="inline-flex h-9 items-center rounded-full bg-muted p-1 text-xs font-semibold" aria-label="Language"><button className={cn("h-7 rounded-full px-3 transition", language === "en" && "bg-card text-foreground shadow-sm")} onClick={() => setLanguage("en")}>EN</button><span className="text-border">|</span><button className={cn("h-7 rounded-full px-3 transition", language === "ar" && "bg-card text-foreground shadow-sm")} onClick={() => setLanguage("ar")}>ع</button></div>;
}

function DeviceArt() {
  return <div className="relative mx-auto h-56 w-56" aria-hidden="true"><div className="aura-pulse absolute inset-4 rounded-full bg-primary/15"/><div className="absolute inset-10 rounded-full bg-card shadow-float"/><div className="absolute left-[84px] top-[42px] h-[118px] w-[54px] rotate-[18deg] rounded-[30px] bg-foreground shadow-float"><div className="absolute left-2 top-2 size-10 rounded-full border-4 border-card/80 bg-primary"/><div className="absolute bottom-5 left-[21px] h-11 w-2 rounded-full bg-card/70"/></div><Waves className="absolute bottom-5 left-1/2 size-7 -translate-x-1/2 text-primary"/></div>;
}

function Chart({ data, large = false, animated = false }: { data: number[]; large?: boolean; animated?: boolean }) {
  const points = data.map((value, index) => ({ index, value }));
  return <div className={cn("w-full", large ? "h-52" : "h-20")} dir="ltr"><ResponsiveContainer width="100%" height="100%"><AreaChart data={points} margin={{ top: 8, right: 2, bottom: 0, left: 2 }}><defs><linearGradient id={large ? "auraLarge" : "auraSmall"} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.24}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>{large && <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 8"/>}<Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={large ? 3 : 2.5} fill={`url(#${large ? "auraLarge" : "auraSmall"})`} isAnimationActive={animated} animationDuration={700} dot={false}/>{large && <YAxis hide domain={[60, 125]}/>} </AreaChart></ResponsiveContainer></div>;
}

function TopBar({ title, onBack, trailing }: { title: string; onBack?: () => void; trailing?: ReactNode }) {
  return <header className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center py-4"><div>{onBack && <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back"><ArrowLeft className="rtl:rotate-180"/></Button>}</div><h1 className="truncate text-center text-lg font-semibold text-foreground">{title}</h1><div className="flex justify-end">{trailing}</div></header>;
}

function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="truncate text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</h2>{action}</div>;
}

function StatusDot({ active = true }: { active?: boolean }) { return <span className={cn("relative flex size-2.5", active && "after:aura-pulse after:absolute after:inset-0 after:rounded-full after:bg-primary")}><span className={cn("relative z-10 size-2.5 rounded-full", active ? "bg-primary" : "bg-muted-foreground")}/></span>; }

function BottomNav({ tab, setTab, t, rtl }: { tab: Tab; setTab: (tab: Tab) => void; t: typeof copy.en | typeof copy.ar; rtl: boolean }) {
  const items = [{ id: "home" as const, label: t.home, icon: Home }, { id: "episodes" as const, label: t.episodes, icon: Activity }, { id: "heart" as const, label: t.heart, icon: HeartPulse }, { id: "profile" as const, label: t.profile, icon: CircleUserRound }];
  return <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-border/70 bg-card/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"><div className={cn("grid grid-cols-4", rtl && "direction-rtl")}>{(rtl ? [...items].reverse() : items).map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition", tab === id ? "text-primary" : "text-muted-foreground")}><Icon className={cn("size-5", tab === id && "stroke-[2.4]")}/><span>{label}</span></button>)}</div></nav>;
}

function Onboarding({ language, setLanguage, onDone }: { language: Language; setLanguage: (l: Language) => void; onDone: () => void }) {
  const [step, setStep] = useState(0); const [status, setStatus] = useState<"ready" | "connecting" | "connected">("ready"); const t = copy[language];
  const connect = () => { setStatus("connecting"); window.setTimeout(() => setStatus("connected"), 1100); };
  return <main className="flex min-h-dvh flex-col overflow-hidden bg-background px-6 pb-7 pt-5"><div className="flex justify-end"><LanguageControl language={language} setLanguage={setLanguage}/></div><div className="flex flex-1 flex-col">
    {step === 0 && <div className="rise-in flex flex-1 flex-col justify-center"><AuraLogo/><div className="mt-16 max-w-[330px]"><h1 className="text-[34px] font-semibold leading-[1.15] text-foreground">{t.calmer}</h1><p className="mt-5 text-[15px] leading-7 text-muted-foreground">{t.intro}</p></div><div className="mt-12 h-24"><div className="relative h-full overflow-hidden rounded-3xl bg-success-soft"><div className="absolute -bottom-12 -end-7 size-36 rounded-full border border-primary/20"/><div className="absolute -bottom-5 end-6 size-24 rounded-full border border-primary/30"/><HeartPulse className="absolute end-10 top-8 size-8 text-primary"/></div></div></div>}
    {step === 1 && <div className="rise-in flex flex-1 flex-col"><div className="mt-7"><h1 className="text-3xl font-semibold text-foreground">{t.connectTitle}</h1><p className="mt-3 text-sm text-muted-foreground">{status === "ready" ? t.readyConnect : status === "connecting" ? t.connecting : t.connected}</p></div><div className="flex flex-1 items-center"><DeviceArt/></div><div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-primary"><StatusDot active={status !== "ready"}/>{status === "connected" ? t.connected : status === "connecting" ? t.connecting : t.readyConnect}</div></div>}
    {step === 2 && <div className="rise-in flex flex-1 flex-col justify-center"><div className="grid size-16 place-items-center rounded-2xl bg-success-soft text-primary"><Sparkles className="size-7"/></div><h1 className="mt-8 max-w-[330px] text-3xl font-semibold leading-tight text-foreground">{t.trackedTitle}</h1><div className="mt-10 space-y-3">{[[Activity,t.episodeTracking],[Clock3,t.dateTime],[HeartPulse,t.monitoring]].map(([Icon,label], i) => { const I = Icon as typeof Activity; return <div key={i} className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><I className="size-5"/></div><span className="font-medium text-foreground">{String(label)}</span><Check className="ms-auto size-5 text-primary"/></div>;})}</div></div>}
  </div><Button size="lg" className="w-full" disabled={status === "connecting"} onClick={() => { if (step === 0) setStep(1); else if (step === 1 && status === "ready") connect(); else if (step === 1 && status === "connected") setStep(2); else if (step === 2) onDone(); }}>{step === 0 ? t.getStarted : step === 1 ? (status === "connected" ? t.continue : status === "connecting" ? t.connecting : t.connectDevice) : t.continueAura}</Button><div className="mx-auto mt-5 flex gap-2">{[0,1,2].map(i => <span key={i} className={cn("h-1.5 rounded-full transition-all", i === step ? "w-6 bg-primary" : "w-1.5 bg-border")}/>)}</div></main>;
}

function HomeScreen({ t, episodes, connected, onStart, go }: { t: typeof copy.en | typeof copy.ar; episodes: Episode[]; connected: boolean; onStart: () => void; go: (v: View) => void }) {
  const todayCount = episodes.filter(e => e.date === "2026-09-23").length;
  return <div className="rise-in px-5 pb-28 pt-7"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><div className="min-w-0"><p className="text-sm font-medium text-primary">{t.greeting}</p><h1 className="mt-1 text-2xl font-semibold text-foreground">{t.feeling}</h1></div><div className="grid size-10 shrink-0 place-items-center rounded-full bg-card shadow-sm"><Sparkles className="size-4 text-lavender"/></div></div>
    <button onClick={() => go("device")} className="mt-6 w-full rounded-3xl bg-foreground p-5 text-start text-primary-foreground shadow-float transition active:scale-[.99]"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div><div className="flex items-center gap-2 text-base font-semibold"><StatusDot active={connected}/>{connected ? t.auraDevice : t.disconnected}</div><p className="mt-2 text-xs text-primary-foreground/60">{connected ? t.lastSynced : t.disconnectedText}</p></div><div className="flex items-center gap-2 text-sm"><BatteryMedium className="size-5 text-primary"/><span>84%</span></div></div></button>
    <div className="mt-7"><SectionTitle>{t.today}</SectionTitle><div className="rounded-3xl bg-card p-5 shadow-sm"><div className="flex items-end justify-between"><div><div className="text-4xl font-semibold text-foreground">{todayCount}</div><div className="mt-1 text-sm text-muted-foreground">{todayCount ? t.episodesToday : t.noEpisodes}</div></div><Activity className="size-8 text-primary/70"/></div></div></div>
    <div className="mt-4 rounded-3xl bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-muted-foreground">{t.heartRate}</p><div className="mt-1 flex items-baseline gap-2"><span className="text-4xl font-semibold text-foreground">78</span><span className="text-sm font-medium text-muted-foreground">BPM</span></div></div><span className="flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-primary"><StatusDot/>{t.live}</span></div><div className="mt-2"><Chart data={dailyHeartRate}/></div></div>
    <Button size="lg" className="mt-4 w-full" onClick={connected ? onStart : () => go("device")}><Zap className="size-4"/>{connected ? t.startSession : t.connectAura}</Button>
    <button onClick={() => go("episodes")} className="mt-3 min-h-11 w-full text-sm font-semibold text-primary">{t.viewActivity}</button>
    <div className="mt-6"><SectionTitle>{t.thisWeek}</SectionTitle><div className="rounded-3xl bg-card p-5 shadow-sm"><div className="grid grid-cols-7 gap-2" dir="ltr">{[1,0,2,1,0,0,0].map((count,i)=><div key={i} className="flex flex-col items-center gap-3"><div className="flex h-12 flex-col-reverse gap-1">{Array.from({length: count}).map((_,j)=><span key={j} className="size-2.5 rounded-full bg-primary"/>)}</div><span className="text-[10px] text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span></div>)}</div></div></div>
    <button onClick={() => go("summary")} className="mt-4 w-full rounded-3xl bg-lavender-soft p-5 text-start"><div className="flex items-start gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-card text-lavender"><FileHeart className="size-5"/></div><div><h3 className="font-semibold text-foreground">{t.dataGlance}</h3><p className="mt-2 text-sm text-muted-foreground">{episodes.length} {t.recordedWeek}</p><p className="mt-1 text-sm text-muted-foreground">{t.avgSessions}: 94 BPM</p><p className="mt-3 text-xs font-semibold text-primary">{t.viewDetails}</p></div></div></button>
  </div>;
}

function SessionScreen({ t, onComplete }: { t: typeof copy.en | typeof copy.ar; onComplete: (episode: Episode) => void }) {
  const [remaining, setRemaining] = useState(120); const [index, setIndex] = useState(0); const completed = useRef(false);
  useEffect(() => { const startedAt = Date.now(); const timer = window.setInterval(() => { const elapsed = Math.floor((Date.now() - startedAt) / 125); const next = Math.max(0, 120 - elapsed); setRemaining(next); setIndex(Math.min(activeHeartRate.length - 1, Math.floor((120 - next) / 11))); if (next === 0 && !completed.current) { completed.current = true; window.clearInterval(timer); onComplete({ id: `session-${Date.now()}`, date: "2026-09-23", startTime: "14:34", endTime: "14:36", duration: 120, startingHeartRate: 82, averageHeartRate: 96, peakHeartRate: 108, heartRateSeries: [82,86,89,94,98,104,108,106,102,98,94,90], device: "AURA", status: "recorded" }); } }, 125); return () => window.clearInterval(timer); }, [onComplete]);
  const angle = ((120 - remaining) / 120) * 360; const time = `${String(Math.floor(remaining / 60)).padStart(2,"0")}:${String(remaining % 60).padStart(2,"0")}`;
  return <div className="flex min-h-dvh flex-col bg-foreground px-6 pb-8 text-primary-foreground"><div className="pt-7 text-center"><p className="text-lg font-semibold">AURA Session</p><div className="mt-2 flex items-center justify-center gap-2 text-xs text-primary-foreground/65"><StatusDot/>{t.stimulation}</div></div><div className="flex flex-1 flex-col justify-center"><div className="relative mx-auto grid size-64 place-items-center"><div className="aura-pulse absolute inset-2 rounded-full bg-primary/20 blur-xl"/><div className="absolute inset-5 rounded-full" style={{ background: `conic-gradient(var(--primary) ${angle}deg, color-mix(in oklab, var(--primary-foreground) 10%, transparent) 0)` }}/><div className="absolute inset-[27px] rounded-full bg-foreground"/><div className="relative text-center" aria-live="polite"><div className="text-5xl font-medium tabular-nums">{time}</div><p className="mt-2 text-xs text-primary-foreground/55">{t.remaining}</p></div></div><div className="mt-10 text-center"><p className="text-xs font-medium text-primary-foreground/55">{t.heartRate}</p><div className="mt-2 flex items-baseline justify-center gap-2"><span className="text-4xl font-semibold tabular-nums">{activeHeartRate[index]}</span><span className="text-sm text-primary-foreground/55">BPM</span></div><div className="mx-auto mt-4 w-full max-w-[330px] rounded-2xl bg-primary-foreground/5 p-3"><Chart data={activeHeartRate.slice(0, index + 1)} animated/></div><p className="mt-2 text-xs text-primary">{t.monitoring}</p></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-primary-foreground/5 p-4"><p className="text-[11px] text-primary-foreground/45">{t.sessionStarted}</p><p className="mt-1 text-sm font-medium">2:34 PM</p></div><div className="rounded-2xl bg-primary-foreground/5 p-4"><p className="text-[11px] text-primary-foreground/45">{t.device}</p><p className="mt-1 text-sm font-medium">AURA · {t.connected}</p></div></div></div><p className="mx-auto max-w-xs text-center text-xs leading-5 text-primary-foreground/50">{t.comfortable}</p></div>;
}

function CompleteScreen({ t, onView, onHome }: { t: typeof copy.en | typeof copy.ar; onView: () => void; onHome: () => void }) {
  return <div className="rise-in flex min-h-dvh flex-col px-6 pb-8 pt-12"><div className="flex flex-1 flex-col items-center justify-center"><div className="check-in grid size-20 place-items-center rounded-full bg-success-soft text-primary"><Check className="size-9 stroke-[2.5]"/></div><h1 className="mt-7 text-3xl font-semibold text-foreground">{t.sessionComplete}</h1><p className="mt-2 text-sm text-muted-foreground">{t.sessionRecorded}</p><div className="mt-10 grid w-full grid-cols-2 gap-3">{[[t.duration,"02:00"],[t.averageHr,"96 BPM"],[t.peakHr,"108 BPM"],[t.started,"2:34 PM"],[t.ended,"2:36 PM"]].map(([label,value],i)=><div key={i} className={cn("rounded-2xl bg-card p-4 shadow-sm", i === 0 && "col-span-2 text-center")}><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-1 text-lg font-semibold text-foreground">{value}</p></div>)}</div></div><Button size="lg" className="w-full" onClick={onView}>{t.viewEpisode}</Button><Button variant="ghost" size="lg" className="mt-2 w-full text-muted-foreground" onClick={onHome}>{t.backHome}</Button></div>;
}

function EpisodesScreen({ t, episodes, onSelect }: { t: typeof copy.en | typeof copy.ar; episodes: Episode[]; onSelect: (e: Episode) => void }) {
  const [period, setPeriod] = useState<"week"|"month">("week");
  const grouped = episodes.reduce<Record<string, Episode[]>>((acc,e) => { const key = e.date === "2026-09-23" ? t.today.toUpperCase() : e.date === "2026-09-22" ? t.yesterday.toUpperCase() : new Intl.DateTimeFormat("en",{month:"short",day:"numeric"}).format(new Date(`${e.date}T12:00:00`)).toUpperCase(); (acc[key] ??= []).push(e); return acc; },{});
  return <div className="rise-in px-5 pb-28 pt-7"><h1 className="text-3xl font-semibold text-foreground">{t.episodes}</h1><div className="mt-5 flex items-center justify-between rounded-3xl bg-foreground p-5 text-primary-foreground"><div><p className="text-xs text-primary-foreground/55">{t.thisWeek}</p><p className="mt-2 text-4xl font-semibold">{episodes.length}</p><p className="mt-1 text-xs text-primary-foreground/65">{t.recordedEpisodes}</p></div><div className="grid size-14 place-items-center rounded-2xl bg-primary-foreground/10"><Activity className="size-6 text-primary"/></div></div><div className="mt-5 grid grid-cols-2 rounded-xl bg-muted p-1"><button className={cn("h-9 rounded-lg text-sm font-medium",period==="week"&&"bg-card shadow-sm")} onClick={()=>setPeriod("week")}>{t.week}</button><button className={cn("h-9 rounded-lg text-sm font-medium",period==="month"&&"bg-card shadow-sm")} onClick={()=>setPeriod("month")}>{t.month}</button></div><div className="mt-7 space-y-6">{Object.entries(grouped).map(([day,items])=><section key={day}><SectionTitle>{day}</SectionTitle><div className="space-y-3">{items.map(e=><button key={e.id} onClick={()=>onSelect(e)} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl bg-card p-4 text-start shadow-sm transition active:scale-[.99]"><div className="grid size-10 place-items-center rounded-xl bg-success-soft text-primary"><Activity className="size-5"/></div><div className="min-w-0"><div className="font-semibold text-foreground">{formatTime(e.startTime)}</div><p className="mt-1 truncate text-xs text-muted-foreground">{t.recordedEpisode} · {Math.round(e.duration/60)} min</p></div><div className="flex items-center gap-2 text-end"><div><p className="text-xs font-semibold text-foreground">{e.peakHeartRate} BPM</p><p className="text-[10px] text-muted-foreground">{t.peak}</p></div><ChevronRight className="size-4 text-muted-foreground rtl:rotate-180"/></div></button>)}</div></section>)}</div></div>;
}

function formatTime(time: string) { const [h = 0,m = 0] = time.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2,"0")} ${h >= 12 ? "PM" : "AM"}`; }
function formatDate(date: string, language: Language) { return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-US", { year:"numeric",month:"long",day:"numeric" }).format(new Date(`${date}T12:00:00`)); }

function EpisodeDetails({ t, language, episode, onBack, onSummary }: { t: typeof copy.en | typeof copy.ar; language: Language; episode: Episode; onBack: () => void; onSummary: () => void }) {
  return <div className="rise-in px-5 pb-8"><TopBar title={t.episodeDetails} onBack={onBack}/><div className="mt-3"><p className="text-2xl font-semibold text-foreground">{formatDate(episode.date,language)}</p><p className="mt-1 text-sm text-muted-foreground">{formatTime(episode.startTime)}</p></div><div className="mt-7"><SectionTitle>{t.sessionSummary}</SectionTitle><div className="grid grid-cols-2 gap-3">{[[t.duration,"02:00"],[t.averageHr,`${episode.averageHeartRate} BPM`],[t.peakHr,`${episode.peakHeartRate} BPM`],[t.startingHr,`${episode.startingHeartRate} BPM`]].map(([label,value])=><div key={label} className="rounded-2xl bg-card p-4 shadow-sm"><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-2 text-lg font-semibold text-foreground">{value}</p></div>)}</div></div><div className="mt-7"><SectionTitle>{t.heartRate}</SectionTitle><div className="rounded-3xl bg-card p-4 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{t.time} · 02:00</span><span className="text-xs font-semibold text-primary">BPM</span></div><Chart data={episode.heartRateSeries} large animated/></div></div><div className="mt-7"><SectionTitle>{t.activity}</SectionTitle><div className="relative ms-3 border-s border-border ps-6">{[[formatTime(episode.startTime),t.episodeDetected],[formatTime(episode.startTime),t.stimulationStarted],[formatTime(episode.endTime),t.sessionCompleted]].map(([time,label],i)=><div key={i} className="relative pb-6 last:pb-0"><span className="absolute -start-[29px] top-1 size-2.5 rounded-full border-2 border-card bg-primary"/><p className="text-xs text-muted-foreground">{time}</p><p className="mt-1 text-sm font-medium text-foreground">{label}</p></div>)}</div></div><div className="mt-7 flex items-center gap-2 rounded-2xl bg-muted p-4 text-xs text-muted-foreground"><Info className="size-4 shrink-0"/>{t.autoRecorded}</div><Button size="lg" className="mt-5 w-full" onClick={onSummary}><FileHeart/>{t.viewHealth}</Button></div>;
}

function HeartScreen({ t, episodes, onSummary }: { t: typeof copy.en | typeof copy.ar; episodes: Episode[]; onSummary: () => void }) {
  return <div className="rise-in px-5 pb-28 pt-7"><h1 className="text-3xl font-semibold text-foreground">{t.heartRate}</h1><div className="mt-5 rounded-3xl bg-card p-5 shadow-sm"><div className="flex justify-between"><div><p className="text-sm text-muted-foreground">{t.current}</p><div className="mt-1 flex items-baseline gap-2"><span className="text-5xl font-semibold text-foreground">78</span><span className="text-sm text-muted-foreground">BPM</span></div></div><span className="flex h-8 items-center gap-2 rounded-full bg-success-soft px-3 text-xs font-semibold text-primary"><StatusDot/>{t.live}</span></div><div className="mt-5"><p className="mb-3 text-xs font-medium text-muted-foreground">{t.today}</p><Chart data={dailyHeartRate} large animated/></div></div><div className="mt-3 grid grid-cols-3 gap-2">{[[t.average,"78"],[t.minimum,"64"],[t.maximum,"108"]].map(([label,value])=><div key={label} className="rounded-2xl bg-card p-3 text-center shadow-sm"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-2 text-lg font-semibold text-foreground">{value}</p><p className="text-[9px] text-muted-foreground">BPM</p></div>)}</div><div className="mt-8"><SectionTitle action={<button onClick={onSummary} className="text-xs font-semibold text-primary">{t.viewDetails}</button>}>{t.duringEpisodes}</SectionTitle><div className="rounded-3xl bg-foreground p-5 text-primary-foreground"><div className="grid grid-cols-2 gap-5"><div><p className="text-xs text-primary-foreground/55">{episodes.length} {t.recordedEpisodes}</p><p className="mt-3 text-3xl font-semibold">94 <span className="text-xs font-normal text-primary-foreground/55">BPM</span></p><p className="mt-1 text-[10px] text-primary-foreground/55">{t.avgDuring}</p></div><div><p className="mt-8 text-3xl font-semibold">118 <span className="text-xs font-normal text-primary-foreground/55">BPM</span></p><p className="mt-1 text-[10px] text-primary-foreground/55">{t.peakRecorded}</p></div></div></div><div className="mt-3 divide-y divide-border rounded-2xl bg-card px-4 shadow-sm">{episodes.slice(0,3).map(e=><div key={e.id} className="grid grid-cols-[1fr_auto_auto] gap-5 py-4 text-sm"><span className="font-medium text-foreground">{formatTime(e.startTime)}</span><span className="text-muted-foreground">{t.average} <b className="text-foreground">{e.averageHeartRate}</b></span><span className="text-muted-foreground">{t.peak} <b className="text-foreground">{e.peakHeartRate}</b></span></div>)}</div></div></div>;
}

function HealthSummary({ t, episodes, onBack }: { t: typeof copy.en | typeof copy.ar; episodes: Episode[]; onBack: () => void }) {
  const [report, setReport] = useState<"idle"|"loading"|"ready">("idle");
  const generate = () => { setReport("loading"); window.setTimeout(()=>setReport("ready"),1400); };
  return <div className="rise-in px-5 pb-8"><TopBar title={t.healthSummary} onBack={onBack}/><p className="mt-2 text-center text-sm text-muted-foreground">{t.recordedOverview}</p><div className="mt-6 rounded-2xl bg-secondary p-4 text-center text-sm font-medium text-secondary-foreground">{t.dateRange}</div><div className="mt-5 grid grid-cols-2 gap-3">{[[t.totalRecorded,"24"],[t.avgPerWeek,"6"],[t.avgSessions,"94 BPM"],[t.peakRecorded,"118 BPM"]].map(([label,value])=><div key={label} className="rounded-2xl bg-card p-4 shadow-sm"><p className="min-h-8 text-[11px] leading-4 text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold text-foreground">{value}</p></div>)}</div><div className="mt-7"><SectionTitle>{t.recordedSessions}</SectionTitle><div className="rounded-3xl bg-card p-4 shadow-sm"><div className="mb-2 flex justify-between text-xs text-muted-foreground"><span>Sep 1</span><span>Sep 23</span></div><div className="flex h-24 items-end justify-between gap-2" dir="ltr">{[28,52,38,70,44,83,58,68,36,74,49,90].map((h,i)=><span key={i} className="w-full rounded-t-full bg-primary/75" style={{height:`${h}%`}}/>)}</div></div><div className="mt-3 space-y-2">{episodes.slice(0,3).map(e=><div key={e.id} className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm"><div><p className="text-sm font-medium text-foreground">{formatTime(e.startTime)}</p><p className="text-[10px] text-muted-foreground">{e.date}</p></div><div className="text-end"><p className="text-sm font-semibold text-foreground">{e.averageHeartRate} BPM</p><p className="text-[10px] text-muted-foreground">{t.average}</p></div></div>)}</div></div><div className="mt-7 rounded-2xl bg-lavender-soft p-4 text-xs leading-5 text-muted-foreground"><Info className="mb-2 size-4 text-lavender"/>{t.disclaimer}</div>{report === "idle" && <Button size="lg" className="mt-5 w-full" onClick={generate}><FileHeart/>{t.generateReport}</Button>}{report === "loading" && <div className="mt-5 flex h-12 items-center justify-center gap-3 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"><span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"/>{t.preparing}</div>}{report === "ready" && <div className="mt-5 rise-in"><div className="mb-3 flex items-center gap-3 rounded-2xl bg-success-soft p-4"><div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-5"/></div><div><p className="font-semibold text-foreground">{t.reportReady}</p><p className="mt-0.5 text-xs text-muted-foreground">{t.summaryReady}</p></div></div><div className="grid grid-cols-2 gap-3"><Button size="lg" onClick={()=>window.alert(t.summaryReady)}>{t.viewReport}</Button><Button size="lg" variant="outline" onClick={()=>window.alert(t.summaryReady)}><Share2/>{t.shareReport}</Button></div></div>}</div>;
}

function ProfileScreen({ t, language, setLanguage, connected, go }: { t: typeof copy.en | typeof copy.ar; language: Language; setLanguage: (l: Language)=>void; connected: boolean; go: (v: View)=>void }) {
  const [prefs,setPrefs] = useState({notifications:true,sound:true,haptic:true});
  return <div className="rise-in px-5 pb-28 pt-7"><h1 className="text-3xl font-semibold text-foreground">{t.profile}</h1><p className="mt-2 text-sm text-muted-foreground">{t.account}</p><div className="mt-7"><SectionTitle>{t.device}</SectionTitle><button onClick={()=>go("device")} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-3xl bg-foreground p-5 text-start text-primary-foreground"><div className="grid size-11 place-items-center rounded-xl bg-primary-foreground/10"><Link2 className="size-5 text-primary"/></div><div className="min-w-0"><p className="font-semibold">{t.auraDevice}</p><p className="mt-1 text-xs text-primary-foreground/55">{connected ? `${t.connected} · 84%` : t.disconnected}</p></div><ChevronRight className="size-5 text-primary-foreground/40 rtl:rotate-180"/></button></div><div className="mt-7"><SectionTitle>{t.preferences}</SectionTitle><div className="divide-y divide-border rounded-3xl bg-card px-4 shadow-sm"><SettingRow icon={Languages} label={t.language}><LanguageControl language={language} setLanguage={setLanguage}/></SettingRow>{([["notifications",Bell,t.notifications],["sound",Volume2,t.sound],["haptic",Waves,t.haptic]] as const).map(([key,Icon,label])=><SettingRow key={key} icon={Icon} label={label}><Switch checked={prefs[key]} onCheckedChange={value=>setPrefs(p=>({...p,[key]:value}))}/></SettingRow>)}</div></div><div className="mt-7"><SectionTitle>{t.data}</SectionTitle><div className="divide-y divide-border rounded-3xl bg-card px-4 shadow-sm"><SettingRow icon={Activity} label={t.episodes}><span className="text-sm font-semibold">24</span></SettingRow><SettingRow icon={HeartPulse} label={t.heartRecords}><span className="text-xs font-medium text-primary">{t.available}</span></SettingRow><button onClick={()=>go("summary")} className="w-full"><SettingRow icon={FileHeart} label={t.clinicalSummary}><span className="flex items-center gap-1 text-xs font-medium text-primary">{t.viewGenerate}<ChevronRight className="size-4 rtl:rotate-180"/></span></SettingRow></button></div></div><div className="mt-7"><SectionTitle>{t.privacy}</SectionTitle><div className="rounded-2xl bg-lavender-soft p-4 text-sm leading-6 text-muted-foreground">{t.privacyText}</div></div><div className="mt-7"><SectionTitle>{t.about}</SectionTitle><p className="text-sm text-muted-foreground">{t.version}</p></div></div>;
}

function SettingRow({ icon: Icon, label, children }: { icon: typeof Activity; label: string; children: ReactNode }) { return <div className="grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground"><Icon className="size-4"/></div><span className="min-w-0 truncate text-sm font-medium text-foreground">{label}</span><div>{children}</div></div>; }

function DeviceSettings({ t, connected, setConnected, onBack }: { t: typeof copy.en | typeof copy.ar; connected: boolean; setConnected: (v:boolean)=>void; onBack:()=>void }) {
  const [feedback,setFeedback]=useState(true);
  return <div className="rise-in px-5 pb-8"><TopBar title={t.deviceSettings} onBack={onBack}/><div className="mt-2"><DeviceArt/></div><div className="text-center"><h2 className="text-2xl font-semibold text-foreground">AURA</h2><div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary"><StatusDot active={connected}/>{connected?t.connected:t.disconnected}</div></div><div className="mt-7 grid grid-cols-3 gap-2">{[[t.battery,"84%"],[t.connection,connected?t.connected:"—"],[t.lastSynced,"2:36 PM"]].map(([label,value])=><div key={label} className="rounded-2xl bg-card p-3 text-center shadow-sm"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-2 text-sm font-semibold text-foreground">{value}</p></div>)}</div><div className="mt-7 divide-y divide-border rounded-3xl bg-card px-4 shadow-sm"><SettingRow icon={Settings2} label={t.deviceName}><span className="text-sm font-medium">AURA</span></SettingRow><SettingRow icon={Bell} label={t.notifications}><span className="text-xs font-medium text-primary">{t.on}</span></SettingRow><SettingRow icon={Waves} label={t.haptic}><span className="text-xs font-medium text-primary">{t.on}</span></SettingRow><SettingRow icon={Activity} label={t.sessionFeedback}><Switch checked={feedback} onCheckedChange={setFeedback}/></SettingRow></div><Button size="lg" variant={connected?"outline":"default"} className={cn("mt-7 w-full",connected&&"text-coral")} onClick={()=>setConnected(!connected)}>{connected?t.disconnect:t.connectAura}</Button></div>;
}

export function AuraApp() {
  const [language,setLanguage]=useState<Language>("en"); const [onboarded,setOnboarded]=useState(false); const [view,setView]=useState<View>("home"); const [tab,setTabState]=useState<Tab>("home"); const [episodes,setEpisodes]=useState(initialEpisodes); const [selected,setSelected]=useState<Episode>(initialEpisodes[0]); const [connected,setConnected]=useState(true); const t=copy[language]; const rtl=language==="ar";
  useEffect(()=>{ document.documentElement.lang=language; document.documentElement.dir=rtl?"rtl":"ltr"; },[language,rtl]);
  const go=(next:View)=>{setView(next); if(["home","episodes","heart","profile"].includes(next)){setTabState(next as Tab);} window.scrollTo({top:0,behavior:"smooth"});};
  const setTab=(next:Tab)=>go(next);
  const finishSession=(episode:Episode)=>{setEpisodes(prev=>prev.some(e=>e.id===episode.id)?prev:[episode,...prev]);setSelected(episode);setView("complete");};
  if(!onboarded) return <div dir={rtl?"rtl":"ltr"} className="mx-auto min-h-dvh max-w-[430px] bg-background shadow-float"><Onboarding language={language} setLanguage={setLanguage} onDone={()=>setOnboarded(true)}/></div>;
  const main = ["home","episodes","heart","profile"].includes(view);
  return <div dir={rtl?"rtl":"ltr"} className="mx-auto min-h-dvh max-w-[430px] overflow-x-hidden bg-background shadow-float">
    {view==="home"&&<HomeScreen t={t} episodes={episodes} connected={connected} onStart={()=>go("session")} go={go}/>} {view==="session"&&<SessionScreen t={t} onComplete={finishSession}/>} {view==="complete"&&<CompleteScreen t={t} onView={()=>go("episode")} onHome={()=>go("home")}/>} {view==="episodes"&&<EpisodesScreen t={t} episodes={episodes} onSelect={e=>{setSelected(e);go("episode");}}/>} {view==="episode"&&<EpisodeDetails t={t} language={language} episode={selected} onBack={()=>go("episodes")} onSummary={()=>go("summary")}/>} {view==="heart"&&<HeartScreen t={t} episodes={episodes} onSummary={()=>go("summary")}/>} {view==="summary"&&<HealthSummary t={t} episodes={episodes} onBack={()=>go("heart")}/>} {view==="profile"&&<ProfileScreen t={t} language={language} setLanguage={setLanguage} connected={connected} go={go}/>} {view==="device"&&<DeviceSettings t={t} connected={connected} setConnected={setConnected} onBack={()=>go("profile")}/>} {main&&<BottomNav tab={tab} setTab={setTab} t={t} rtl={rtl}/>} 
  </div>;
}