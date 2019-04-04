import responseDataUnpacker, { axiosResponseDataUnpacker } from '../src/index';
import { JestEnvironment } from '@jest/environment';

describe('axios interceptor - data unpacker', () => {
	test('should add itself in interceptor chain of axios', () => {
		let axiosMock = {
			interceptors: {
				response: {
					use: jest.fn()
				}
			}
		};
		axiosResponseDataUnpacker(axiosMock);
		expect(axiosMock.interceptors.response.use).toBeCalledWith(responseDataUnpacker);
	});

	test('should change the object to object.data (unpacking)', () => {
		let axiosConfigResponse = { config: {}, data: { a: 1 } };
		const unpackedConfig = responseDataUnpacker(axiosConfigResponse);
		expect(unpackedConfig).toBe(axiosConfigResponse.data);
	});

	test('should not change the object to object.data using packResponseData flag', () => {
		let axiosConfigResponse = { config: { packResponseData: true }, data: { a: 1 } };
		const unpackedConfig = responseDataUnpacker(axiosConfigResponse);
		expect(unpackedConfig).not.toBe(axiosConfigResponse.data);
	});
});
