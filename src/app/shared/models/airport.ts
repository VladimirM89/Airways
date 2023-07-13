export interface Airport {
  id: number;
  airportCode: string;
  city: string;
}

export enum AirportCodes {
  BAKU = 'GYD',
  AMSTERDAM = 'AMS',
  ISTANBUL = 'IST',
  MOSCOW_SVO = 'SVO',
  MOSCOW_DME = 'DME',
  DUBAI = 'DXB',
  SHANGAI = 'PVG',
}
