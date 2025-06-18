import { extractColors } from "extract-colors";

export const extractColorsFromImage = async (imageUrl) => {
  try {
    const colors = await extractColors(imageUrl, {
      pixels: 10000,
      distance: 0.22,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.0833,
      crossOrigin: "anonymous",
    });

    if (colors && colors.length >= 2) {
      const sortedColors = [...colors].sort((a, b) => b.area - a.area);
      return [
        sortedColors[0].hex,
        sortedColors[1].hex,
        sortedColors[2].hex,
        sortedColors[3].hex,
      ];
    }

    return ["#fff", "#fff"];
  } catch (error) {
    console.error("Error extracting colors:", error);
    return ["#fff", "#fff"];
  }
};
