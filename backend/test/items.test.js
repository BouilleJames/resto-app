const assert = require("chai").assert;
const { getItems } = require("../controllers/itemsController");

describe("Items Controller", () => {
  describe("getItems", () => {
    it("should return an array of items", async () => {
      const result = await getItems();
      assert.isArray(result);
    });
  });

  // Ajoutez d'autres tests ici
});
