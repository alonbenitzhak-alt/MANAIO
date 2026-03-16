"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace("/");
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "48px 40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#f1f5f9",
            fontSize: "26px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          MANAIO
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "32px", fontSize: "14px" }}>
          האתר בקרוב יעלה לאוויר
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="הזן סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="rtl"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: error ? "1px solid #ef4444" : "1px solid #334155",
              background: "#0f172a",
              color: "#f1f5f9",
              fontSize: "15px",
              marginBottom: "12px",
              boxSizing: "border-box",
              outline: "none",
            }}
            autoFocus
          />
          {error && (
            <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "12px" }}>
              סיסמה שגויה
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: loading || !password ? "#334155" : "#3b82f6",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}
