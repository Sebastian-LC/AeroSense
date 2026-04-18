// Verificación segura de Firebase sin causar crash si falta el JSON
export const isFirebaseAvailable = () => {
  return false; // Forzado a false para evitar crashes en Release sin el archivo JSON
};

export const ensureFirebase = () => {
  return null;
};
