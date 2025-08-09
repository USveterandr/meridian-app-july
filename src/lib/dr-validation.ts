import axios from 'axios';
import { logger } from './logger';

interface CedulaValidationResponse {
  valid: boolean;
  message?: string;
}

interface CitizenValidationResponse {
  valid: boolean;
  message?: string;
}

export class DRValidationService {
  private cedulaApiUrl = process.env.DR_CEDULA_API_URL || 'https://api.digital.gob.do/v3/cedulas';
  private citizenApiUrl = process.env.DR_CITIZEN_API_URL || 'https://api.digital.gob.do/v3/citizens';

  async validateCedula(cedula: string): Promise<CedulaValidationResponse> {
    try {
      // Clean cedula (remove dashes and spaces)
      const cleanCedula = cedula.replace(/[-\s]/g, '');
      
      if (cleanCedula.length !== 11) {
        return { valid: false, message: 'Cedula must be 11 digits' };
      }

      const response = await axios.get(`${this.cedulaApiUrl}/${cleanCedula}/validate`, {
        headers: {
          'accept': 'application/json',
        },
        timeout: 10000,
      });

      logger.info('Cedula validation request', { cedula: cleanCedula, valid: response.data.valid });
      
      return {
        valid: response.data.valid,
        message: response.data.message,
      };
    } catch (error) {
      logger.error('Cedula validation failed', error as Error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { valid: false, message: 'Cedula not found' };
        }
        if (error.code === 'ECONNABORTED') {
          return { valid: false, message: 'Validation timeout' };
        }
      }
      
      return { valid: false, message: 'Validation service unavailable' };
    }
  }

  async validateCitizen(id: string): Promise<CitizenValidationResponse> {
    try {
      const cleanId = id.replace(/[-\s]/g, '');
      
      const response = await axios.get(`${this.citizenApiUrl}/${cleanId}/validate`, {
        headers: {
          'accept': 'application/json',
        },
        timeout: 10000,
      });

      logger.info('Citizen validation request', { id: cleanId, valid: response.data.valid });
      
      return {
        valid: response.data.valid,
        message: response.data.message,
      };
    } catch (error) {
      logger.error('Citizen validation failed', error as Error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { valid: false, message: 'Citizen not found' };
        }
        if (error.code === 'ECONNABORTED') {
          return { valid: false, message: 'Validation timeout' };
        }
      }
      
      return { valid: false, message: 'Validation service unavailable' };
    }
  }

  async batchValidateCedulas(cedulas: string[]): Promise<{ cedula: string; valid: boolean; message?: string }[]> {
    const results = await Promise.allSettled(
      cedulas.map(async (cedula) => {
        const result = await this.validateCedula(cedula);
        return { cedula, ...result };
      })
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          cedula: cedulas[index],
          valid: false,
          message: 'Validation failed',
        };
      }
    });
  }
}

export const drValidationService = new DRValidationService();