import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { links } from "../../links";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [globalLang, setGlobalLang] = useState("en");
  const [editingId, setEditingId] = useState(null); // Track which tile is being edited

  // Fetch FAQs from API
  const handleFetchFaqs=async()=>{
    const url=links.base+links.getFaqs+`?lang=${globalLang}`
    const response=await fetch(url)
    const result=await response.json()
    console.log(result)
    if(result.success==true){
        const {content,lang}=result.data;
        setFaqs(content)
    }
  }
  useEffect(() => {
    console.log(globalLang)
    handleFetchFaqs()
  }, [globalLang]);

  // Handle saving a specific FAQ
  const handleSave = async (id, question,answer) => {
    // console.log(updatedData)
    
    try {
        const url=links.base+links.editFaq
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,question,answer
        }),
      });

      const result=await res.json()
      if(result.success==false){
      console.log(result)

        alert(result.msg || "Server Error occurred.")
      }
      // Update state with new data
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) => (faq.id === id ? { ...faq, ...{id,question,answer} } : faq))
      );

      setEditingId(null); // Exit edit mode
    } catch (err) {
      console.error("Error saving FAQ:", err);
    }
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 flex flex-col overflow-hidden">
      {/* Global Language Selector */}
      <div className="mb-4 flex justify-end items-end">
      
        <select
          value={globalLang}
          onChange={(e) => {console.log(e.target.value);setGlobalLang(e.target.value)}}
          className="p-2 border rounded outline-none bg-white"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      {/* Render FAQ Tiles */}
      <div className="flex-1 bg-slate-900 overflow-auto flex flex-wrap gap-4">
        {faqs.map((faq) => (
          <Tile
            key={faq.id}
            faq={faq}
            lang={globalLang}
            isEditing={editingId === faq.id}
            setEditingId={setEditingId}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqList;
