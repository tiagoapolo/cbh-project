const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGORITHM = "sha3-512";
const HASH_DIGEST_ENCODING = "hex";

const generateHash = (data) =>
  crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_DIGEST_ENCODING);

const handleEvent = (event) => {
  if (!event) {
    return;
  }

  if (!event?.partitionKey) {
    return generateHash(JSON.stringify(event));
  }

  return event?.partitionKey;
};

const getCandidateFromEvent = (event) => {
  const candidateFromEvent = handleEvent(event);

  if (!candidateFromEvent) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidateFromEvent !== "string") {
    return JSON.stringify(candidateFromEvent);
  }

  return candidateFromEvent;
};

exports.deterministicPartitionKey = (event) => {
  const candidate = getCandidateFromEvent(event);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return generateHash(candidate);
  }

  return candidate;
};
