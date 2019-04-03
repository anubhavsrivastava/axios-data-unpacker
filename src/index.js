export default function responseDataUnpacker(axiosConfig) {
	if (axiosConfig.config.unpackResponseData) {
		axiosConfig = axiosConfig.data;
	}

	return axiosConfig;
}
