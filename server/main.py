from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import random
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import fitz  # PyMuPDF
from fastapi import Form

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')
# Helper function to extract PDF text
def extract_text(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text
# Helper function to extract keywords from text
def extract_keywords(text):
    vectorizer = CountVectorizer(stop_words='english')
    X = vectorizer.fit_transform([text])
    return set(vectorizer.get_feature_names_out())

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI server!"}

@app.post("/score/")
async def score(resume: UploadFile = File(...), jd: UploadFile = File(...),company: str = Form(...),
    role: str = Form(...)
):
    # Read file contents
    resume_text = await resume.read()
    jd_text = await jd.read()

    # Extract text
    print("Company:", company)
    print("Role:", role)
    resume_text = extract_text(resume_text)
    jd_text = extract_text(jd_text)
    # Extract skill keywords
    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(jd_text)

    # Convert text to embeddings
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    jd_embedding = model.encode(jd_text, convert_to_tensor=True)
    # Determine present and missing skills
    present_skills = list(jd_keywords.intersection(resume_keywords))
    missing_skills = list(jd_keywords.difference(resume_keywords))

    # Calculate cosine similarity
    similarity = cosine_similarity(
        [resume_embedding.cpu().numpy()],
        [jd_embedding.cpu().numpy()]
    )[0][0]

    final_score = round(similarity * 100, 2)
    return {
    "score": float(final_score),
    "company": company,
    "role": role,
    "present_skills": present_skills,
    "missing_skills": missing_skills,
    "suggestions": [
        f"Consider adding: {', '.join(missing_skills[:5])}"
    ]
}