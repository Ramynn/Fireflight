import axios from 'axios';
import {HTTPError, InvalidIPResponseError} from '../errors';
import {IPInfoInterface} from '../../shared';
import {stringHelper} from '../helpers';

const APIService = 'http://ip-api.com/json/';

export namespace IPHelper {
  /**
   * Get current IP info
   */
  export const getCurrentIPInfo = async (): Promise<IPInfoInterface> => {
    try {
      const hash = +new Date();
      const {data} = await axios.get<IPResponse>(`${APIService}?${hash}`, {
        timeout: 5000
      });

      if (data.status === 'success' && data.query) {
        return {
          IP: data.query,
          country: data.country,
          countryCode: data.countryCode,
          region: data.region,
          city: data.city,
          date: new Date().toString(),
          ID: stringHelper.random()
        };
      }

      throw new InvalidIPResponseError(data);
    } catch (error) {
      throw new HTTPError(error);
    }
  };
}

export interface IPResponse {
  status: 'success';
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}
