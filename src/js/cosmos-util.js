function CosmosBufferToPublic(pubBuf) {
  const Buffer = libs.buffer.Buffer;
  const AminoSecp256k1PubkeyPrefix = Buffer.from("EB5AE987", "hex");
  const AminoSecp256k1PubkeyLength = Buffer.from("21", "hex");
  pubBuf = Buffer.concat([AminoSecp256k1PubkeyPrefix, AminoSecp256k1PubkeyLength, pubBuf]);
  return libs.bech32.encode("cosmospub", libs.bech32.toWords(pubBuf));
}

function CosmosBufferToAddress(pubBuf) {
  const sha256_ed = libs.createHash("sha256").update(pubBuf).digest();
  const ripemd160_ed = libs.createHash("rmd160").update(sha256_ed).digest();
  return libs.bech32.encode("cosmos", libs.bech32.toWords(ripemd160_ed));
}
