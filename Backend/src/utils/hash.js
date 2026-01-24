const bcrypt = require("bcryptjs");

(async () => {
  const hashed = await bcrypt.hash("Admin@123", 10);
  console.log(hashed);
})();
