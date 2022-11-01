/**
 * readTime - returns minutes required to read text
 * @text: string of words
 *
 * Return: time required to read text in minutes
 */
function readTime(text) {
  const WPM = 150; // Words Per Minute
  const textLength = text.split(' ').length;

  if (textLength > 0) {
    const time = Math.ceil(textLength / WPM);
    return (time);
  }

  return (0);
}

module.exports = readTime;
