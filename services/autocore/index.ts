'use server';

import CONFIG from '@/config';
import { AutocorePaymentLinkRequest } from '@/types/autocore';
import { logError } from '@/lib/logger';
import { generateAuthToken } from '@/lib/auth';


export async function createAutocorePaymentLink(
  payload: AutocorePaymentLinkRequest
): Promise<string> {
  try {
    const authToken = await generateAuthToken();

    const response = await fetch(`${CONFIG.AUTO_CORE_BASE_URL}/links/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': authToken,
      },
      body: JSON.stringify({
        source: CONFIG.SOURCE,
        hotel_id: CONFIG.HOTEL_ID,
        ...payload,

      }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok || !data?.url) {
      logError('Error creating autocore payment link', new Error(data?.message || 'Error creating payment link'), {
        status: response.status,
        response: data,
        payload,
      });

       throw new Error('Error creating payment link' )
    }

    return data.url;
  } catch (error) {
    logError('[AUTOCORE] Unexpected error creating autocore payment link', error, { payload });

    throw error
  }
}
