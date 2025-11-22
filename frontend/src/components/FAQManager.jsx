import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function FAQManager(){
  const [list,setList]=useState([]);
  const [q,setQ]=useState('');
  const [a,setA]=useState('');
  const [search,setSearch]=useState('');
  const [editing,setEditing]=useState(null);

  // Load FAQ list (fixed useEffect)
  useEffect(() => {
    async function loadFAQs() {
      try {
        const res = await api.searchFAQ("");
        setList(res.data);
      } catch (err) {
        console.error("FAQ load failed", err);
      }
    }
    loadFAQs();
  }, []);

  const add=async()=>{
    if(!q.trim()||!a.trim())return;
    const res=await api.addFAQ({question:q,answer:a});
    setList(prev=>[res.data,...prev]);
    setQ('');setA('');
  };

  const startEdit=(f)=>{ setEditing(f); setQ(f.question); setA(f.answer); };
  
  const saveEdit=async()=>{
    try{
      await api.deleteFAQ(editing._id);
      const res=await api.addFAQ({question:q,answer:a});
      setList(prev=>[res.data,...prev.filter(i=>i._id!==editing._id)]);
      setEditing(null); setQ(''); setA('');
    }catch(e){ console.error(e); }
  };

  const remove=async(id)=>{
    if(!confirm('Delete?'))return;
    await api.deleteFAQ(id);
    setList(prev=>prev.filter(x=>x._id!==id));
  };

  const askBot=(q)=> window.dispatchEvent(new CustomEvent('askFAQ',{detail:q}));

  return (
    <div className="space-y-6">
      <div>
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Search FAQs"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={async()=>{ const r=await api.searchFAQ(search); setList(r.data); }}
          className="px-3 py-2 bg-indigo-600 text-white rounded"
        >
          Search
        </button>
        <button onClick={()=>{
          setSearch("");
          async function reload(){ 
            const r=await api.searchFAQ(""); 
            setList(r.data); 
          }
          reload();
        }} className="ml-2 px-3 py-2 border rounded">Reset</button>
      </div>

      <div className="p-3 border rounded" style={{background:"var(--panel)"}}>
        <h4 className="font-semibold">{editing?'Edit FAQ':'Add FAQ'}</h4>
        
        <input className="w-full px-3 py-2 border rounded mb-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Question" />

        <textarea className="w-full px-3 py-2 border rounded mb-2" value={a} onChange={e=>setA(e.target.value)} placeholder="Answer" />

        {editing ? (
          <div>
            <button onClick={saveEdit} className="px-3 py-2 bg-green-600 text-white rounded mr-2">Save</button>
            <button onClick={()=>{setEditing(null);setQ('');setA('');}} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        ) : (
          <button onClick={add} className="px-3 py-2 bg-green-600 text-white rounded">Add FAQ</button>
        )}
      </div>

      <div className="space-y-3">
        {list.map(f=>(
          <div key={f._id} className="p-3 border rounded flex justify-between items-start">
            <div>
              <div className="font-medium">{f.question}</div>
              <div className="text-sm text-[var(--muted)]">{f.answer}</div>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={()=>askBot(f.question)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Ask Bot</button>
              <button onClick={()=>startEdit(f)} className="px-3 py-1 border rounded text-sm">Edit</button>
              <button onClick={()=>remove(f._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
