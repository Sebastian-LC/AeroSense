/**
 * Repositorio simplificado (Historial deshabilitado temporalmente)
 */
export class AirQualityRepositoryImpl {
  async saveReading(reading, state) {
    // Persistencia deshabilitada por ahora
    return Promise.resolve();
  }

  async getHistory(limitCount = 500) {
    // Retornamos array vacío para no romper la UI
    return Promise.resolve([]);
  }
}
