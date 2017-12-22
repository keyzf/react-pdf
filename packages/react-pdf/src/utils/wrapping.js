const splitPage = (words, availableHeight, getHeight) => {
  let minIndex = 0;
  let maxIndex = words.length;
  let currentIndex;
  let currentElement;
  let result;

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0;
    currentElement = getHeight(words.slice(0, currentIndex).join(' '));

    if (currentElement < availableHeight) {
      result = currentIndex;
      minIndex = currentIndex + 1;
    } else if (currentElement >= availableHeight) {
      maxIndex = currentIndex - 1;
    }
  }

  return result || 1;
};

export const chunkString = (string, availableHeight, getHeight) => {
  const results = [];
  const words = string.split(' ');

  while (words.length > 0) {
    const pageIndex = splitPage(words, availableHeight, getHeight);
    results.push(words.splice(0, pageIndex).join(' '));
  }
  return results;
};

// Given an element and an availableHeight, returns a new element that fits
// into it and edits the original one with the remaining content
// TODO: split nested children
export const splitElement = (element, availableHeight, getHeight) => {
  const newElement = element.clone();
  const margin = element.getMargin();
  const padding = element.getPadding();

  const lines = chunkString(
    element.getRawValue(),
    availableHeight - padding.top - padding.bottom - margin.top - margin.bottom,
    getHeight,
  );

  newElement.children = [lines[0]];
  element.children = [lines[1]];

  return newElement;
};
