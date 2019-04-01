export default function responseDataUnpacker(axiosConfig) {
	//This interceptor must be last
	try {
		if (axiosConfig.config.unpackResponseData) {
			axiosConfig = axiosConfig.data;
		}
	} catch (error) {
		//suppress
	}
	return axiosConfig;
}
