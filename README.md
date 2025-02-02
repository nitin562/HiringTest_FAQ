# FAQ Management System

This project is a backend system for managing FAQs (Frequently Asked Questions) with multi-language translation support. It includes a REST API for managing FAQs, caching for improved performance, and integration with a WYSIWYG editor for formatting answers.

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
## Demo Video

![FAQ Management System Demo](https://drive.google.com/uc?export=view&id=13KMttFWaHvrtN8b66q-QyyodU915Rv1B)


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
```bash
cd Backend
npm install

```bash
npm run start

```bash
cd frontend
npm install

```bash
npm run dev

##Note: Make Sure Redis is installed in your system

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

