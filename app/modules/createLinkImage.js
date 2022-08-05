function createLink(fileAddress, req) {
  return (
    req.protocol +
    "://" +
    req.get("host") +
    "/" +
    fileAddress.replace(/[\\\\]/gm, "/")
  );
}
module.exports = createLink;
