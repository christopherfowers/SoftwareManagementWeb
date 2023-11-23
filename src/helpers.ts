export const getRandomColor = (): string => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateRandomColors = (numColors: number): string[] => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

export const extractHours = (timeString: string): number => {
  timeString.trim();
  if (timeString === '30m')
    return 0.5;
   
  const match = timeString.match(/^(\d+)h$/);
  return match ? parseInt(match[1], 10) : 0;
}