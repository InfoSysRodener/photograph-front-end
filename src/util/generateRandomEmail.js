function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10);
  const domains = ['example.com', 'testmail.com', 'sample.org'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  return `${randomString}@${randomDomain}`;
}

export default generateRandomEmail;
