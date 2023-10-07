const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5afu2u",
  experimentalSessionAndOrigin: true,
  e2e: {
    // baseUrl: 'https://stage1.qhami.com/',
    experimentalStudio: true,
    video: true,
    videoCompression: 32,
    viewportHeight: 900,
    viewportWidth: 550,
    videoUploadOnPasses: true,
    setupNodeEvents(on, config) {
      on("task", {
        // deconstruct the individual properties
        hello({ greeting, name }) {
          console.log("%s, %s", greeting, name);

          return null;
        },
        loginTask(obj) {
          console.log("------------------", obj);
          return null;
        },
        runLoadTests(userCount) {
          const users = [];

          for (let i = 1; i <= userCount; i++) {
            users.push({
              username: `user${i}`,
              password: `pass${i}`,
            });
          }

          return users;
        },
      });
    },
  },
});
