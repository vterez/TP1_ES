const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

module.exports = async (on, config) => {
  const db = await Db.connect()
  on('task', {
      async createUser(userData) {
          const result = await db.collection('users').insertOne(userData)
          return result
      }
  })
}