import {useEffect, useState} from 'react';
import {NativeModules, Platform} from 'react-native';

const {DeviceName} = NativeModules;

const useDeviceInformation = () => {
  const [deviceName, setDeviceName] = useState<string>('Carregando...');
  const [osVersion, setOsVersion] = useState<string>('Carregando...');

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        if (Platform.OS === 'android') {
          const name = await DeviceName.getDeviceName();
          setDeviceName(name);
        }
        setOsVersion(Platform.Version.toString());
      } catch (error) {
        console.error('Erro ao obter informações do dispositivo:', error);
        setDeviceName('Erro ao obter nome');
        setOsVersion('Erro ao obter versão');
      }
    };

    fetchDeviceInfo();
  }, []);

  return {deviceName, osVersion};
};

export default useDeviceInformation;
