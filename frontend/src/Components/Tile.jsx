import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { links, modules } from "../../links";
import Loader from "./Loader";
const Tile = ({ faq, lang, isEditing, setEditingId, onSave }) => {
  const [selectedLang, setSelectedLang] = useState(lang);

  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [load, setload] = useState(false);
  useEffect(() => {
    // Update question and answer when language changes
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setSelectedLang(lang);
  }, [lang, faq]);

  // Fetch translation when language changes
  const handleLanguageChange = async (newLang) => {
    try {
      const url = links.base + links.translateTo + `/${faq.id}/${newLang}`;
      const res = await fetch(url);
      const result = await res.json();
      console.log(result);
      if (result.success) {
        const { content } = result.data;
        setQuestion(content.question);
        setAnswer(content.answer);
      } else {
        alert(result.msg || "Server Error Occurred");
      }
    } catch (err) {
      console.error("Error fetching translation:", err);
      alert("Unable to Fetch- Error Occurred");
    }
  };
  useEffect(() => {
    handleLanguageChange(selectedLang);
  }, [selectedLang]);
  // Handle Save
  const handleSave = () => {
    onSave(faq.id, question, answer, setload);
  };

  return (
    <div
      className={`w-full border-2 p-4 rounded-lg bg-[#fff] shadow   ${
        isEditing ? "border-[#ff326c] " : " border-transparent"
      }`}
    >
      {/* Language Dropdown (Hidden in Edit Mode) */}
      {!isEditing && (
        <div className="mb-2">
          <label className="text-sm font-bold mr-2">Language:</label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
          </select>
        </div>
      )}

      {/* Question Field */}
      <div className="mb-2">
        <label className="block font-semibold">Question:</label>
        {isEditing ? (
          <ReactQuill
            value={question}
            onChange={setQuestion}
            modules={modules}
          />
        ) : (
          <div
            className="p-2 border"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question),
            }}
          ></div>
        )}
      </div>

      {/* Answer Field */}
      <div className="mb-2">
        <label className="block font-semibold">Answer:</label>
        {isEditing ? (
          <ReactQuill value={answer} onChange={setAnswer} modules={modules} />
        ) : (
          <div
            className="p-2 border"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(answer),
            }}
          ></div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={load}
              className="bg-emerald-500 cursor-pointer text-white px-4 py-2 rounded"
            >
              Save
            </button>
            {!load && (
              <button
                onClick={() => setEditingId(null)}
                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
            {load && <Loader />}
          </div>
        ) : (
          <button
            onClick={() => {
              setEditingId(faq.id);
              setSelectedLang("en");
            }}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Tile;
