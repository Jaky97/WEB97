const images = [
  "pictures/Placeholder.png",
  "pictures/circle.png",
  "pictures/cross.png"
];

function clickCell(cell) {
  let state = Number(cell.dataset.state);
  state = (state + 1) % images.length;
  cell.dataset.state = state;
  cell.src = images[state];
}
