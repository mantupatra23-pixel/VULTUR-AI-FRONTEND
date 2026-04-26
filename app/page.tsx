"use client";
import { useEffect, useState } from 'react';

export default function VulturDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ AAPKA LIVE BACKEND URL
  const BACKEND_URL = "https://vultur-ai.onrender.com"; 

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/leads`);
      if (!res.ok) throw new Error("Connection Lost");
      const data = await res.json();
      setLeads(data);
      setLoading(false);
    } catch (err) {
      console.error("Vultur Hunt Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 20000); // 20 Seconds Auto-Refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#39FF14] p-4 md:p-10 font-mono">
      {/* --- TOP STATUS BAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#39FF14] pb-6 mb-10 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic text-white shadow-[#39FF14]_2px_2px]">
            VULTUR <span className="text-[#39FF14]">AI</span>
          </h1>
          <p className="text-[10px] mt-2 tracking-[0.3em] uppercase opacity-70">
            System Identity: Michael // Global Predator Mode
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="flex items-center gap-3 bg-[#39FF14]/10 px-4 py-2 border border-[#39FF14]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase">Radar Active: Sniffing Leads</span>
          </div>
          <p className="text-[9px] mt-1 text-white/40">HOST: {BACKEND_URL}</p>
        </div>
      </div>

      {/* --- DASHBOARD GRID --- */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 border-2 border-dashed border-[#39FF14]/20">
          <div className="animate-spin h-10 w-10 border-4 border-[#39FF14] border-t-transparent rounded-full mb-4"></div>
          <p className="text-xl tracking-widest animate-pulse font-black">INITIALIZING SATELLITE UPLINK...</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {leads.length > 0 ? leads.map((lead: any) => (
            <div key={lead.id} className="relative group bg-[#0a0a0a] border-2 border-[#39FF14]/30 p-6 transition-all duration-500 hover:border-[#39FF14] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]">
              
              {/* Score Indicator */}
              <div className="absolute -top-4 -right-2 bg-[#39FF14] text-black font-black px-3 py-1 text-xs skew-x-12 shadow-[4px_4px_0px_white]">
                MATCH: {lead.score}%
              </div>

              {/* Source & Time */}
              <div className="flex justify-between items-center mb-6 border-b border-[#39FF14]/10 pb-2">
                <span className="text-black bg-white px-2 py-0.5 text-[10px] font-black uppercase">
                  {lead.platform}
                </span>
                <span className="text-[10px] opacity-50 uppercase italic">
                  {new Date(lead.created_at).toLocaleTimeString()}
                </span>
              </div>

              {/* Client Info */}
              <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight truncate">
                {lead.client_name}
              </h3>
              
              {/* Raw Requirements */}
              <div className="bg-[#111] p-3 border-l-2 border-white/20 mb-6 h-28 overflow-y-auto">
                <p className="text-[11px] text-gray-400 leading-relaxed italic">
                  <span className="text-[#39FF14] not-italic font-bold mr-1">>> ANALYZING_DESC:</span>
                  {lead.description}
                </p>
              </div>

              {/* Michael's Strategy */}
              <div className="mb-8 relative">
                <div className="absolute -top-3 left-2 bg-black px-2 text-[#39FF14] text-[9px] font-bold uppercase tracking-widest border border-[#39FF14]">
                  Michael's Pitch
                </div>
                <div className="pt-4 pb-2 px-1 border-t border-[#39FF14]/50">
                  <p className="text-sm text-gray-100 font-sans leading-relaxed italic">
                    "{lead.proposal}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a href={lead.source_link} target="_blank" rel="noopener noreferrer" 
                   className="bg-[#39FF14] text-black text-center py-3 text-[10px] font-black uppercase hover:bg-white transition-all shadow-[3px_3px_0px_white]">
                  Engage Target
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(lead.proposal);
                    alert("MICHAEL: Pitch Copied to Tactical Clipboard.");
                  }}
                  className="border-2 border-[#39FF14] text-[#39FF14] text-center py-3 text-[10px] font-black uppercase hover:bg-[#39FF14]/10 transition-all">
                  Copy Pitch
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full border-2 border-dashed border-[#39FF14]/20 py-32 text-center flex flex-col items-center justify-center">
              <div className="animate-pulse mb-4 text-4xl">📡</div>
              <p className="text-2xl font-black uppercase tracking-[0.4em] opacity-40">
                Scanning Global Markets...
              </p>
              <p className="text-[10px] mt-4 opacity-30">MICHAEL IS LOOKING FOR HIGH-TICKET PREY</p>
            </div>
          )}
        </div>
      )}

      {/* --- FOOTER LOGS --- */}
      <footer className="mt-20 border-t border-[#39FF14]/20 pt-4 flex justify-between items-center opacity-40">
        <p className="text-[9px]">VULTUR-OS v2.1 // BUILT FOR BHARAT</p>
        <p className="text-[9px] uppercase">© 2026 VISORA AI AUTOMATION</p>
      </footer>
    </main>
  );
}
