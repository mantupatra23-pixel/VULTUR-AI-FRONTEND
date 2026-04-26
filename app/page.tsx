"use client";
import { useEffect, useState } from 'react';

export default function VulturDashboard() {
  const [leads, setLeads] = useState([]);
  const BACKEND_URL = "https://vultur-ai-backend.onrender.com"; // Aapna sahi Render URL yahan dalein

  useEffect(() => {
    fetch(`${BACKEND_URL}/leads`)
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Hunt Error:", err));
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#39FF14] p-6 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#39FF14] pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">🦅 VULTUR AI // COMMAND CENTER</h1>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39FF14]"></span>
          </span>
          <p className="text-sm">MICHAEL IS HUNTING...</p>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leads.length > 0 ? leads.map((lead: any) => (
          <div key={lead.id} className="border border-[#39FF14]/30 bg-[#111] p-5 rounded-lg hover:border-[#39FF14] transition-all group">
            <div className="flex justify-between mb-3">
              <span className="bg-[#39FF14] text-black px-2 py-0.5 text-xs font-bold uppercase">{lead.platform}</span>
              <span className="text-[#39FF14] text-xs opacity-60">{new Date(lead.created_at).toLocaleDateString()}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">Target: {lead.client_name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 italic">"{lead.description}"</p>
            
            <div className="bg-black/50 p-3 rounded border-l-2 border-[#39FF14] mb-4">
              <p className="text-xs text-gray-500 uppercase mb-1">Michael's Pitch:</p>
              <p className="text-sm text-white leading-relaxed">{lead.proposal}</p>
            </div>

            <div className="flex gap-2">
              <a href={lead.source_link} target="_blank" className="flex-1 text-center py-2 border border-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-colors text-sm font-bold">
                VIEW TARGET
              </a>
              <button onClick={() => navigator.clipboard.writeText(lead.proposal)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors">
                📋
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 border border-dashed border-[#39FF14]/20">
            <p className="animate-pulse">SCOUTING GLOBAL MARKETS... NO TARGETS YET.</p>
          </div>
        )}
      </div>
    </main>
  );
}
