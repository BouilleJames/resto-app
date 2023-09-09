const isHttps = process.env.HTTPS === "true";
const { spawn } = require("child_process");

if (isHttps) {
  const server = spawn(
    "node",
    ["node_modules/react-scripts/scripts/start.js"],
    {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        HTTPS: "true",
      },
    }
  );

  server.on("exit", function(code) {
    process.exit(code);
  });

  process.on("SIGINT", function() {
    server.kill("SIGINT");
    process.exit();
  });
} else {
  require("react-scripts/scripts/start");
}
