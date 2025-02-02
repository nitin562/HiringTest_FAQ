# FAQ Management System

This project is a backend system for managing FAQs (Frequently Asked Questions) with multi-language translation support. It includes a REST API for managing FAQs, caching for improved performance, and integration with a WYSIWYG editor for formatting answers.

## DEPLOYED LINKS 
### Note : free instance will spin down with inactivity, which can delay requests by 50 seconds or more. So Please wait or view Video for Demo


#### Frontend - https://hiring-test-faq.vercel.app
---
#### Backend - https://hiringtest-faq-backend.onrender.com

## Demo Video

View Demo at https://drive.google.com/file/d/1JmnBSu6u01_WwF2veOcW3g-oT12zfmTL/view?usp=drive_link

## Features

- **Multi-language Support**: FAQs can be translated into multiple languages using the Google Translate API.
- **WYSIWYG Editor**: Integration with `react-quill` for rich text editing of FAQ answers.
- **Caching**: Redis is used to cache translations for improved performance.
- **REST API**: CRUD operations for FAQs with language-specific retrieval.
- **Admin Panel**: User-friendly interface for managing FAQs providing add, edit and view operations.
- **Unit Tests**: Comprehensive tests for models and API endpoints.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **WYSIWYG Editor**: `react-quill`
- **Translation**: Google Translate API (`rapidApi`)


---

## API Endpoints

### 1. **Get All FAQs**
- **Method:** `GET`
- **Endpoint:** `/api/faqs?lang={language_code}`
- **Description:** Fetch all FAQs with an option to retrieve them in a specified language.
- **Query Parameters:**
  - `lang` (optional): The language code (e.g., `en` for English, `hi` for Hindi, `bn` for Bengali).
- **Example Request:**
- Get /api/faqs?lang=hi
- **Response:** Returns a list of FAQs translated into the requested language.

---

### 2. **Get a Single FAQ by ID**
- **Method:** `GET`
- **Endpoint:** `/api/faq/:id/:lang`
- **Description:** Retrieve a specific FAQ by its unique ID and optional language translation.
- **Path Parameters:**
- `id`: The unique FAQ identifier.
- `lang`: The desired language code (default: `en`).
- **Example Request:**  
- Get /api/faq/123/hi
- **Response:** Returns the requested FAQ, translated into the given language.

---

### 3. **Create a New FAQ**
- **Method:** `POST`
- **Endpoint:** `/api/faq`
- **Description:** Add a new FAQ entry to the database.
- **Request Body:** (JSON format)
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime environment."
}
```
- **Response:** Returns success parameter.

---

### 3. **Edit a FAQ**
- **Method:** `PATCH`
- **Endpoint:** `/api/faq`
- **Description:** Edit a FAQ and store in the database.
- **Request Body:** (JSON format)
```json
{
  "id":123
  "question": "What is Node.js(edited)?",
  "answer": "Node.js is a JavaScript runtime environment.(edited)"
}
```
-**Response:** Returns success parameter.

---

## 🚀 Skills Demonstrated Through Projects

### 🔹 **FAQ Management System (MERN + Redis + Google Translate API)**
- **Node.js & Express.js**: Built a REST API to manage FAQs with multi-language support.  
- **MongoDB**: Stored FAQs with translation capabilities.  
- **Redis Caching**: Optimized performance by caching translated FAQs.  
- **React & React-Quill**: Integrated a WYSIWYG editor for rich text formatting.  
- **Google Translate API**: Implemented automated translations for multilingual support.  

## Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nitin562/HiringTest_FAQ.git
cd HiringTest_FAQ
```
```bash
cd Backend
npm install
```
```bash
npm run start
```
```bash
cd frontend
npm install
```
```bash
npm run dev
```
## Note: Make Sure Redis is installed in your system

## Environment Variables Configuration

To run this project, create a `.env` file in the root directory and add the following environment variables:

```ini
# Database Configuration
DB=

# Google Translate API Configuration
Get from Rapid api website, for google translate api
TRANSLATE_URL=
KEY=
HOST=

# Redis Configuration
REDIS_HOST=
REDIS_PORT=

```
