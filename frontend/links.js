export const links = {
  // base: "http://localhost:8000",
  base:"https://hiringtest-faq-backend.onrender.com",
  getFaqs: "/api/faqs",
  translateTo: "/api/faq",
  addFaq: "/api/faq",
  editFaq: "/api/faq",
};
const toolbarOptions = [
  [{ font: [] }], // Font family
  [{ size: ["small", false, "large", "huge"] }], // Font size
  ["bold", "italic", "underline", "strike"], // Text styles
  [{ color: [] }, { background: [] }], // Font & background color
  [{ script: "sub" }, { script: "super" }], // Subscript & superscript
  [{ header: 1 }, { header: 2 }, "blockquote", "code-block"], // Headers & blocks
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // Lists & Indentation
  [{ align: [] }], // Text alignment
  ["link", "image", "video"], // Media options
  ["clean"], // Remove formatting
];

export const modules = {
  toolbar: toolbarOptions,
};