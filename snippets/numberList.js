const { items, totalWidth } = valueStrArray.reduce((acc, val, i) => {
  const precedingItem = acc.items[i - 1];
  const currentItem = { value: val, x: 0, y: fontWidth, key: `${i}-${val}` };

  if (precedingItem) {
    currentItem.x = separators.includes(precedingItem.value)
      ? precedingItem.x + fontWidth * 0.5
      : precedingItem.x + fontWidth;
  }

  acc.items.push(currentItem);
  acc.totalWidth += currentItem.x - acc.totalWidth;

  return acc;
}, {
  items: [],
  totalWidth: 0
});
