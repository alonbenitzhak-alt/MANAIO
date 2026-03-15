"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/lib/AuthContext";
import LoginForm from "@/components/LoginForm";
import { useProperties } from "@/lib/PropertiesContext";
import { Property, Lead } from "@/lib/types";
import { supabase } from "@/lib/supabase";

type Tab = "properties" | "closed" | "leads" | "agents" | "users" | "pending_agents";

/* ─────────────── Property Form ─────────────── */
function PropertyForm({
  property,
  onSave,
  onCancel,
}: {
  property?: Property;
  onSave: (data: Property) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Property>(
    property || {
      id: Date.now().toString(),
      title: "",
      country: "Greece",
      city: "",
      price: 0,
      expected_roi: 0,
      bedrooms: 1,
      property_type: "Apartment",
      description: "",
      images: ["", "", ""],
      agent_name: "",
      agent_email: "",
      status: "active",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">
        {property ? "עריכת נכס" : "הוספת נכס חדש"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">מדינה</label>
          <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="Greece">יוון</option>
            <option value="Cyprus">קפריסין</option>
            <option value="Georgia">גאורגיה</option>
            <option value="Portugal">פורטוגל</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">עיר</label>
          <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (€)</label>
          <input type="number" required min={0} value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">תשואה צפויה (%)</label>
          <input type="number" required min={0} step={0.1} value={form.expected_roi} onChange={(e) => setForm({ ...form, expected_roi: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">חדרי שינה</label>
          <input type="number" required min={1} value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: parseInt(e.target.value) || 1 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">סוג נכס</label>
          <select value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="Apartment">דירה</option>
            <option value="Villa">וילה</option>
            <option value="Studio">סטודיו</option>
            <option value="Condo">קונדו</option>
            <option value="Penthouse">פנטהאוז</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם סוכן</label>
          <input type="text" required value={form.agent_name} onChange={(e) => setForm({ ...form, agent_name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">אימייל סוכן</label>
          <input type="email" required value={form.agent_email} onChange={(e) => setForm({ ...form, agent_email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
          <select value={form.status || "active"} onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "closed" })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="active">פעיל</option>
            <option value="closed">סגור</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
        <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">קישורי תמונות (שורה אחת לכל קישור)</label>
        <textarea rows={3} value={form.images.join("\n")} onChange={(e) => setForm({ ...form, images: e.target.value.split("\n").filter(Boolean) })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" placeholder="https://images.unsplash.com/..." />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors">
          {property ? "עדכן נכס" : "הוסף נכס"}
        </button>
        <button type="button" onClick={onCancel} className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
          ביטול
        </button>
      </div>
    </form>
  );
}

/* ─────────────── Stat Card ─────────────── */
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

/* ─────────────── Properties Tab ─────────────── */
function PropertiesTab({ status }: { status: "active" | "closed" }) {
  const { properties, updateProperty, deleteProperty, addProperty } = useProperties();
  const [editing, setEditing] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = properties.filter((p) => (p.status || "active") === status);

  const handleSave = async (property: Property) => {
    if (editing) {
      await updateProperty(property);
    } else {
      await addProperty({ ...property, status });
    }
    setEditing(null);
    setShowForm(false);
  };

  const handleToggleStatus = async (p: Property) => {
    const newStatus = (p.status || "active") === "active" ? "closed" : "active";
    await updateProperty({ ...p, status: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק נכס זה?")) {
      await deleteProperty(id);
    }
  };

  return (
    <div>
      {status === "active" && (
        (showForm || editing) ? (
          <div className="mb-6">
            <PropertyForm
              property={editing || undefined}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setShowForm(false); }}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            הוספת נכס חדש
          </button>
        )
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          {status === "active" ? "אין נכסים פעילים" : "אין נכסים סגורים"}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">נכס</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">מיקום</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">מחיר</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">תשואה</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">סוג</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="font-medium text-gray-900 line-clamp-1">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.city}, {p.country}</td>
                    <td className="px-6 py-4 font-medium">€{p.price.toLocaleString()}</td>
                    <td className="px-6 py-4"><span className="text-accent-600 font-semibold">{p.expected_roi}%</span></td>
                    <td className="px-6 py-4 text-gray-600">{p.property_type}</td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditing(p); setShowForm(false); }} className="text-primary-600 hover:text-primary-700 font-medium">עריכה</button>
                        <button onClick={() => handleToggleStatus(p)} className={`font-medium ${status === "active" ? "text-amber-600 hover:text-amber-700" : "text-green-600 hover:text-green-700"}`}>
                          {status === "active" ? "סגור" : "פתח מחדש"}
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 font-medium">מחק</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── Leads Tab ─────────────── */
function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { properties } = useProperties();

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const getPropertyTitle = (id: string | null) => {
    if (!id) return "פנייה כללית";
    const prop = properties.find((p) => p.id === id);
    return prop?.title || `נכס #${id}`;
  };

  if (loading) return <div className="text-center py-16 text-gray-400">טוען לידים...</div>;

  return leads.length === 0 ? (
    <div className="text-center py-16 text-gray-400">אין לידים עדיין</div>
  ) : (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-right px-6 py-3 font-semibold text-gray-600">שם</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">אימייל</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">טלפון</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">תקציב</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">נכס</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">הודעה</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">תאריך</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                <td className="px-6 py-4">
                  <a href={`mailto:${lead.email}`} className="text-primary-600 hover:underline">{lead.email}</a>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                </td>
                <td className="px-6 py-4 text-gray-600">{lead.investment_budget}</td>
                <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate">{getPropertyTitle(lead.property_id)}</td>
                <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{lead.message || "—"}</td>
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                  {lead.created_at ? new Date(lead.created_at).toLocaleDateString("he-IL") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────── Agents Tab ─────────────── */
function AgentsTab() {
  const { properties } = useProperties();

  const agents = useMemo(() => {
    const map = new Map<string, { name: string; email: string; country: string; city: string; propertyCount: number }>();
    properties.forEach((p) => {
      const key = p.agent_email;
      const existing = map.get(key);
      if (existing) {
        existing.propertyCount++;
      } else {
        map.set(key, { name: p.agent_name, email: p.agent_email, country: p.country, city: p.city, propertyCount: 1 });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.country.localeCompare(b.country));
  }, [properties]);

  return agents.length === 0 ? (
    <div className="text-center py-16 text-gray-400">לא נמצאו סוכנים</div>
  ) : (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-right px-6 py-3 font-semibold text-gray-600">סוכן</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">אימייל</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">מדינה</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">עיר</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">נכסים</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.email} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                      {agent.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{agent.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a href={`mailto:${agent.email}`} className="text-primary-600 hover:underline">{agent.email}</a>
                </td>
                <td className="px-6 py-4 text-gray-600">{agent.country}</td>
                <td className="px-6 py-4 text-gray-600">{agent.city}</td>
                <td className="px-6 py-4">
                  <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">{agent.propertyCount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────── Pending Agents Tab ─────────────── */
type PendingAgent = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  company: string;
  license_url: string | null;
  id_url: string | null;
  partnership_signed: boolean | null;
  created_at: string;
};

function DocStatus({ url, label, icon }: { url: string | null; label: string; icon: React.ReactNode }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-sm font-medium hover:bg-green-100 transition-colors"
      >
        <span className="w-5 h-5 text-green-500 shrink-0">{icon}</span>
        <span>{label}</span>
        <svg className="w-3.5 h-3.5 text-green-400 ms-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-sm font-medium">
      <span className="w-5 h-5 text-red-400 shrink-0">{icon}</span>
      <span>{label}</span>
      <span className="ms-auto text-xs text-red-400">חסר</span>
    </div>
  );
}

function PendingAgentsTab() {
  const [agents, setAgents] = useState<PendingAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, email, full_name, phone, company, license_url, id_url, partnership_signed, created_at")
        .eq("role", "agent")
        .or("approved.is.null,approved.eq.false")
        .order("created_at", { ascending: false });
      if (data) setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    await supabase.from("profiles").update({ approved: true }).eq("id", id);
    const agent = agents.find(a => a.id === id);
    if (agent) {
      fetch("/api/notify-agent-approved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: agent.email, name: agent.full_name || agent.email, approved: true }),
      }).catch(() => null);
    }
    setAgents(prev => prev.filter(a => a.id !== id));
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    if (!confirm("האם אתה בטוח שברצונך לדחות סוכן זה?")) return;
    setActionLoading(id);
    const agent = agents.find(a => a.id === id);
    await supabase.from("profiles").update({ approved: false, role: "buyer" }).eq("id", id);
    if (agent) {
      fetch("/api/notify-agent-approved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: agent.email, name: agent.full_name || agent.email, approved: false }),
      }).catch(() => null);
    }
    setAgents(prev => prev.filter(a => a.id !== id));
    setActionLoading(null);
  };

  if (loading) return <div className="text-center py-16 text-gray-400">טוען...</div>;

  return agents.length === 0 ? (
    <div className="text-center py-16 text-gray-400">
      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>אין בקשות סוכנים ממתינות</p>
    </div>
  ) : (
    <div className="space-y-5">
      {agents.map((agent) => {
        const allDocsOk = !!agent.license_url && !!agent.id_url && !!agent.partnership_signed;
        return (
          <div key={agent.id} className={`bg-white rounded-2xl border p-6 shadow-sm ${allDocsOk ? "border-amber-200" : "border-red-200"}`}>
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">ממתין לאישור</span>
                  {!allDocsOk && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">מסמכים חסרים</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{agent.full_name || "—"}</h3>
                <a href={`mailto:${agent.email}`} className="text-sm text-primary-600 hover:underline">{agent.email}</a>
                {agent.phone && <p className="text-sm text-gray-500 mt-0.5">{agent.phone}</p>}
                {agent.company && <p className="text-sm text-gray-500">{agent.company}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  נרשם: {new Date(agent.created_at).toLocaleDateString("he-IL")}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleApprove(agent.id)}
                  disabled={actionLoading === agent.id}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  אשר
                </button>
                <button
                  onClick={() => handleReject(agent.id)}
                  disabled={actionLoading === agent.id}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  דחה
                </button>
              </div>
            </div>

            {/* Documents & contract status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DocStatus
                url={agent.license_url}
                label="רישיון תיווך"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
              <DocStatus
                url={agent.id_url}
                label="תעודת זהות"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
                  </svg>
                }
              />
              {/* Partnership agreement status (no URL, just signed/not) */}
              {agent.partnership_signed ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-sm font-medium">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>הסכם שותפות</span>
                  <span className="ms-auto text-xs text-green-500">אושר</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-sm font-medium">
                  <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>הסכם שותפות</span>
                  <span className="ms-auto text-xs text-red-400">לא נחתם</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── Users Tab ─────────────── */
function UsersTab() {
  const [users, setUsers] = useState<{ id: string; email: string; role: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setUsers(data);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-16 text-gray-400">טוען משתמשים...</div>;

  return users.length === 0 ? (
    <div className="text-center py-16 text-gray-400">
      <p>לא נמצאו משתמשים רשומים</p>
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-right px-6 py-3 font-semibold text-gray-600">אימייל</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">תפקיד</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-600">הצטרף</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.email}</td>
                <td className="px-6 py-4 text-gray-600">{u.role}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(u.created_at).toLocaleDateString("he-IL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────── Admin Page ─────────────── */
const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "pending_agents", label: "סוכנים ממתינים", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { key: "properties", label: "נכסים פעילים", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { key: "leads", label: "לידים", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { key: "closed", label: "נכסים סגורים", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
  { key: "agents", label: "סוכנים", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
  { key: "users", label: "משתמשים", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
];

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const { properties } = useProperties();
  const [activeTab, setActiveTab] = useState<Tab>("pending_agents");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    supabase.from("leads").select("*").then(({ data }) => {
      if (data) setLeads(data);
    });
  }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">טוען...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">פאנל ניהול</h1>
          <p className="text-gray-500 mb-6 text-center">התחברו לגישה לפאנל הניהול</p>
          <LoginForm />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">גישה נדחתה</h1>
        <p className="text-gray-500">אין לכם הרשאה לגשת לפאנל הניהול.</p>
        <p className="text-gray-400 text-sm mt-1">מחובר כ: {user.email}</p>
      </div>
    );
  }

  const activeProperties = properties.filter((p) => (p.status || "active") === "active");
  const closedProperties = properties.filter((p) => p.status === "closed");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">פאנל ניהול</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="נכסים פעילים" value={activeProperties.length} color="text-green-600" />
            <StatCard label="סה״כ לידים" value={leads.length} color="text-blue-600" />
            <StatCard label="נכסים סגורים" value={closedProperties.length} color="text-amber-600" />
            <StatCard label="סוכנים" value={new Set(properties.map((p) => p.agent_email)).size} color="text-purple-600" />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "pending_agents" && <PendingAgentsTab />}
        {activeTab === "properties" && <PropertiesTab status="active" />}
        {activeTab === "closed" && <PropertiesTab status="closed" />}
        {activeTab === "leads" && <LeadsTab />}
        {activeTab === "agents" && <AgentsTab />}
        {activeTab === "users" && <UsersTab />}
      </div>
    </>
  );
}
