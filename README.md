# CodeMateAI - eduAI Website Project

## Overview

**CodeMateAI** is an educational platform that helps users learn web development, data science, AI, and more, with the support of an integrated AI chatbot assistant. The platform offers interactive course progression, personalized recommendations, and certificate generation upon course completion.

---

## Features

### 1. **AI Chatbot Integration**
- Gemini-powered chatbot available on the welcome page.
- Answers questions about tech, programming, and career advice.
- Recommends courses based on user queries.
- Responsive, modern chat UI with typing indicator.

### 2. **Course Catalog**
- Web Development (Beginner, Intermediate, Advanced)
- Data Science (Beginner, Intermediate, Advanced)
- AI & Machine Learning
- Cybersecurity
- Each course card includes description and enroll/view button.

### 3. **Progress Tracking**
- Tracks user progress for each course and level.
- Buttons update dynamically: "Enroll", "View Course", or "Completed".
- Intermediate/Advanced courses unlock only after completing prerequisites.

### 4. **Certificate Generation**
- "View Certificate" button enabled after completing all levels.
- Generates a personalized PDF certificate using user profile info.

### 5. **User Profile**
- Stores user name and email in localStorage.
- Displays user info in navbar and certificate.

### 6. **Modern UI/UX**
- Responsive design using Bootstrap 5.
- Sidebar navigation for courses.
- Animated cards and buttons.
- Mobile-friendly sidebar toggle.

### 7. **Backend API**
- `/api/chat` route: Handles chatbot queries using Gemini API.
- `/api/certificate` route: Generates PDF certificates.
- `/api/login` and `/api/signup`: Basic authentication endpoints.

### 8. **Course Recommendations**
- Chatbot suggests relevant courses based on keywords in user messages.
- Quick-access buttons for recommended courses.

### 9. **Practice Projects Button**
- Placeholder anchor button for future practice project links.

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up your `.env` file**
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   PORT=3000
   ```
4. **Start the server**
   ```bash
   npm start
   ```
5. **Open [http://localhost:3000/welcome.html](http://localhost:3000/welcome.html) in your browser**

---

## Folder Structure

```
public/
  welcome.html
  web development.html
  js/
    chatbot.js
  welcome.css
server/
  server.js
  certificate.js
.env
package.json
README.md
```

---

## Credits

- Built with [Bootstrap 5](https://getbootstrap.com/)
- AI powered by [Google Gemini API](https://ai.google.dev/)
- PDF generation by [pdfkit](https://github.com/foliojs/pdfkit)

---

## License

MIT License
