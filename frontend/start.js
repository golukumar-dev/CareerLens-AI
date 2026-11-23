// Frontend ke Vite development server ko start karta hai
const { spawn } = require("child_process");

// Frontend ko local development mode mein chalata hai
const npm = spawn(
  "C:\\Program Files\\nodejs\\npm.cmd",
  ["run", "dev", "--", "--open"],
  {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  }
);

// Server band hone ya error aane par status dikhata hai
npm.on("error", (error) => {
  console.error("Frontend start nahi hua:", error.message);
});