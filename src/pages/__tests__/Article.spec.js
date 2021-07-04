describe("Article", () => {
  describe("when article data exists in store", () => {
    it("renders article from state data", () => {});
    it("does not fetch new data", () => {});
  });

  describe("when article data does not exist in store", () => {
    it("fetches new data", () => {});
    it("renders article from fetched data", () => {});
  });

  describe("when article data is not found after fetch", () => {
    it("redirects to `/`", () => {});
  });
});
