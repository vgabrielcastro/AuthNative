export interface DeviceInfoData {
  // Nome amigável do dispositivo
  deviceName: string;

  // Informações básicas do dispositivo
  manufacturer: string;
  model: string;
  device: string;
  product: string;
  brand: string;
  hardware: string;

  // Informações do Android
  androidVersion: string;
  sdkVersion: string;
  buildId: string;

  // Informações da tela
  screenWidth: number;
  screenHeight: number;
  screenDensityDpi: number;
  screenDensity: number;

  // Informações do dispositivo
  isEmulator: boolean;
  deviceId: string;

  // Informações de memória
  totalMemory: number;
  freeMemory: number;
  maxMemory: number;
}
