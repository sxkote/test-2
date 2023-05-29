function parseCSVRow(line) {
  return line
    .trim()
    .split('|')
    .map((v) => v.trim());
}

function parseCSVData(content, removeFirstRows = 0) {
  const data = content.split('\n').map((line) => parseCSVRow(line));

  if (removeFirstRows > 0) {
    data.splice(0, removeFirstRows);
  }

  return data;
}

export default parseCSVData;
