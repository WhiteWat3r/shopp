import { getCookie } from './cookie';

export const config = {
  baseUrl: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function checkResponse(res: any) {
  if (res.ok) {
    return await res.json();
  }

  const errorResponse = await res.json();

  throw new Error(errorResponse.message);
}

export function request(url: string, options?: RequestInit | undefined) {
  return fetch(config.baseUrl + '/api'+ url, options).then(checkResponse);
}

export const authRequest = async (url: string, method = 'GET', data = {}) => {
  try {
    const accessToken = getCookie('accessToken');
    console.log(accessToken);
    const options: RequestInit = {
      method,
      headers: {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    const response = await request(url, options);
    // console.log('response', response);

    return response;
  } catch (error) {

    throw error;
  }
};
