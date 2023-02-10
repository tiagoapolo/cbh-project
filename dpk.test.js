const {
  deterministicPartitionKey: deterministicPartitionKeyRefactored,
} = require("./dpk-refactor");

const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const testDeterministicPartitionKey = (input, returnValue) => {
    const trivialKey = deterministicPartitionKey(input);
    const trivialKeyRefactored = deterministicPartitionKeyRefactored(input);
    expect(trivialKey).toBe(returnValue);
    expect(trivialKeyRefactored).toBe(trivialKey);
  };

  it("Returns '0' when given no input", () => {
    testDeterministicPartitionKey(undefined, "0");
  });

  it("Returns '0' when input is empty string", () => {
    testDeterministicPartitionKey(undefined, "0");
  });

  it("Returns hash when input is a string", () => {
    const returnValue =
      "47070e8f45799540c361c6d92c2df5b2a54f25ff2a19bc8d2da1ef70ddcff117137baf4e206e56528e9eca14aea6a3ea24e4dfa942447d4a92dce09078f93128";
    testDeterministicPartitionKey("abc", returnValue);
  });

  it("Returns hash when input is a number", () => {
    const returnValue =
      "ac051340b58a03f4c8633740960c1697fe4eaf17d8459978628fa0878340ced5a2ef398a1f33fe7e70ec657851b73326b5bd98da1d997cec62b3190329ad1957";
    testDeterministicPartitionKey(888, returnValue);
  });

  it("Returns hash when input is an object", () => {
    const returnValue =
      "ab18741e5ee5b238a1641ea04d88ba6239c016a0d75a2c9cdaff0252710799608450dcc29f7b544e15b4c9cfc26e20b2417d169488507d5de3910824456c966a";
    testDeterministicPartitionKey({ message: "hello world" }, returnValue);
  });

  it("Returns hash when partitionKey is undefined", () => {
    const input = {};
    const returnValue =
      "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";
    testDeterministicPartitionKey(input, returnValue);
  });

  it("Returns hash when partitionKey is 0", () => {
    const input = { partitionKey: 0 };
    const returnValue =
      "e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7";
    testDeterministicPartitionKey(input, returnValue);
  });

  it("Returns '1' when partitionKey is number 1", () => {
    testDeterministicPartitionKey({ partitionKey: 1 }, "1");
  });

  it("Returns 'abc' when partitionKey is string 'abc'", () => {
    testDeterministicPartitionKey({ partitionKey: "abc" }, "abc");
  });

  it("Returns stringified object when partitionKey is an object", () => {
    testDeterministicPartitionKey(
      { partitionKey: { message: "hello world" } },
      '{"message":"hello world"}'
    );
  });
});
