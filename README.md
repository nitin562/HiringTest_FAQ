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