
# 🧠 JobQuest

> AI-powered Resume vs Job Description Matcher  
> 🔍 Match your skills. Spot what’s missing. Get hired faster.

---

## 🚀 Overview

**JobQuest** is an intelligent web app that helps users **analyze how well their resume matches a given job description.**  
Built as part of my [GSSoC 2025](https://gssoc.girlscript.tech/) application, this full-stack project demonstrates frontend skills in **React**, backend logic with **FastAPI**, and ML-based **text similarity analysis** using **TF-IDF**.

---

## 🔧 Tech Stack

| Frontend | Backend | ML/Logic |
|----------|---------|----------|
| React.js | FastAPI | scikit-learn |
| Tailwind | Python 3 | TfidfVectorizer |
| CSS Emojis | REST API | Cosine Similarity |

---

## 🧩 Features Implemented

### ✅ Phase 1 – Basic Setup
- Frontend created using Create React App
- Backend set up with FastAPI
- Connected frontend + backend (CORS + routes)

### ✅ Phase 2 – Core Logic
- Uploaded Resume & JD as plain text
- Used TF-IDF + Cosine Similarity to score match %
- API response returned to frontend for display

### ✅ Phase 3 – Skill Extraction
- Extracted keywords from both resume & JD
- Compared present & missing skills
- Added a **"Suggestions"** list for missing skills

### ✅ Phase 4 – Final Display UI (Emoji Polish 🧠)
- Matching skills ✅ shown in green
- Missing skills ❌ shown in red
- Suggestions 💡 shown in yellow
- Clean 3-column layout

---

## 📸 Screenshots new

<img width="1470" height="956" alt="Screenshot 2025-08-01 at 1 00 04 AM" src="https://github.com/user-attachments/assets/cddd97a9-a3bc-4012-832b-0e765b945366" />
<img width="1470" height="956" alt="Screenshot 2025-08-01 at 1 00 00 AM" src="https://github.com/user-attachments/assets/e1df8857-980b-4147-bb12-77121c16a637" />
<img width="1470" height="956" alt="Screenshot 2025-08-01 at 12 59 54 AM" src="https://github.com/user-attachments/assets/a3d65ee4-c0a1-4ce3-9f59-5e5550bea36e" />

---

## 🛠 Running Locally

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/JobQuest.git
cd JobQuest
```

### 2. Start Frontend (React)

```bash
cd client
npm install
npm start
```

### 3. Start Backend (FastAPI)

```bash
cd ../server
pip install -r requirements.txt
uvicorn main:app --reload
```


---

## ✅ Future Ideas

```markdown

Here are some future enhancements that can make JobQuest even more powerful:

- 📄 Parse and analyze **PDF resumes**
- 🧠 Match resumes against **multiple job roles**
- ✍️ GPT-powered **resume rewriting suggestions**
- 📊 Add charts to visualize **resume-JD overlap**
```

---

## 📦 Project Status

- ✅ MVP Complete (Frontend + Backend + Matching Logic)
- 🧪 Fully functional on local dev setup
- ❌ Not deployed — for **showcase/demo purposes only**
- 📌 Use for **GSSoC / open source portfolio**

---
## 💡 Inspiration

This project was created to showcase my:

- 🔁 Ability to independently build a **full-stack application**
- 🧠 Application of **Machine Learning (TF-IDF + Cosine Similarity)** in real-world context
- 🎯 Skill in presenting data insights through **clean UI/UX**
- 🌱 Readiness for **open-source programs like GSSoC**

---

## 📫 Connect with Me

I'm always excited to connect, collaborate, and grow together:

- 👩‍💻 GitHub: [@Varnika060306](https://github.com/Varnika060306)
- 💼 LinkedIn: (http://linkedin.com/in/varnika-sharma-b24ab82b9)
