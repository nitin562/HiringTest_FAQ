import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { links, modules } from "../../links";
import Loader from "./Loader";

const NewFaq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const ques = useRef(0);
  const answ = useRef(0);
  const [load, setload] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setload(true);
    const text_ques = ques.current.getEditor().getText().trim();
    const text_answ = answ.current.getEditor().getText().trim();
    //html tags as states
    if (!text_ques || !text_answ) {
      alert("Both fields are required!");
      setload(false);
      return;
    }

    const url = links.base + links.addFaq;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    };
    const result = await fetch(url, options);
    const response = await result.json();
    console.log(response);
    if (response.success == false) {
      alert(response?.msg || "FAQ is not saved due to server error");
    } else {
      alert("FAQ is saved");
    }
    setQuestion("");
    setAnswer("");
    setload(false);
  };

  return (
    <div className="w-[80%] flex-1 mx-auto my-6 bg-[#fff] p-6 scrollbar  ">
      <h2 className="text-xl font-semibold mb-4">Add FAQ</h2>

      {/* Question Input */}
      <label className="block font-medium text-gray-700">Question:</label>
      <ReactQuill
        modules={modules}
        ref={ques}
        value={question}
        onChange={setQuestion}
        placeholder="Enter your question..."
        className="mb-4 bg-white"
      />

      {/* Answer Input */}
      <label className="block font-medium text-gray-700 mt-4">Answer:</label>
      <ReactQuill
        modules={modules}
        ref={answ}
        value={answer}
        onChange={setAnswer}
        placeholder="Enter the answer..."
        className="mb-4 bg-white"
      />

      {/* Submit Button */}
      <div className="flex w-full mt-4 items-center justify-end gap-4">
        <button
          onClick={handleSubmit}
          disabled={load}
          className="w-[10rem] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Submit
        </button>
        {load && <Loader />}
      </div>
    </div>
  );
};

export default NewFaq;
