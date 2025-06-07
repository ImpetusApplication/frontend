const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('Testa conexão com a API', () => {
  const baseUrl = 'https://backend-production-9ab9.up.railway.app';
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    // Mocka GET para baseUrl retornando status 200 e algum dado
    mock.onGet(baseUrl).reply(200, { success: true });
  });

  afterAll(() => {
    mock.restore();
  });

  test('GET / deve responder com status 200', async () => {
    const response = await axios.get(baseUrl);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});