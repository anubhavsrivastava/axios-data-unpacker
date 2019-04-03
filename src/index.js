export default function responseDataUnpacker(axiosConfig) {
	if (!axiosConfig.config.packResponseData) {
		axiosConfig = axiosConfig.data;
	}

	return axiosConfig;
}
