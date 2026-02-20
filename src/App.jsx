import { useState, useEffect, useCallback } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  CHECKLIST_TEMPLATES, SERVICE_PRESETS, REVENUE_SOURCES, PROJECT_STATUSES,
  XP_ACTIONS, ACHIEVEMENTS, getLevel, getNextLevel, getLevelProgress,
} from "./data/constants";

// ─── Utility ───
const uid = () => Math.random().toString(36).substr(2, 9);
const today = () => new Date().toISOString().slice(0, 10);

// ─── Demo Data ───
const DEMO_PROJECTS = [
  {
    id: "demo-1", name: "SaaS Landing Page", emoji: "🚀", status: "shipped",
    budget: 50, createdAt: "2025-01-15",
    checklist: { meta:true, og:true, favicon:true, https:true, responsive:true, analytics:true, domain:true, "env-vars":true, loading:true, "error-states":true, a11y:true, legal:true },
    costs: [
      { id:"c1", service:"Claude API", amount:12.40, date:"2025-01-18", note:"Initial build" },
      { id:"c2", service:"Vercel", amount:0, date:"2025-01-18", note:"Free tier" },
      { id:"c3", service:"Domain", amount:12, date:"2025-01-20", note:"coolsite.dev" },
    ],
    revenues: [
      { id:"r1", source:"Stripe", amount:49, date:"2025-02-01", note:"First customer!" },
      { id:"r2", source:"Stripe", amount:49, date:"2025-02-15", note:"Second sub" },
    ],
    codeReviews: [],
  },
  {
    id: "demo-2", name: "AI Chatbot Widget", emoji: "🤖", status: "building",
    budget: 100, createdAt: "2025-02-01",
    checklist: { https:true, "env-vars":true, responsive:true, "rate-limit":true },
    costs: [
      { id:"c5", service:"Claude API", amount:24.80, date:"2025-02-10", note:"Heavy API usage" },
      { id:"c6", service:"Cursor", amount:20, date:"2025-02-01", note:"Monthly sub" },
    ],
    revenues: [],
    codeReviews: [],
  },
];

const DEMO_PROFILE = { xp: 285, streak_days: 4, monthly_budget: 150, achievements: ["streak_3"] };

// ─── Design Tokens ───
const t = {
  font: { body: "'DM Sans', sans-serif", mono: "'JetBrains Mono', monospace", display: "'Space Mono', monospace" },
  color: { bg: "#0A0A1B", surface: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.06)", accent: "#00FFB2", accent2: "#B362FF", warn: "#FFD166", danger: "#FF6B6B", text: "#fff", muted: "rgba(255,255,255,0.4)", faint: "rgba(255,255,255,0.15)" },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED UI COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProgressRing({ percent, size = 80, stroke = 6 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (percent / 100) * c;
  const color = percent >= 80 ? t.color.accent : percent >= 50 ? t.color.warn : t.color.danger;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }} />
    </svg>
  );
}

function Pill({ label, value, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px", background:"rgba(255,255,255,0.03)", borderRadius:8, border:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:color }} />
      <span style={{ color:t.color.muted, fontSize:12, fontFamily:t.font.body }}>{label}</span>
      <span style={{ color:"#fff", fontSize:14, fontWeight:600, fontFamily:t.font.mono, marginLeft:"auto" }}>{value}</span>
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, style: sx = {} }) {
  const styles = {
    primary: { background:"linear-gradient(135deg, #00FFB2, #00D4AA)", color:"#0A0A1B", border:"none", fontWeight:600 },
    secondary: { background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.08)" },
    danger: { background:"rgba(255,107,107,0.08)", color:"#FF6B6B", border:"1px solid rgba(255,107,107,0.2)" },
    ghost: { background:"none", color:t.color.muted, border:"none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:10,
      cursor: disabled ? "default" : "pointer", fontSize:13, fontFamily:t.font.body, transition:"all 0.2s",
      opacity: disabled ? 0.4 : 1, ...styles[variant], ...sx,
    }}>{children}</button>
  );
}

function TabBtn({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:8, padding:"10px 18px",
      background: active ? "rgba(0,255,178,0.08)" : "transparent",
      border: active ? "1px solid rgba(0,255,178,0.2)" : "1px solid transparent",
      borderRadius:10, color: active ? t.color.accent : t.color.muted,
      cursor:"pointer", fontSize:13, fontFamily:t.font.body, fontWeight:500, whiteSpace:"nowrap",
    }}>{children}</button>
  );
}

function Input({ value, onChange, placeholder, type = "text", style: sx = {}, ...rest }) {
  return (
    <input value={value} onChange={onChange} placeholder={placeholder} type={type} {...rest}
      style={{ padding:"12px 16px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, fontFamily:t.font.body, outline:"none", ...sx }}
      onFocus={e => e.target.style.borderColor = "rgba(0,255,178,0.4)"}
      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
    />
  );
}

function Label({ children }) {
  return <div style={{ color:t.color.muted, fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:1.5, marginBottom:12 }}>{children}</div>;
}

function IconPlus({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function IconCheck({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function IconTrash({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>; }
function IconBack({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>; }
function IconCode({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>; }
function IconArrow({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function IconTrophy({ sz = 16 }) { return <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// XP BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function XPBar({ xp, streak }) {
  const level = getLevel(xp), next = getNextLevel(xp), progress = getLevelProgress(xp);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      {streak > 0 && <div style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", background:"rgba(255,107,107,0.08)", borderRadius:20, border:"1px solid rgba(255,107,107,0.15)" }}>
        <span style={{ fontSize:12 }}>🔥</span><span style={{ color:"#FF6B6B", fontSize:12, fontWeight:600, fontFamily:t.font.mono }}>{streak}</span>
      </div>}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:`${t.color.accent}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{level.icon}</div>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"#fff", fontSize:12, fontWeight:600, fontFamily:t.font.mono }}>{level.title}</span>
            <span style={{ color:t.color.faint, fontSize:10, fontFamily:t.font.mono }}>Lv.{level.level}</span>
          </div>
          <div style={{ width:80, height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, marginTop:3, overflow:"hidden" }}>
            <div style={{ width:`${progress}%`, height:"100%", background:t.color.accent, borderRadius:2, transition:"width 0.6s ease" }} />
          </div>
        </div>
        <span style={{ color:t.color.faint, fontSize:10, fontFamily:t.font.mono }}>{xp}{next ? `/${next.xp}` : ""} XP</span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOASTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AchievementToast({ achievement, onDone }) {
  useEffect(() => { const tm = setTimeout(onDone, 4000); return () => clearTimeout(tm); }, [onDone]);
  const def = ACHIEVEMENTS.find(a => a.key === achievement);
  if (!def) return null;
  return (
    <div style={{ position:"fixed", top:80, right:24, zIndex:200, padding:"16px 24px", background:"linear-gradient(135deg, rgba(26,26,46,0.98), rgba(40,40,70,0.98))", border:`1px solid ${def.color}40`, borderRadius:14, animation:"popIn 0.4s ease, glow 2s ease infinite", display:"flex", alignItems:"center", gap:14, backdropFilter:"blur(12px)" }}>
      <span style={{ fontSize:32 }}>{def.icon}</span>
      <div>
        <div style={{ color:def.color, fontSize:10, fontWeight:700, fontFamily:t.font.mono, letterSpacing:1.5, textTransform:"uppercase" }}>Achievement Unlocked</div>
        <div style={{ color:"#fff", fontSize:16, fontWeight:700, fontFamily:t.font.display }}>{def.title}</div>
        <div style={{ color:t.color.muted, fontSize:12 }}>{def.desc}</div>
      </div>
    </div>
  );
}

function XPPopup({ amount, label, onDone }) {
  useEffect(() => { const tm = setTimeout(onDone, 2000); return () => clearTimeout(tm); }, [onDone]);
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:200, padding:"12px 20px", background:"rgba(0,255,178,0.1)", border:"1px solid rgba(0,255,178,0.3)", borderRadius:12, animation:"slideUp 0.3s ease", display:"flex", alignItems:"center", gap:10 }}>
      <span style={{ color:t.color.accent, fontSize:18, fontWeight:700, fontFamily:t.font.mono }}>+{amount} XP</span>
      <span style={{ color:t.color.muted, fontSize:12 }}>{label}</span>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATUS SELECTOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StatusSelector({ status, onChange }) {
  return (
    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
      {PROJECT_STATUSES.map(st => (
        <button key={st.key} onClick={() => onChange(st.key)} style={{
          padding:"6px 12px", borderRadius:8, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:5,
          background: status === st.key ? `${st.color}15` : "rgba(255,255,255,0.02)",
          border: `1px solid ${status === st.key ? st.color + "40" : "rgba(255,255,255,0.04)"}`,
          color: status === st.key ? st.color : t.color.muted, fontFamily:t.font.body,
        }}><span style={{ fontSize:13 }}>{st.icon}</span>{st.label}</button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHIP CHECKLIST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ShipChecklist({ project, onToggle }) {
  const categories = [...new Set(CHECKLIST_TEMPLATES.map(i => i.category))];
  const total = CHECKLIST_TEMPLATES.length;
  const checked = Object.values(project.checklist).filter(Boolean).length;
  const pct = Math.round((checked / total) * 100);
  const pc = { high:"#FF6B6B", medium:"#FFD166", low:"rgba(255,255,255,0.25)" };
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:28, padding:"20px 24px", background:t.color.surface, borderRadius:14, border:`1px solid ${t.color.border}` }}>
        <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <ProgressRing percent={pct} size={90} stroke={7} />
          <span style={{ position:"absolute", fontSize:22, fontWeight:700, color:"#fff", fontFamily:t.font.mono }}>{pct}%</span>
        </div>
        <div>
          <div style={{ color:"#fff", fontSize:20, fontWeight:700, fontFamily:t.font.display }}>
            {pct >= 100 ? "Ready to launch! 🎉" : pct >= 80 ? "Almost there! 🔥" : pct >= 50 ? "Making progress ⚡" : "Just getting started 🌱"}
          </div>
          <div style={{ color:t.color.muted, fontSize:13, marginTop:4 }}>{checked} of {total} items complete</div>
        </div>
      </div>
      {categories.map(cat => {
        const items = CHECKLIST_TEMPLATES.filter(i => i.category === cat);
        return (
          <div key={cat} style={{ marginBottom:24 }}>
            <Label>{cat} — {items.filter(i => project.checklist[i.id]).length}/{items.length}</Label>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {items.map(item => {
                const done = !!project.checklist[item.id];
                return (
                  <button key={item.id} onClick={() => onToggle(item.id)} style={{
                    display:"flex", alignItems:"center", gap:12, padding:"12px 16px", width:"100%", textAlign:"left",
                    background: done ? "rgba(0,255,178,0.04)" : "rgba(255,255,255,0.015)",
                    border:`1px solid ${done ? "rgba(0,255,178,0.12)" : "rgba(255,255,255,0.04)"}`,
                    borderRadius:10, cursor:"pointer",
                  }}>
                    <div style={{ width:22, height:22, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: done ? t.color.accent : "transparent", border: done ? "none" : "2px solid rgba(255,255,255,0.15)" }}>
                      {done && <IconCheck sz={14} />}
                    </div>
                    <span style={{ color: done ? t.color.muted : "#fff", fontSize:14, textDecoration: done ? "line-through" : "none", flex:1 }}>{item.label}</span>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:pc[item.priority], flexShrink:0 }} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COST DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CostDashboard({ project, onAddCost, onDeleteCost }) {
  const [show, setShow] = useState(false);
  const [svc, setSvc] = useState(SERVICE_PRESETS[0].name);
  const [amt, setAmt] = useState("");
  const [note, setNote] = useState("");
  const total = project.costs.reduce((s, c) => s + c.amount, 0);
  const byService = {}; project.costs.forEach(c => { byService[c.service] = (byService[c.service] || 0) + c.amount; });
  const sorted = Object.entries(byService).sort((a, b) => b[1] - a[1]);
  const max = sorted.length ? sorted[0][1] : 1;
  const handleAdd = () => { const a = parseFloat(amt); if (isNaN(a) || a < 0) return; onAddCost({ id:uid(), service:svc, amount:a, date:today(), note:note.trim() }); setAmt(""); setNote(""); setShow(false); };
  return (
    <div>
      <div style={{ display:"flex", gap:16, marginBottom:28, flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 160px", padding:20, background:"rgba(179,98,255,0.06)", border:"1px solid rgba(179,98,255,0.15)", borderRadius:14 }}>
          <div style={{ color:t.color.muted, fontSize:12, marginBottom:6 }}>Total Spend</div>
          <div style={{ color:t.color.accent2, fontSize:32, fontWeight:700, fontFamily:t.font.mono }}>${total.toFixed(2)}</div>
          {project.budget && <div style={{ marginTop:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ color:t.color.faint, fontSize:10 }}>Budget: ${project.budget}</span>
              <span style={{ color: total > project.budget ? t.color.danger : t.color.accent, fontSize:10, fontFamily:t.font.mono }}>{Math.round((total/project.budget)*100)}%</span>
            </div>
            <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ width:`${Math.min(100, (total/project.budget)*100)}%`, height:"100%", background: total > project.budget ? t.color.danger : t.color.accent2, borderRadius:2 }} />
            </div>
          </div>}
        </div>
        <div style={{ flex:"1 1 120px", padding:20, background:t.color.surface, border:`1px solid ${t.color.border}`, borderRadius:14 }}>
          <div style={{ color:t.color.muted, fontSize:12, marginBottom:6 }}>Services</div>
          <div style={{ color:"#fff", fontSize:32, fontWeight:700, fontFamily:t.font.mono }}>{sorted.length}</div>
        </div>
      </div>
      {sorted.length > 0 && <div style={{ marginBottom:28 }}>
        <Label>Spend by Service</Label>
        {sorted.map(([name, tot]) => { const p = SERVICE_PRESETS.find(x => x.name === name); return (
          <div key={name} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <span style={{ width:24, textAlign:"center", fontSize:16 }}>{p?.icon || "◌"}</span>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13, width:100, flexShrink:0 }}>{name}</span>
            <div style={{ flex:1, height:8, background:"rgba(255,255,255,0.04)", borderRadius:4, overflow:"hidden" }}>
              <div style={{ width:`${(tot/max)*100}%`, height:"100%", background:p?.color || "#888", borderRadius:4 }} />
            </div>
            <span style={{ color:"#fff", fontSize:13, fontFamily:t.font.mono, width:70, textAlign:"right", flexShrink:0 }}>${tot.toFixed(2)}</span>
          </div>
        ); })}
      </div>}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <Label>Cost Log</Label>
        <Btn variant={show ? "danger" : "secondary"} onClick={() => setShow(!show)} style={{ padding:"8px 14px" }}>{show ? "Cancel" : <><IconPlus sz={14} /> Add Entry</>}</Btn>
      </div>
      {show && <div style={{ padding:20, background:t.color.surface, border:`1px solid ${t.color.border}`, borderRadius:14, marginBottom:16 }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:12 }}>
          <select value={svc} onChange={e => setSvc(e.target.value)} style={{ flex:"1 1 150px", padding:"10px 12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:14, outline:"none" }}>
            {SERVICE_PRESETS.map(p => <option key={p.name} value={p.name}>{p.icon} {p.name}</option>)}
          </select>
          <Input value={amt} onChange={e => setAmt(e.target.value)} placeholder="$0.00" type="number" step="0.01" min="0" style={{ flex:"0 0 100px", fontFamily:t.font.mono }} />
        </div>
        <div style={{ display:"flex", gap:12 }}><Input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)" style={{ flex:1 }} /><Btn onClick={handleAdd}>Add</Btn></div>
      </div>}
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {project.costs.length === 0 && <div style={{ padding:40, textAlign:"center", color:t.color.faint }}>No costs logged yet</div>}
        {[...project.costs].reverse().map(cost => { const p = SERVICE_PRESETS.find(x => x.name === cost.service); return (
          <div key={cost.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.04)", borderRadius:10 }}>
            <span style={{ fontSize:16, width:24, textAlign:"center" }}>{p?.icon || "◌"}</span>
            <span style={{ color:"#fff", fontSize:14, flex:1 }}>{cost.service}</span>
            {cost.note && <span style={{ color:t.color.faint, fontSize:12 }}>{cost.note}</span>}
            <span style={{ color: cost.amount === 0 ? t.color.accent : "#fff", fontSize:14, fontFamily:t.font.mono, fontWeight:600 }}>{cost.amount === 0 ? "FREE" : `$${cost.amount.toFixed(2)}`}</span>
            <button onClick={() => onDeleteCost(cost.id)} style={{ background:"none", border:"none", color:t.color.faint, cursor:"pointer", padding:4 }}><IconTrash sz={14} /></button>
          </div>
        ); })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REVENUE TRACKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function RevenueTracker({ project, onAddRevenue, onDeleteRevenue }) {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState(REVENUE_SOURCES[0].name);
  const [amt, setAmt] = useState("");
  const [note, setNote] = useState("");
  const totalRev = project.revenues.reduce((s, r) => s + r.amount, 0);
  const totalCost = project.costs.reduce((s, c) => s + c.amount, 0);
  const profit = totalRev - totalCost;
  const handleAdd = () => { const a = parseFloat(amt); if (isNaN(a) || a <= 0) return; onAddRevenue({ id:uid(), source:src, amount:a, date:today(), note:note.trim() }); setAmt(""); setNote(""); setShow(false); };
  return (
    <div>
      <div style={{ display:"flex", gap:16, marginBottom:28, flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 140px", padding:20, background:"rgba(74,222,128,0.06)", border:"1px solid rgba(74,222,128,0.15)", borderRadius:14 }}>
          <div style={{ color:t.color.muted, fontSize:12, marginBottom:6 }}>Revenue</div>
          <div style={{ color:"#4ADE80", fontSize:28, fontWeight:700, fontFamily:t.font.mono }}>${totalRev.toFixed(2)}</div>
        </div>
        <div style={{ flex:"1 1 140px", padding:20, background:"rgba(179,98,255,0.06)", border:"1px solid rgba(179,98,255,0.15)", borderRadius:14 }}>
          <div style={{ color:t.color.muted, fontSize:12, marginBottom:6 }}>Costs</div>
          <div style={{ color:t.color.accent2, fontSize:28, fontWeight:700, fontFamily:t.font.mono }}>${totalCost.toFixed(2)}</div>
        </div>
        <div style={{ flex:"1 1 140px", padding:20, background: profit > 0 ? "rgba(0,255,178,0.06)" : "rgba(255,107,107,0.06)", border:`1px solid ${profit > 0 ? "rgba(0,255,178,0.15)" : "rgba(255,107,107,0.15)"}`, borderRadius:14 }}>
          <div style={{ color:t.color.muted, fontSize:12, marginBottom:6 }}>P&L</div>
          <div style={{ color: profit > 0 ? t.color.accent : t.color.danger, fontSize:28, fontWeight:700, fontFamily:t.font.mono }}>{profit >= 0 ? "+" : "-"}${Math.abs(profit).toFixed(2)}</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <Label>Revenue Log</Label>
        <Btn variant={show ? "danger" : "secondary"} onClick={() => setShow(!show)} style={{ padding:"8px 14px" }}>{show ? "Cancel" : <><IconPlus sz={14} /> Add Revenue</>}</Btn>
      </div>
      {show && <div style={{ padding:20, background:t.color.surface, border:`1px solid ${t.color.border}`, borderRadius:14, marginBottom:16 }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:12 }}>
          <select value={src} onChange={e => setSrc(e.target.value)} style={{ flex:"1 1 150px", padding:"10px 12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:14, outline:"none" }}>
            {REVENUE_SOURCES.map(r => <option key={r.name} value={r.name}>{r.icon} {r.name}</option>)}
          </select>
          <Input value={amt} onChange={e => setAmt(e.target.value)} placeholder="$0.00" type="number" step="0.01" min="0" style={{ flex:"0 0 100px", fontFamily:t.font.mono }} />
        </div>
        <div style={{ display:"flex", gap:12 }}><Input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)" style={{ flex:1 }} /><Btn onClick={handleAdd}>Add</Btn></div>
      </div>}
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {project.revenues.length === 0 && <div style={{ padding:40, textAlign:"center", color:t.color.faint }}>No revenue yet — go get that first sale! 💪</div>}
        {[...project.revenues].reverse().map(rev => { const r = REVENUE_SOURCES.find(x => x.name === rev.source); return (
          <div key={rev.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"rgba(74,222,128,0.02)", border:"1px solid rgba(74,222,128,0.06)", borderRadius:10 }}>
            <span style={{ fontSize:16, width:24, textAlign:"center" }}>{r?.icon || "◌"}</span>
            <span style={{ color:"#fff", fontSize:14, flex:1 }}>{rev.source}</span>
            {rev.note && <span style={{ color:t.color.faint, fontSize:12 }}>{rev.note}</span>}
            <span style={{ color:"#4ADE80", fontSize:14, fontFamily:t.font.mono, fontWeight:600 }}>+${rev.amount.toFixed(2)}</span>
            <button onClick={() => onDeleteRevenue(rev.id)} style={{ background:"none", border:"none", color:t.color.faint, cursor:"pointer", padding:4 }}><IconTrash sz={14} /></button>
          </div>
        ); })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CODE REVIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CodeReview({ project, onAddReview }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const sev = { critical:{ bg:"rgba(255,107,107,0.08)", border:"rgba(255,107,107,0.2)", color:"#FF6B6B", label:"CRITICAL" }, warning:{ bg:"rgba(255,209,102,0.08)", border:"rgba(255,209,102,0.2)", color:"#FFD166", label:"WARNING" }, info:{ bg:"rgba(0,255,178,0.06)", border:"rgba(0,255,178,0.15)", color:"#00FFB2", label:"INFO" } };
  const scoreColor = sc => sc >= 8 ? t.color.accent : sc >= 5 ? t.color.warn : t.color.danger;

  const handleReview = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{ role:"user", content:`You are a senior code reviewer. Return ONLY valid JSON (no markdown, no backticks):\n{"score":<1-10>,"summary":"<1-2 sentences>","issues":[{"severity":"critical|warning|info","title":"<title>","description":"<detail>","fix":"<suggestion>"}],"strengths":["<s1>","<s2>"]}\nFocus: security, performance, accessibility, error handling.\nCODE:\n${code}` }] }),
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("\n");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      const review = { id:uid(), date:new Date().toISOString(), codeSnippet:code.slice(0,200), ...parsed };
      onAddReview(review); setActive(review); setCode("");
    } catch(e) {
      setActive({ id:uid(), date:new Date().toISOString(), codeSnippet:code.slice(0,200), score:0, summary:"Review failed — check console for details.", issues:[], strengths:[] });
    }
    setLoading(false);
  };

  if (active) return (
    <div>
      <Btn variant="ghost" onClick={() => setActive(null)} style={{ padding:"8px 0", marginBottom:20 }}><IconBack sz={16} /> Back</Btn>
      <div style={{ display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" }}>
        <div style={{ padding:20, background:`${scoreColor(active.score)}10`, border:`1px solid ${scoreColor(active.score)}30`, borderRadius:14, textAlign:"center", minWidth:100 }}>
          <div style={{ color:scoreColor(active.score), fontSize:48, fontWeight:700, fontFamily:t.font.mono }}>{active.score}</div>
          <div style={{ color:t.color.muted, fontSize:12 }}>/10</div>
        </div>
        <div style={{ flex:1, display:"flex", alignItems:"center" }}><div style={{ color:"#fff", fontSize:16, lineHeight:1.5 }}>{active.summary}</div></div>
      </div>
      {active.strengths?.length > 0 && <div style={{ marginBottom:24 }}><Label>Strengths</Label>{active.strengths.map((s,i) => <div key={i} style={{ display:"flex", gap:10, padding:"10px 14px", background:"rgba(0,255,178,0.04)", border:"1px solid rgba(0,255,178,0.1)", borderRadius:10, marginBottom:6 }}><span style={{ color:t.color.accent }}>✓</span><span style={{ color:"rgba(255,255,255,0.7)", fontSize:14 }}>{s}</span></div>)}</div>}
      {active.issues?.length > 0 && <div><Label>Issues</Label>{active.issues.map((iss,i) => { const st = sev[iss.severity] || sev.info; return (
        <div key={i} style={{ padding:16, background:st.bg, border:`1px solid ${st.border}`, borderRadius:12, marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <span style={{ padding:"2px 8px", background:`${st.color}20`, borderRadius:4, color:st.color, fontSize:10, fontWeight:700, fontFamily:t.font.mono }}>{st.label}</span>
            <span style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{iss.title}</span>
          </div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, lineHeight:1.5 }}>{iss.description}</div>
          {iss.fix && <div style={{ padding:"10px 14px", background:"rgba(0,0,0,0.3)", borderRadius:8, marginTop:10 }}>
            <div style={{ color:t.color.faint, fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Suggested Fix</div>
            <code style={{ color:"#E0E0E0", fontSize:12, fontFamily:t.font.mono, whiteSpace:"pre-wrap", lineHeight:1.5 }}>{iss.fix}</code>
          </div>}
        </div>
      ); })}</div>}
    </div>
  );

  return (
    <div>
      <div style={{ padding:"20px 24px", background:t.color.surface, borderRadius:14, border:`1px solid ${t.color.border}`, marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}><IconCode sz={18} /><span style={{ color:"#fff", fontSize:15, fontWeight:600, fontFamily:t.font.display }}>Paste your code for review</span></div>
        <textarea value={code} onChange={e => setCode(e.target.value)} placeholder={"// Paste your vibecoded component here..."}
          style={{ width:"100%", minHeight:200, padding:16, background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#E0E0E0", fontSize:13, fontFamily:t.font.mono, outline:"none", resize:"vertical", lineHeight:1.6, boxSizing:"border-box" }} />
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12 }}>
          <Btn onClick={handleReview} disabled={!code.trim() || loading}>
            {loading ? <><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>⟳</span> Reviewing...</> : <><IconCode sz={16} /> Review Code</>}
          </Btn>
        </div>
      </div>
      {project.codeReviews.length > 0 && <div><Label>Past Reviews</Label>{[...project.codeReviews].reverse().map(rev => (
        <button key={rev.id} onClick={() => setActive(rev)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", width:"100%", textAlign:"left", cursor:"pointer", background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.04)", borderRadius:10, marginBottom:4 }}>
          <div style={{ width:36, height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:`${scoreColor(rev.score)}15`, color:scoreColor(rev.score), fontSize:16, fontWeight:700, fontFamily:t.font.mono }}>{rev.score}</div>
          <div style={{ flex:1 }}>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontFamily:t.font.mono }}>{rev.codeSnippet}...</div>
            <div style={{ color:t.color.faint, fontSize:11, marginTop:2 }}>{rev.issues?.length || 0} issues</div>
          </div>
          <IconArrow sz={16} />
        </button>
      ))}</div>}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACHIEVEMENTS PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AchievementsPanel({ unlockedKeys }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:12 }}>
      {ACHIEVEMENTS.map(a => { const unlocked = unlockedKeys.includes(a.key); return (
        <div key={a.key} style={{ padding:16, borderRadius:14, textAlign:"center", background: unlocked ? `${a.color}08` : "rgba(255,255,255,0.015)", border:`1px solid ${unlocked ? a.color + "30" : "rgba(255,255,255,0.04)"}`, opacity: unlocked ? 1 : 0.4 }}>
          <div style={{ fontSize:32, marginBottom:8, filter: unlocked ? "none" : "grayscale(1)" }}>{a.icon}</div>
          <div style={{ color: unlocked ? "#fff" : t.color.faint, fontSize:13, fontWeight:600 }}>{a.title}</div>
          <div style={{ color:t.color.faint, fontSize:11, marginTop:4 }}>{a.desc}</div>
          {unlocked && <div style={{ color:a.color, fontSize:10, fontFamily:t.font.mono, marginTop:6 }}>✓ UNLOCKED</div>}
        </div>
      ); })}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW PROJECT MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function NewProjectModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🚀");
  const [budget, setBudget] = useState("");
  const emojis = ["🚀","🤖","🎨","💰","🔥","⚡","🌊","🎯","🧪","📦","🛠️","🌟"];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#1A1A2E", border:`1px solid ${t.color.border}`, borderRadius:20, padding:32, width:440, maxWidth:"90vw", animation:"popIn 0.3s ease" }}>
        <h2 style={{ color:"#fff", fontSize:20, fontFamily:t.font.display, margin:"0 0 24px" }}>New Project</h2>
        <div style={{ marginBottom:20 }}>
          <label style={{ color:t.color.muted, fontSize:12, display:"block", marginBottom:8 }}>Project Name</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="My Awesome App" style={{ width:"100%" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ color:t.color.muted, fontSize:12, display:"block", marginBottom:8 }}>Budget (optional)</label>
          <Input value={budget} onChange={e => setBudget(e.target.value)} placeholder="$100" type="number" min="0" style={{ width:"100%", fontFamily:t.font.mono }} />
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ color:t.color.muted, fontSize:12, display:"block", marginBottom:8 }}>Icon</label>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {emojis.map(e => <button key={e} onClick={() => setEmoji(e)} style={{ width:40, height:40, borderRadius:10, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", border: emoji === e ? "2px solid #00FFB2" : "1px solid rgba(255,255,255,0.08)", background: emoji === e ? "rgba(0,255,178,0.1)" : "rgba(255,255,255,0.03)" }}>{e}</button>)}
          </div>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <Btn variant="secondary" onClick={onClose} style={{ flex:1 }}>Cancel</Btn>
          <Btn onClick={() => { if (name.trim()) onSave({ name:name.trim(), emoji, budget: budget ? parseFloat(budget) : null }); }} disabled={!name.trim()} style={{ flex:1 }}>Create Project</Btn>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function DashboardPage({ projects, profile, onSelectProject, onNewProject, onShowAchievements }) {
  const totalSpend = projects.reduce((s, p) => s + p.costs.reduce((ss, c) => ss + c.amount, 0), 0);
  const totalRev = projects.reduce((s, p) => s + p.revenues.reduce((ss, r) => ss + r.amount, 0), 0);
  const profit = totalRev - totalSpend;
  const avgReady = projects.length ? Math.round(projects.reduce((s, p) => s + (Object.values(p.checklist).filter(Boolean).length / CHECKLIST_TEMPLATES.length) * 100, 0) / projects.length) : 0;
  return (
    <div style={{ animation:"fadeIn 0.3s ease" }}>
      <div className="arkhe-stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, marginBottom:24 }}>
        <div style={{ padding:"16px 20px", background:"rgba(179,98,255,0.06)", border:"1px solid rgba(179,98,255,0.12)", borderRadius:12 }}>
          <div style={{ color:t.color.muted, fontSize:11, marginBottom:4 }}>Total Spend</div>
          <div style={{ color:t.color.accent2, fontSize:24, fontWeight:700, fontFamily:t.font.mono }}>${totalSpend.toFixed(2)}</div>
        </div>
        <div style={{ padding:"16px 20px", background:"rgba(74,222,128,0.05)", border:"1px solid rgba(74,222,128,0.1)", borderRadius:12 }}>
          <div style={{ color:t.color.muted, fontSize:11, marginBottom:4 }}>Revenue</div>
          <div style={{ color:"#4ADE80", fontSize:24, fontWeight:700, fontFamily:t.font.mono }}>${totalRev.toFixed(2)}</div>
        </div>
        <div style={{ padding:"16px 20px", background: profit >= 0 ? "rgba(0,255,178,0.04)" : "rgba(255,107,107,0.04)", border:`1px solid ${profit >= 0 ? "rgba(0,255,178,0.1)" : "rgba(255,107,107,0.1)"}`, borderRadius:12 }}>
          <div style={{ color:t.color.muted, fontSize:11, marginBottom:4 }}>Net P&L</div>
          <div style={{ color: profit >= 0 ? t.color.accent : t.color.danger, fontSize:24, fontWeight:700, fontFamily:t.font.mono }}>{profit >= 0 ? "+" : "-"}${Math.abs(profit).toFixed(2)}</div>
        </div>
        <div style={{ padding:"16px 20px", background:t.color.surface, border:`1px solid ${t.color.border}`, borderRadius:12 }}>
          <div style={{ color:t.color.muted, fontSize:11, marginBottom:4 }}>Avg Ship Ready</div>
          <div style={{ color:t.color.accent, fontSize:24, fontWeight:700, fontFamily:t.font.mono }}>{avgReady}%</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {PROJECT_STATUSES.map(st => { const count = projects.filter(p => p.status === st.key).length; if (!count) return null; return (
          <div key={st.key} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", background:`${st.color}08`, borderRadius:8, border:`1px solid ${st.color}20` }}>
            <span style={{ fontSize:12 }}>{st.icon}</span><span style={{ color:st.color, fontSize:12, fontFamily:t.font.mono, fontWeight:600 }}>{count}</span><span style={{ color:t.color.faint, fontSize:11 }}>{st.label}</span>
          </div>
        ); })}
      </div>
      <Label>Your Projects</Label>
      <div className="arkhe-projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:16 }}>
        {projects.map(project => {
          const total = CHECKLIST_TEMPLATES.length;
          const checked = Object.values(project.checklist).filter(Boolean).length;
          const pct = Math.round((checked / total) * 100);
          const cost = project.costs.reduce((s, c) => s + c.amount, 0);
          const rev = project.revenues.reduce((s, r) => s + r.amount, 0);
          const statusDef = PROJECT_STATUSES.find(st => st.key === project.status);
          return (
            <div key={project.id} onClick={() => onSelectProject(project.id)} style={{ background:"linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", border:`1px solid ${t.color.border}`, borderRadius:16, padding:24, cursor:"pointer", transition:"all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,178,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.color.border; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:28 }}>{project.emoji}</span>
                    {statusDef && <span style={{ padding:"3px 8px", borderRadius:6, fontSize:10, fontWeight:600, fontFamily:t.font.mono, background:`${statusDef.color}15`, color:statusDef.color }}>{statusDef.icon} {statusDef.label}</span>}
                  </div>
                  <div style={{ color:"#fff", fontSize:18, fontWeight:600, fontFamily:t.font.display, marginBottom:4 }}>{project.name}</div>
                  <div style={{ color:t.color.faint, fontSize:12 }}>Created {project.createdAt}</div>
                </div>
                <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ProgressRing percent={pct} size={64} stroke={5} />
                  <span style={{ position:"absolute", fontSize:14, fontWeight:700, color:"#fff", fontFamily:t.font.mono }}>{pct}%</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:16, flexWrap:"wrap" }}>
                <Pill label="Ship" value={`${checked}/${total}`} color={pct >= 80 ? t.color.accent : t.color.warn} />
                <Pill label="Spend" value={`$${cost.toFixed(0)}`} color={t.color.accent2} />
                {rev > 0 && <Pill label="Rev" value={`$${rev.toFixed(0)}`} color="#4ADE80" />}
              </div>
            </div>
          );
        })}
      </div>
      {projects.length === 0 && <div style={{ padding:60, textAlign:"center", color:t.color.faint }}><div style={{ fontSize:48, marginBottom:16 }}>🚀</div><div style={{ fontSize:16 }}>Create your first project to get started</div></div>}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROJECT DETAIL PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProjectPage({ project, onToggleChecklist, onAddCost, onDeleteCost, onAddRevenue, onDeleteRevenue, onAddReview, onStatusChange, onDelete, onBack }) {
  const [tab, setTab] = useState("ship");
  if (!project) return <div style={{ padding:60, textAlign:"center", color:t.color.faint }}>Project not found</div>;
  return (
    <div style={{ animation:"fadeIn 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={onBack} style={{ background:"none", border:"none", color:t.color.faint, cursor:"pointer", padding:4 }}><IconBack sz={20} /></button>
          <span style={{ fontSize:32 }}>{project.emoji}</span>
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, fontFamily:t.font.display, margin:0 }}>{project.name}</h1>
            <div style={{ color:t.color.faint, fontSize:12 }}>Created {project.createdAt}</div>
          </div>
        </div>
        <Btn variant="danger" onClick={() => { if (confirm("Delete this project?")) onDelete(project.id); }} style={{ padding:"8px 12px" }}><IconTrash sz={14} /></Btn>
      </div>
      <div style={{ marginBottom:24 }}><StatusSelector status={project.status} onChange={onStatusChange} /></div>
      <div className="arkhe-tabs" style={{ display:"flex", gap:6, marginBottom:28, flexWrap:"wrap" }}>
        <TabBtn active={tab === "ship"} onClick={() => setTab("ship")}>🚢 Ship</TabBtn>
        <TabBtn active={tab === "cost"} onClick={() => setTab("cost")}>💸 Costs</TabBtn>
        <TabBtn active={tab === "revenue"} onClick={() => setTab("revenue")}>💰 Revenue</TabBtn>
        <TabBtn active={tab === "review"} onClick={() => setTab("review")}>🔍 Code Review</TabBtn>
      </div>
      {tab === "ship" && <ShipChecklist project={project} onToggle={onToggleChecklist} />}
      {tab === "cost" && <CostDashboard project={project} onAddCost={onAddCost} onDeleteCost={onDeleteCost} />}
      {tab === "revenue" && <RevenueTracker project={project} onAddRevenue={onAddRevenue} onDeleteRevenue={onDeleteRevenue} />}
      {tab === "review" && <CodeReview project={project} onAddReview={onAddReview} />}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN ARKHE SHELL (state + header + routing)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ArkheShell() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [toast, setToast] = useState(null);
  const [xpPopup, setXpPopup] = useState(null);

  const awardXP = useCallback((action) => {
    const def = XP_ACTIONS[action]; if (!def) return;
    setProfile(p => ({ ...p, xp: p.xp + def.xp }));
    setXpPopup({ amount: def.xp, label: def.label });
  }, []);

  const unlockAchievement = useCallback((key) => {
    setProfile(p => {
      if (p.achievements.includes(key)) return p;
      setTimeout(() => setToast(key), 100);
      return { ...p, achievements: [...p.achievements, key] };
    });
  }, []);

  useEffect(() => {
    if (projects.some(p => Object.values(p.checklist).filter(Boolean).length === CHECKLIST_TEMPLATES.length)) unlockAchievement("first_ship");
    if (projects.length >= 5) unlockAchievement("diversified");
    if (projects.some(p => { const r = p.revenues.reduce((s,x) => s+x.amount,0), c = p.costs.reduce((s,x) => s+x.amount,0); return r > c && r > 0; })) unlockAchievement("profit_mode");
    const totalSpend = projects.reduce((s,p) => s + p.costs.reduce((ss,c) => ss+c.amount,0), 0);
    if (totalSpend >= 500) unlockAchievement("big_spender");
    if (profile.streak_days >= 3) unlockAchievement("streak_3");
    if (profile.streak_days >= 7) unlockAchievement("streak_7");
  }, [projects, profile.streak_days, unlockAchievement]);

  const updateProject = (id, fn) => setProjects(prev => prev.map(p => p.id === id ? fn(p) : p));

  const handleCreate = ({ name, emoji, budget }) => {
    const p = { id:uid(), name, emoji, status:"building", budget, createdAt:today(), checklist:{}, costs:[], revenues:[], codeReviews:[] };
    setProjects(prev => [...prev, p]); setShowNewProject(false); awardXP("PROJECT_CREATED");
    navigate(`/project/${p.id}`);
  };

  return (
    <div style={{ minHeight:"100vh", background:t.color.bg, color:"#fff", fontFamily:t.font.body }}>
      {toast && <AchievementToast achievement={toast} onDone={() => setToast(null)} />}
      {xpPopup && <XPPopup amount={xpPopup.amount} label={xpPopup.label} onDone={() => setXpPopup(null)} />}

      {/* Header */}
      <header style={{ padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${t.color.border}`, background:"rgba(10,10,27,0.9)", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }} onClick={() => { setShowAchievements(false); navigate("/"); }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg, #00FFB2, #B362FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#0A0A1B" }}>A</div>
          <div>
            <div style={{ fontSize:16, fontWeight:700, fontFamily:t.font.display, lineHeight:1 }}>ARKHE</div>
            <div style={{ fontSize:9, color:t.color.faint, fontFamily:t.font.mono, letterSpacing:1 }}>VIBECODER COMMAND CENTER</div>
          </div>
        </div>
        <div className="arkhe-header-actions" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <XPBar xp={profile.xp} streak={profile.streak_days} />
          <button onClick={() => { setShowAchievements(!showAchievements); navigate("/"); }} style={{
            background: showAchievements ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.03)",
            border:`1px solid ${showAchievements ? "rgba(255,215,0,0.3)" : t.color.border}`,
            borderRadius:10, padding:"8px 12px", cursor:"pointer", color: showAchievements ? "#FFD700" : t.color.muted, display:"flex", alignItems:"center", gap:6, fontSize:12,
          }}><IconTrophy sz={16} /> <span style={{ fontFamily:t.font.mono, fontWeight:600 }}>{profile.achievements.length}</span></button>
          <Btn onClick={() => setShowNewProject(true)}><IconPlus sz={16} /> New Project</Btn>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth:920, margin:"0 auto", padding:"32px 24px" }}>
        <Routes>
          <Route path="/" element={
            showAchievements ? (
              <div style={{ animation:"fadeIn 0.3s ease" }}>
                <h2 style={{ fontSize:22, fontWeight:700, fontFamily:t.font.display, marginBottom:8 }}>🏆 Achievements</h2>
                <p style={{ color:t.color.muted, fontSize:14, marginBottom:24 }}>{profile.achievements.length} of {ACHIEVEMENTS.length} unlocked</p>
                <AchievementsPanel unlockedKeys={profile.achievements} />
              </div>
            ) : (
              <DashboardPage projects={projects} profile={profile} onSelectProject={id => navigate(`/project/${id}`)} onNewProject={() => setShowNewProject(true)} onShowAchievements={() => setShowAchievements(true)} />
            )
          } />
          <Route path="/project/:id" element={
            <ProjectRouteWrapper projects={projects} updateProject={updateProject} awardXP={awardXP} unlockAchievement={unlockAchievement} onDelete={id => { setProjects(prev => prev.filter(p => p.id !== id)); navigate("/"); }} />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} onSave={handleCreate} />}
    </div>
  );
}

// Route wrapper to get project by URL param
function ProjectRouteWrapper({ projects, updateProject, awardXP, unlockAchievement, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  return (
    <ProjectPage
      project={project}
      onBack={() => navigate("/")}
      onToggleChecklist={itemId => {
        const wasChecked = project?.checklist[itemId];
        updateProject(id, p => ({ ...p, checklist: { ...p.checklist, [itemId]: !p.checklist[itemId] } }));
        if (!wasChecked) { awardXP("CHECKLIST_ITEM"); const newCount = Object.values({ ...project.checklist, [itemId]: true }).filter(Boolean).length; if (newCount === CHECKLIST_TEMPLATES.length) awardXP("PROJECT_SHIPPED"); }
      }}
      onAddCost={cost => { updateProject(id, p => ({ ...p, costs: [...p.costs, cost] })); awardXP("COST_LOGGED"); }}
      onDeleteCost={costId => updateProject(id, p => ({ ...p, costs: p.costs.filter(c => c.id !== costId) }))}
      onAddRevenue={rev => {
        const hadRev = project.revenues.length > 0;
        updateProject(id, p => ({ ...p, revenues: [...p.revenues, rev] }));
        awardXP("REVENUE_LOGGED"); if (!hadRev) awardXP("FIRST_REVENUE");
      }}
      onDeleteRevenue={revId => updateProject(id, p => ({ ...p, revenues: p.revenues.filter(r => r.id !== revId) }))}
      onAddReview={review => {
        updateProject(id, p => ({ ...p, codeReviews: [...p.codeReviews, review] }));
        awardXP("CODE_REVIEW"); if (review.score >= 8) awardXP("CODE_REVIEW_BONUS"); if (review.score >= 9) unlockAchievement("clean_code");
      }}
      onStatusChange={status => updateProject(id, p => ({ ...p, status }))}
      onDelete={onDelete}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT APP WITH HASH ROUTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  return (
    <HashRouter>
      <ArkheShell />
    </HashRouter>
  );
}
