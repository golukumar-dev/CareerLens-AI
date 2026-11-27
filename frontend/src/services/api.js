const API_BASE_URL = "https://careerlens-ai-edb8.onrender.com";

export async function getJobRoles() {
  const response = await fetch(`${API_BASE_URL}/api/job-roles`);
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Job roles load nahi ho sake.");
  }

  return data.jobRoles || [];
}

export async function uploadResume(
  resume,
  jobDescription = "",
  jobRoleId = "",
  customRole = "",
  analysisMode = "resume"
) {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);
  formData.append("jobRoleId", jobRoleId);
  formData.append("customRole", customRole);
  formData.append("analysisMode", analysisMode);

  const response = await fetch(`${API_BASE_URL}/api/upload-resume`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Resume upload failed.");
  }

  return data;
}