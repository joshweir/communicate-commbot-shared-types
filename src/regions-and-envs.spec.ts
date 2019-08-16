import { mapDataEnvsFromAllEnvs } from "./regions-and-envs";

describe("mapDataEnvsFromAllEnvs", () => {
  it("should return both from all", () => {
    const result = mapDataEnvsFromAllEnvs(["all"]);
    expect(result).toHaveLength(2);
    expect(result).toContain("com-datastaging");
    expect(result).toContain("com-datalive");
  });

  it("should return datastaging if its wack", () => {
    const result = mapDataEnvsFromAllEnvs(["wack"]);
    expect(result).toHaveLength(1);
    expect(result).toContain("com-datastaging");
  });

  it.each(["com-datastaging", "dev", "staging"])(
    "%s should return datastaging",
    i => {
      const result = mapDataEnvsFromAllEnvs([i]);
      expect(result).toHaveLength(1);
      expect(result).toContain("com-datastaging");
    }
  );

  test.each(["com-datalive", "qa", "beta", "live"])(
    "%s should return datalive",
    i => {
      const result = mapDataEnvsFromAllEnvs([i]);
      expect(result).toHaveLength(1);
      expect(result).toContain("com-datalive");
    }
  );
});
