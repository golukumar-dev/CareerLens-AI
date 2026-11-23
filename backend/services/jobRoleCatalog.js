// Job roles aur unki technical skills ki mapping

const JOB_ROLES = [
  // CSE - Software Development
  {
    id: "software-developer",
    title: "Software Developer / Software Engineer",
    branches: ["CSE", "ECE", "EE", "CE", "AI/ML"],
    requiredGroups: [
      ["C++", "Java", "Python", "C#", "JavaScript"],
      ["OOP"],
      ["Data Structures", "DSA"],
      ["Algorithms", "DSA"],
    ],
    additionalSkills: ["Git", "SQL", "Problem Solving"],
  },

  {
    id: "java-developer",
    title: "Java Developer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["Java"],
      ["OOP"],
      ["Spring Boot", "Hibernate"],
    ],
    additionalSkills: ["SQL", "Git", "REST API"],
  },

  {
    id: "python-developer",
    title: "Python Developer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["Python"],
      ["OOP"],
    ],
    additionalSkills: ["SQL", "Git", "REST API", "Django", "Flask"],
  },

  {
    id: "cpp-developer",
    title: "C++ Developer",
    branches: ["CSE", "ECE", "EE"],
    requiredGroups: [
      ["C++"],
      ["OOP"],
      ["Data Structures", "DSA"],
    ],
    additionalSkills: ["Algorithms", "Git", "Problem Solving"],
  },

  {
    id: "frontend-developer",
    title: "Frontend Developer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["HTML"],
      ["CSS"],
      ["JavaScript"],
    ],
    additionalSkills: ["React", "Angular", "Vue", "Git"],
  },

  {
    id: "backend-developer",
    title: "Backend Developer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["Java", "Python", "JavaScript", "C#"],
      ["SQL", "MySQL", "MongoDB"],
      ["REST API"],
    ],
    additionalSkills: ["Node.js", "Docker", "Git", "Linux"],
  },

  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["HTML"],
      ["CSS"],
      ["JavaScript"],
      ["React", "Angular", "Vue"],
      ["Node.js", "Python", "Java"],
      ["SQL", "MySQL", "MongoDB"],
    ],
    additionalSkills: ["Git", "REST API", "Docker"],
  },

  {
    id: "android-developer",
    title: "Android Developer",
    branches: ["CSE", "ECE", "EE"],
    requiredGroups: [
      ["Kotlin", "Java"],
      ["Android"],
    ],
    additionalSkills: ["REST API", "Firebase", "Git"],
  },

  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    branches: ["CSE", "ECE", "EE"],
    requiredGroups: [
      ["Kotlin", "Java", "Flutter", "Dart"],
    ],
    additionalSkills: ["Android", "Firebase", "REST API", "Git"],
  },

  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["Linux"],
      ["Docker"],
      ["Git"],
    ],
    additionalSkills: ["AWS", "Kubernetes", "CI/CD", "Python"],
  },

  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    branches: ["CSE", "ECE", "EE", "AI/ML"],
    requiredGroups: [
      ["AWS", "Azure", "Google Cloud"],
      ["Linux"],
    ],
    additionalSkills: ["Docker", "Networking", "Python"],
  },

  {
    id: "qa-engineer",
    title: "QA Engineer / Software Tester",
    branches: ["CSE", "ECE", "EE"],
    requiredGroups: [
      ["Software Testing", "Manual Testing", "Automation Testing"],
    ],
    additionalSkills: ["Java", "Python", "SQL", "Selenium", "Git"],
  },

  // CSE - Data and AI
  {
    id: "data-analyst",
    title: "Data Analyst",
    branches: ["CSE", "AI/ML", "ECE", "EE"],
    requiredGroups: [
      ["SQL"],
      ["Python", "R"],
      ["Excel"],
    ],
    additionalSkills: ["Power BI", "Tableau", "Pandas", "NumPy"],
  },

  {
    id: "data-scientist",
    title: "Data Scientist",
    branches: ["CSE", "AI/ML", "ECE"],
    requiredGroups: [
      ["Python"],
      ["Statistics"],
      ["Machine Learning"],
    ],
    additionalSkills: ["SQL", "Pandas", "NumPy", "Data Visualization"],
  },

  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    branches: ["CSE", "AI/ML", "ECE"],
    requiredGroups: [
      ["Python"],
      ["Machine Learning"],
      ["TensorFlow", "PyTorch"],
    ],
    additionalSkills: ["Statistics", "SQL", "NumPy", "Pandas"],
  },

  {
    id: "ai-engineer",
    title: "AI Engineer",
    branches: ["CSE", "AI/ML", "ECE"],
    requiredGroups: [
      ["Python"],
      ["Machine Learning"],
      ["Deep Learning"],
    ],
    additionalSkills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },

  {
    id: "data-engineer",
    title: "Data Engineer",
    branches: ["CSE", "AI/ML"],
    requiredGroups: [
      ["Python", "Java"],
      ["SQL"],
      ["ETL", "Data Pipelines"],
    ],
    additionalSkills: ["Apache Spark", "Hadoop", "AWS", "Docker"],
  },

  // Cybersecurity
  {
    id: "cybersecurity-engineer",
    title: "Cybersecurity Engineer",
    branches: ["CSE", "ECE"],
    requiredGroups: [
      ["Networking"],
      ["Linux"],
      ["Cybersecurity", "Information Security"],
    ],
    additionalSkills: ["Python", "Ethical Hacking", "Cryptography"],
  },

  // ECE
  {
    id: "embedded-engineer",
    title: "Embedded Systems Engineer",
    branches: ["ECE", "EE", "CSE"],
    requiredGroups: [
      ["C", "C++"],
      ["Microcontrollers"],
      ["Embedded Systems"],
    ],
    additionalSkills: ["RTOS", "Linux", "Electronics"],
  },

  {
    id: "vlsi-engineer",
    title: "VLSI Design Engineer",
    branches: ["ECE", "EE"],
    requiredGroups: [
      ["Digital Electronics"],
      ["Verilog", "VHDL"],
      ["VLSI"],
    ],
    additionalSkills: ["CMOS", "FPGA", "ASIC"],
  },

  {
    id: "electronics-engineer",
    title: "Electronics Engineer",
    branches: ["ECE", "EE"],
    requiredGroups: [
      ["Electronics"],
      ["Analog Electronics", "Digital Electronics"],
    ],
    additionalSkills: ["Microcontrollers", "PCB Design", "Embedded Systems"],
  },

  {
    id: "iot-engineer",
    title: "IoT Engineer",
    branches: ["ECE", "CSE", "EE"],
    requiredGroups: [
      ["IoT"],
      ["Embedded Systems"],
      ["C", "C++", "Python"],
    ],
    additionalSkills: ["Networking", "Microcontrollers", "Cloud Computing"],
  },

  {
    id: "telecom-engineer",
    title: "Telecommunication Engineer",
    branches: ["ECE"],
    requiredGroups: [
      ["Communication Systems"],
      ["Networking"],
    ],
    additionalSkills: ["Signal Processing", "Wireless Communication", "5G"],
  },

  // EE
  {
    id: "electrical-engineer",
    title: "Electrical Engineer",
    branches: ["EE"],
    requiredGroups: [
      ["Electrical Machines"],
      ["Power Systems"],
    ],
    additionalSkills: ["Electrical Design", "Control Systems", "MATLAB"],
  },

  {
    id: "power-systems-engineer",
    title: "Power Systems Engineer",
    branches: ["EE"],
    requiredGroups: [
      ["Power Systems"],
      ["Electrical Machines"],
    ],
    additionalSkills: ["MATLAB", "Power Electronics", "Renewable Energy"],
  },

  {
    id: "control-systems-engineer",
    title: "Control Systems Engineer",
    branches: ["EE", "ECE"],
    requiredGroups: [
      ["Control Systems"],
      ["MATLAB"],
    ],
    additionalSkills: ["Automation", "PLC", "Electronics"],
  },

  // CE
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    branches: ["CE"],
    requiredGroups: [
      ["AutoCAD"],
      ["Civil Engineering"],
    ],
    additionalSkills: ["Structural Analysis", "Construction Management"],
  },

  {
    id: "structural-engineer",
    title: "Structural Engineer",
    branches: ["CE"],
    requiredGroups: [
      ["Structural Analysis"],
      ["Civil Engineering"],
    ],
    additionalSkills: ["STAAD Pro", "ETABS", "AutoCAD"],
  },

  {
    id: "site-engineer",
    title: "Site Engineer",
    branches: ["CE"],
    requiredGroups: [
      ["Civil Engineering"],
      ["Construction Management"],
    ],
    additionalSkills: ["AutoCAD", "Project Management", "Surveying"],
  },
];

function getJobRoleById(id) {
  return JOB_ROLES.find((role) => role.id === id);
}

module.exports = {
  JOB_ROLES,
  getJobRoleById,
};