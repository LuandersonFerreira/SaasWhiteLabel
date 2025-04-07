export const normalizeString = (str) =>
  str
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-zA-Z0-9 ]/g, "") // remove caracteres especiais (inclusive /)
    .toLowerCase()
    .trim();
