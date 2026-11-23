import { useEffect, useState } from "react";
import "./App.css";
import { uploadResume, getJobRoles } from "./services/api";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [analysisMode, setAnalysisMode] = useState("resume");

  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadJobRoles() {
      try {
        const roles = await getJobRoles();
        setJobRoles(roles);
      } catch (err) {
        setError(err.message || "Job roles load nahi ho sake.");
      } finally {
        setRolesLoading(false);
      }
    }

    loadJobRoles();
  }, []);

  const filteredRoles = jobRoles.filter((role) =>
    role.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const selectedRoleTitle =
    jobRoles.find((role) => role.id === selectedJobRole)?.title || "";

  const handleRoleSelect = (role) => {
    setSelectedJobRole(role.id);
    setSearchTerm(role.title);
    setError("");
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!resume) {
      setError("Please select your resume first.");
      return;
    }

    if (
      (analysisMode === "job" || analysisMode === "both") &&
      !selectedJobRole
    ) {
      setError("Please select a supported job role from the suggestions.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await uploadResume(
        resume,
        jobDescription,
        selectedJobRole,
        "",
        analysisMode
      );

      setResult({
        ...data,
        analysisMode,
      });
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const analysis = result?.analysis;
  const showResumeReport =
    result &&
    (result.analysisMode === "resume" || result.analysisMode === "both");
  const showJobReport =
    result &&
    (result.analysisMode === "job" || result.analysisMode === "both");

  const handleRecommendationClick = (role) => {
    setSelectedJobRole(role.roleId);
    setSearchTerm(role.jobRole);
    setAnalysisMode("job");
    setError("");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderHighlightedTitle = (title, query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return title;

    const startIndex = title.toLowerCase().indexOf(trimmedQuery.toLowerCase());

    if (startIndex === -1) return title;

    const endIndex = startIndex + trimmedQuery.length;

    return (
      <>
        {title.slice(0, startIndex)}
        <strong>{title.slice(startIndex, endIndex)}</strong>
        {title.slice(endIndex)}
      </>
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>ResumeAI</h2>
        <span>AI Resume Analyzer &amp; Job Match</span>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">SMART CAREER TOOL</p>
          <h1>Build Your Career with AI</h1>
          <p>
            Analyze your resume, discover suitable job roles, and understand
            your technical skill gaps.
          </p>
        </section>

        <section className="card">
          <h2>1. Choose Analysis Type</h2>

          <div className="mode-options">
            <label>
              <input
                type="radio"
                name="analysisMode"
                value="resume"
                checked={analysisMode === "resume"}
                onChange={() => {
                  setAnalysisMode("resume");
                  setError("");
                  setResult(null);
                }}
              />
              Resume Analysis
            </label>

            <label>
              <input
                type="radio"
                name="analysisMode"
                value="job"
                checked={analysisMode === "job"}
                onChange={() => {
                  setAnalysisMode("job");
                  setError("");
                  setResult(null);
                }}
              />
              Job Role Match
            </label>

            <label>
              <input
                type="radio"
                name="analysisMode"
                value="both"
                checked={analysisMode === "both"}
                onChange={() => {
                  setAnalysisMode("both");
                  setError("");
                  setResult(null);
                }}
              />
              Both — Separate Reports
            </label>
          </div>

          <h2>2. Upload Your Resume</h2>
          <p>Select your resume in PDF or DOCX format. Maximum size: 5 MB.</p>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(event) => {
              setResume(event.target.files?.[0] || null);
              setError("");
              setResult(null);
            }}
          />

          {resume && <p className="selected-file">Selected: {resume.name}</p>}

          {(analysisMode === "job" || analysisMode === "both") && (
            <>
              <h2 className="form-heading">3. Search or Select a Job Role</h2>
              <p>
                Type a role name and select it from the supported-role
                suggestions.
              </p>

              {rolesLoading && <p>Loading job roles...</p>}

              <input
                type="text"
                placeholder="Search a role, e.g. Data Analyst"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setSelectedJobRole("");
                  setError("");
                  setResult(null);
                }}
              />

              {searchTerm.trim() && !selectedJobRole && (
                <div className="role-search-results">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <button
                        type="button"
                        key={role.id}
                        className="role-search-item"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {renderHighlightedTitle(role.title, searchTerm)}
                      </button>
                    ))
                  ) : (
                    <p>
                      This job role is not available yet. Please select a
                      supported role from the list.
                    </p>
                  )}
                </div>
              )}

              {selectedJobRole && (
                <p className="selected-file">
                  Selected role: <strong>{selectedRoleTitle}</strong>
                </p>
              )}

              <h2 className="form-heading">Job Description (Optional)</h2>
              <p>
                Without a description, matching uses the selected role’s
                standard skills. Paste a specific vacancy’s description for a
                more targeted match.
              </p>

              <textarea
                value={jobDescription}
                placeholder="Optional: Paste the job description here..."
                onChange={(event) => {
                  setJobDescription(event.target.value);
                  setError("");
                  setResult(null);
                }}
              />
            </>
          )}

          <button
            className="analyze-btn"
            type="button"
            onClick={handleAnalyze}
            disabled={loading || rolesLoading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </section>

        {result && (
          <section className="results-section">
            <div className="results-heading">
              <p className="eyebrow">YOUR REPORT</p>
              <h2>Analysis Results</h2>
              <p>{result.message}</p>
            </div>

            {showResumeReport && (
              <section className="card">
                <h2>Resume Analysis Report</h2>

                <div className="stats-grid">
                  <article className="stat-card">
                    <p>Resume Score</p>
                    <h3>{analysis?.resumeScore ?? "N/A"}/100</h3>
                    <span>Basic section completeness</span>
                  </article>

                  <article className="stat-card">
                    <p>Recognized Skills</p>
                    <h3>{analysis?.resumeSkills?.length ?? 0}</h3>
                    <span>Skills found in resume</span>
                  </article>
                </div>

                <h3>Resume Skills</h3>
                <div className="skill-list">
                  {analysis?.resumeSkills?.map((skill) => (
                    <span className="skill-tag matched" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                <h3>Improvement Suggestions</h3>
                <ul className="suggestion-list">
                  {analysis?.suggestions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {showJobReport && (
              <section className="card">
                <h2>Job Match Report</h2>
                <p>
                  Target role:{" "}
                  {analysis?.selectedJobRole || selectedRoleTitle || "Job Role"}
                </p>

                <div className="stats-grid">
                  <article className="stat-card">
                    <p>Job Match</p>
                    <h3>
                      {analysis?.matchPercentage == null
                        ? "N/A"
                        : `${analysis.matchPercentage}%`}
                    </h3>
                    <span>Based on recognized skills</span>
                  </article>

                  <article className="stat-card">
                    <p>Matched Skills</p>
                    <h3>{analysis?.matchedSkills?.length ?? 0}</h3>
                  </article>

                  <article className="stat-card">
                    <p>Missing Skills</p>
                    <h3>{analysis?.missingSkills?.length ?? 0}</h3>
                  </article>
                </div>

                <h3>Matched Skills</h3>
                <div className="skill-list">
                  {analysis?.matchedSkills?.length ? (
                    analysis.matchedSkills.map((skill) => (
                      <span className="skill-tag matched" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No matching recognized skills.</p>
                  )}
                </div>

                <h3>Skills to Improve</h3>
                <div className="skill-list">
                  {analysis?.missingSkills?.length ? (
                    analysis.missingSkills.map((skill) => (
                      <span className="skill-tag missing" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No missing recognized skills identified.</p>
                  )}
                </div>

                <p className="note">{analysis?.analysisNote}</p>
              </section>
            )}

            <section className="card">
              <h2>Recommended Job Roles</h2>
              <p>
                Recommendations resume mein detected skills ke basis par hain.
                Recommendation score aur selected-role match score alag hain.
              </p>

              <div className="recommendation-list">
                {analysis?.jobRecommendations?.length ? (
                  analysis.jobRecommendations.map((role) => (
                    <article className="recommendation-card" key={role.roleId}>
                      <h3>{role.jobRole}</h3>
                      <p>Matched skills: {role.matchedSkills.length}</p>
                      <p>Recommendation match: {role.matchPercentage}%</p>

                      <button
                        type="button"
                        onClick={() => handleRecommendationClick(role)}
                      >
                        Analyze This Role
                      </button>
                    </article>
                  ))
                ) : (
                  <p>No suitable job roles identified.</p>
                )}
              </div>
            </section>

            <details className="card extracted-section">
              <summary>View Extracted Resume Text</summary>
              <pre>{result.extractedText}</pre>
            </details>
          </section>
        )}
      </main>

      <footer>
        © 2026 ResumeAI | AI Resume Analyzer &amp; Job Match Platform
      </footer>
    </div>
  );
}

export default App;