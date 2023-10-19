export const generateRandomId = (() => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const existingIds = new Set<string>();

  return function (): string {
    let randomLetter = "";
    do {
      randomLetter = letters[Math.floor(Math.random() * letters.length)];
    } while (existingIds.has(randomLetter));

    let randomDigits = "";
    do {
      randomDigits = Array.from(
        { length: 4 },
        () => digits[Math.floor(Math.random() * digits.length)]
      ).join("");
    } while (existingIds.has(randomDigits));

    const randomId = `${randomLetter}${randomDigits}`;
    existingIds.add(randomId);
    return randomId;
  };
})();
