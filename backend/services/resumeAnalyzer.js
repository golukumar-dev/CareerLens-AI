const { JOB_ROLES } = require("./jobRoleCatalog");

// Normalize extracted resume text for consistent matching.
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function containsSkill(text, skill) {
  const normalizedText = normalizeText(text);
  const normalizedSkill = normalizeText(skill);
  const escapedSkill = normalizedSkill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(
    `(^|[^a-z0-9])${escapedSkill}(?=$|[^a-z0-9])`,
    "i"
  ).test(normalizedText);
}

// Recognized technical skills and common aliases.
const SKILLS = [
  { name: "C++", aliases: ["c++", "cpp"] },
  { name: "C", aliases: ["c programming", "c language"] },
  { name: "Python", aliases: ["python", "python programming"] },
  { name: "Java", aliases: ["java", "java programming"] },
  { name: "JavaScript", aliases: ["javascript", "js"] },
  { name: "HTML", aliases: ["html", "html5"] },
  { name: "CSS", aliases: ["css", "css3"] },
  { name: "React", aliases: ["react", "react.js", "reactjs"] },
  { name: "Angular", aliases: ["angular"] },
  { name: "Vue", aliases: ["vue", "vue.js"] },
  { name: "Node.js", aliases: ["node.js", "nodejs"] },
  { name: "SQL", aliases: ["sql", "structured query language"] },
  { name: "MySQL", aliases: ["mysql"] },
  { name: "MongoDB", aliases: ["mongodb"] },
  { name: "Data Structures", aliases: ["data structures", "data structure"] },
  { name: "Algorithms", aliases: ["algorithms", "algorithm"] },
  { name: "DSA", aliases: ["dsa", "data structures and algorithms"] },
  {
    name: "OOP",
    aliases: ["oop", "oops", "object-oriented programming", "object oriented programming"],
  },
  { name: "Machine Learning", aliases: ["machine learning", "ml"] },
  { name: "Deep Learning", aliases: ["deep learning"] },
  { name: "Data Science", aliases: ["data science"] },
  { name: "Pandas", aliases: ["pandas"] },
  { name: "NumPy", aliases: ["numpy"] },
  { name: "Git", aliases: ["git"] },
  { name: "GitHub", aliases: ["github"] },
  { name: "REST API", aliases: ["rest api", "restful api", "rest apis"] },
  { name: "Docker", aliases: ["docker"] },
  { name: "Linux", aliases: ["linux"] },
  { name: "AWS", aliases: ["aws", "amazon web services"] },
  { name: "Azure", aliases: ["azure"] },
  { name: "Google Cloud", aliases: ["google cloud", "gcp"] },
  { name: "Android", aliases: ["android development", "android"] },
  { name: "Kotlin", aliases: ["kotlin"] },
  { name: "Flutter", aliases: ["flutter"] },
  { name: "Dart", aliases: ["dart"] },
  { name: "Problem Solving", aliases: ["problem-solving", "problem solving"] },
  { name: "Spring Boot", aliases: ["spring boot", "springboot"] },
  { name: "Hibernate", aliases: ["hibernate"] },
  { name: "Django", aliases: ["django"] },
  { name: "Flask", aliases: ["flask"] },
  { name: "Firebase", aliases: ["firebase"] },
  { name: "Kubernetes", aliases: ["kubernetes", "k8s"] },
  { name: "Software Testing", aliases: ["software testing"] },
  { name: "Manual Testing", aliases: ["manual testing"] },
  { name: "Automation Testing", aliases: ["automation testing"] },
  { name: "Selenium", aliases: ["selenium"] },
  { name: "Excel", aliases: ["excel", "microsoft excel"] },
  { name: "Power BI", aliases: ["power bi"] },
  { name: "Tableau", aliases: ["tableau"] },
  { name: "Statistics", aliases: ["statistics", "statistical analysis"] },
  { name: "TensorFlow", aliases: ["tensorflow"] },
  { name: "PyTorch", aliases: ["pytorch"] },
  { name: "NLP", aliases: ["nlp", "natural language processing"] },
  { name: "Computer Vision", aliases: ["computer vision"] },
  { name: "Apache Spark", aliases: ["apache spark", "spark"] },
  { name: "Hadoop", aliases: ["hadoop"] },
  { name: "ETL", aliases: ["etl"] },
  { name: "Data Pipelines", aliases: ["data pipelines", "data pipeline"] },
  { name: "Networking", aliases: ["networking", "computer networks"] },
  { name: "Cybersecurity", aliases: ["cybersecurity", "cyber security"] },
  { name: "Information Security", aliases: ["information security"] },
  { name: "Ethical Hacking", aliases: ["ethical hacking"] },
  { name: "Cryptography", aliases: ["cryptography"] },
  { name: "Microcontrollers", aliases: ["microcontrollers", "microcontroller"] },
  { name: "Embedded Systems", aliases: ["embedded systems", "embedded system"] },
  { name: "RTOS", aliases: ["rtos", "real time operating system"] },
  { name: "Electronics", aliases: ["electronics"] },
  { name: "Digital Electronics", aliases: ["digital electronics"] },
  { name: "Analog Electronics", aliases: ["analog electronics"] },
  { name: "Verilog", aliases: ["verilog"] },
  { name: "VHDL", aliases: ["vhdl"] },
  { name: "VLSI", aliases: ["vlsi"] },
  { name: "CMOS", aliases: ["cmos"] },
  { name: "FPGA", aliases: ["fpga"] },
  { name: "ASIC", aliases: ["asic"] },
  { name: "PCB Design", aliases: ["pcb design"] },
  { name: "Communication Systems", aliases: ["communication systems"] },
  { name: "Signal Processing", aliases: ["signal processing"] },
  { name: "Wireless Communication", aliases: ["wireless communication"] },
  { name: "5G", aliases: ["5g"] },
  { name: "Electrical Machines", aliases: ["electrical machines"] },
  { name: "Power Systems", aliases: ["power systems"] },
  { name: "Electrical Design", aliases: ["electrical design"] },
  { name: "Control Systems", aliases: ["control systems"] },
  { name: "MATLAB", aliases: ["matlab"] },
  { name: "Power Electronics", aliases: ["power electronics"] },
  { name: "Renewable Energy", aliases: ["renewable energy"] },
  { name: "Automation", aliases: ["automation"] },
  { name: "PLC", aliases: ["plc", "programmable logic controller"] },
  { name: "AutoCAD", aliases: ["autocad", "auto cad"] },
  { name: "Civil Engineering", aliases: ["civil engineering"] },
  { name: "Structural Analysis", aliases: ["structural analysis"] },
  { name: "Construction Management", aliases: ["construction management"] },
  { name: "STAAD Pro", aliases: ["staad pro", "staad"] },
  { name: "ETABS", aliases: ["etabs"] },
  { name: "Surveying", aliases: ["surveying"] },
  { name: "Project Management", aliases: ["project management"] },
];

// Extract skills found in the resume.
function extractSkills(text) {
  const normalizedText = normalizeText(text);

  return SKILLS.filter((skill) =>
    skill.aliases.some((alias) => containsSkill(normalizedText, alias))
  ).map((skill) => skill.name);
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

// Resume quality checks.
// Experience has weight 0 because it is not mandatory for freshers.
// Project heading and project details are checked separately.
function getResumeChecks(resumeText) {
  const text = normalizeText(resumeText);

  const projectHeading = hasAny(text, [
    /\bprojects?\b/,
    /\bacademic projects?\b/,
    /\bpersonal projects?\b/,
    /\bproject experience\b/,
    /\bselected projects?\b/,
  ]);

  const projectHasDetails = hasAny(text, [
    /\b(developed|built|created|implemented|designed|trained|deployed|analyzed)\b/,
    /\b(technologies used|tools used|tech stack|using|built with|developed with)\b/,
  ]);

  const hasActionEvidence = hasAny(text, [
    /\b(developed|built|created|implemented|designed|analyzed|improved|trained|deployed|managed|achieved)\b/,
  ]);

  return [
    {
      label: "Contact Details",
      weight: 10,
      passed:
        /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text) &&
        /(\+?\d[\d\s().-]{8,}\d)/.test(text),
      improvement: "Valid email address aur phone number clearly add karein.",
    },
    {
      label: "Professional Summary / Career Objective",
      weight: 10,
      passed: hasAny(text, [
        /\bprofessional summary\b/,
        /\bcareer summary\b/,
        /\bprofile summary\b/,
        /\bcareer objective\b/,
        /\bobjective\b/,
        /\babout me\b/,
        /\bprofile\b/,
      ]),
      improvement: "2–3 lines ka targeted professional summary ya career objective likhein.",
    },
    {
      label: "Education",
      weight: 15,
      passed: hasAny(text, [
        /\beducation\b/,
        /\bbachelor\b/,
        /\bb\.?\s*tech\b/,
        /\bb\.?\s*e\.?\b/,
        /\bdegree\b/,
        /\buniversity\b/,
        /\bcollege\b/,
        /\bschooling\b/,
      ]),
      improvement: "Degree, college, graduation year aur relevant marks/CGPA add karein.",
    },
    {
      label: "Technical Skills",
      weight: 15,
      passed:
        hasAny(text, [
          /\btechnical skills\b/,
          /\bskills\b/,
          /\bprogramming languages\b/,
          /\btechnologies\b/,
        ]) && extractSkills(text).length > 0,
      improvement: "Relevant technical skills ko clear categories mein list karein.",
    },
    {
      label: "Projects",
      weight: 12,
      passed: projectHeading,
      improvement: "Relevant academic ya personal projects add karein.",
    },
    {
      label: "Project Details",
      weight: 8,
      passed: projectHeading && projectHasDetails,
      improvement: "Har project ke saath 1–2 lines mein technology, aapka contribution aur result likhein.",
    },
    {
      label: "Certifications",
      weight: 5,
      passed: hasAny(text, [
        /\bcertifications?\b/,
        /\bcertificates?\b/,
        /\blicenses?\b/,
      ]),
      improvement: "Relevant certification ka naam, issuer aur year add karein, agar available ho.",
    },
    {
      label: "Internship / Experience",
      weight: 0,
      passed: hasAny(text, [
        /\bexperience\b/,
        /\binternships?\b/,
        /\bemployment\b/,
        /\bwork history\b/,
        /\bvolunteer experience\b/,
      ]),
      improvement: "Internship ya experience ho to role, organization aur contribution mention karein.",
      optional: true,
    },
    {
      label: "Achievements / Activities",
      weight: 5,
      passed: hasAny(text, [
        /\bachievements?\b/,
        /\bawards?\b/,
        /\bpositions of responsibility\b/,
        /\bextracurricular\b/,
        /\bactivities\b/,
        /\bleadership\b/,
      ]),
      improvement: "Relevant achievements, awards ya leadership activities add karein, agar hain.",
    },
    {
      label: "Professional Links",
      weight: 5,
      passed: hasAny(text, [
        /\bgithub\b/,
        /\blinkedin\b/,
        /\bportfolio\b/,
        /\bgitlab\b/,
      ]),
      improvement: "GitHub, LinkedIn ya portfolio link add karein, agar available ho.",
    },
    {
      label: "Specific, Action-Oriented Content",
      weight: 15,
      passed: text.length >= 500 && hasActionEvidence,
      improvement: "Generic statements ke badle action verbs, tools used aur specific contributions likhein.",
    },
  ];
}

// Compare resume skills with a catalog role's required and additional skills.
function calculateRoleMatch(resumeSkills, role) {
  const matchedGroups = role.requiredGroups.filter((group) =>
    group.some((skill) => resumeSkills.includes(skill))
  );

  const missingGroups = role.requiredGroups.filter(
    (group) => !group.some((skill) => resumeSkills.includes(skill))
  );

  const matchedRequiredSkills = matchedGroups.map((group) =>
    group.find((skill) => resumeSkills.includes(skill))
  );

  const matchedAdditionalSkills = role.additionalSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const coreScore = role.requiredGroups.length
    ? matchedGroups.length / role.requiredGroups.length
    : 0;

  const additionalScore = role.additionalSkills.length
    ? matchedAdditionalSkills.length / role.additionalSkills.length
    : 0;

  const matchPercentage = Math.round(
    (coreScore * 0.8 + additionalScore * 0.2) * 100
  );

  return {
    roleId: role.id,
    jobRole: role.title,
    branches: role.branches,
    matchPercentage,
    matchedSkills: [
      ...new Set([...matchedRequiredSkills, ...matchedAdditionalSkills]),
    ],
    missingSkills: missingGroups.map((group) => group.join(" / ")),
    matchedRequiredGroups: matchedGroups.length,
    totalRequiredGroups: role.requiredGroups.length,
  };
}

// Return the 10 catalog roles with the highest match.
function getJobRecommendations(resumeSkills) {
  return JOB_ROLES.map((role) => calculateRoleMatch(resumeSkills, role))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 10);
}

// Compare resume skills with skills recognized in a custom job description.
function calculateCustomRoleMatch(resumeSkills, jobDescription) {
  const requiredSkills = extractSkills(jobDescription);
  const matchedSkills = requiredSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );
  const missingSkills = requiredSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );

  return {
    matchPercentage: requiredSkills.length
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : null,
    requiredSkills,
    matchedSkills,
    missingSkills,
    analysisNote: requiredSkills.length
      ? "Match recognized skills ke overlap par based hai; ye hiring probability nahi hai."
      : "Job description mein recognized skills nahi mili. Skills wali job description paste karein.",
  };
}

// Main resume analysis function used by the backend.
function analyzeResume(
  resumeText,
  jobDescription = "",
  jobRoleId = "",
  customRole = "",
  analysisMode = "resume"
) {
  const resume = normalizeText(resumeText);
  const job = normalizeText(jobDescription);

  if (!resume) throw new Error("Resume text is empty.");

  const resumeSkills = extractSkills(resume);
  const selectedRole = JOB_ROLES.find((role) => role.id === jobRoleId);

  let requiredSkills = [];
  let matchedSkills = [];
  let missingSkills = [];
  let matchPercentage = null;
  let selectedJobRole = null;
  let analysisNote = "";

  if (analysisMode === "job" || analysisMode === "both") {
    if (selectedRole) {
      const roleAnalysis = calculateRoleMatch(resumeSkills, selectedRole);

      requiredSkills = [
        ...new Set([
          ...selectedRole.requiredGroups.flat(),
          ...selectedRole.additionalSkills,
        ]),
      ];
      matchedSkills = roleAnalysis.matchedSkills;
      missingSkills = roleAnalysis.missingSkills;
      matchPercentage = roleAnalysis.matchPercentage;
      selectedJobRole = selectedRole.title;
      analysisNote =
        "Match percentage role ke core aur additional skills par based hai. Ye hiring probability nahi hai.";
    } else if (customRole || job) {
      const customAnalysis = calculateCustomRoleMatch(resumeSkills, job);

      requiredSkills = customAnalysis.requiredSkills;
      matchedSkills = customAnalysis.matchedSkills;
      missingSkills = customAnalysis.missingSkills;
      matchPercentage = customAnalysis.matchPercentage;
      selectedJobRole = customRole || "Job Description";
      analysisNote = customAnalysis.analysisNote;
    }
  }

  const resumeChecks = getResumeChecks(resume);

  // Fixed weighted scoring: same extracted text always receives the same score.
  // Experience is weight 0 because it is not mandatory for freshers.
  const totalWeight = resumeChecks.reduce((sum, item) => sum + item.weight, 0);
  const earnedWeight = resumeChecks.reduce(
    (sum, item) => sum + (item.passed ? item.weight : 0),
    0
  );

  const resumeScore =
    totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  const suggestions = [];

  // Add the specific improvement message for each failed check.
  resumeChecks.forEach((check) => {
    if (!check.passed && check.improvement) {
      suggestions.push(check.improvement);
    }
  });

  if (missingSkills.length) {
    suggestions.push(
      `Target job ke liye in skills par focus karein: ${missingSkills.join(", ")}.`
    );
  }

  if (!suggestions.length) {
    suggestions.push(
      "Resume ko target job ke according tailor karein aur claims ko accurate rakhein."
    );
  }

  return {
    analysisMode,
    matchPercentage,
    resumeScore,
    resumeScoreNote:
      "Resume score weighted section-completeness aur content checks par based hai. Ye ATS score ya hiring probability nahi hai.",
    matchedSkills,
    missingSkills,
    resumeSkills,
    requiredSkills,
    resumeChecks,
    suggestions,
    jobRecommendations: getJobRecommendations(resumeSkills),
    selectedJobRole,
    analysisNote:
      analysisNote ||
      "Resume analysis complete. Suitable job roles ki recommendations neeche di gayi hain.",
  };
}

module.exports = { analyzeResume, extractSkills };