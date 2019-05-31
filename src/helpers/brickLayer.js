import chroma from 'chroma-js';

export default function brickLayer({
  canvasHeight,
  canvasWidth,
  brickHeight,
  brickWidth,
  brickMortar,
  firstColor,
  secondColor,
  saturation,
  lightness,
  colorHueMode,
  colorMode
}) {
  const coordinates = [];
  const xStart = -brickWidth / 2;
  const yIncrement = Math.round(brickHeight + brickMortar);
  const xIncrement = Math.round(brickWidth + brickMortar);
  const yStartMaximum = canvasHeight - brickHeight;
  const xStartMaximum = canvasWidth;
  let scale;
  if (colorHueMode === 'rgb') {
    scale = chroma.scale([firstColor, secondColor]).mode(colorMode);
  } else if (colorHueMode === 'random hex') {
    scale = () => chroma.random()
  } else if (colorHueMode === 'random hsl') {
    scale = (random) => {
      const hue = Math.floor(random * 360)
      return chroma.hsl(hue, saturation, lightness)
    }
  }
  
  let i = 0;
  for (let y = 0; y <= yStartMaximum; y += yIncrement) {
    for (let x = xStart; x <= xStartMaximum; x += xIncrement) {
      const fill = scale(Math.random());
      if (i % 2 !== 0) {
        coordinates.push({ x: x + brickWidth / 2, y, fill });
      } else {
        coordinates.push({ x, y, fill });
      }
    }
    i += 1;
  }
  return coordinates;
}
