const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  imageBbApiKey: process.env.IMAGE_BB_API_KEY,
  cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  cloudPreset: process.env.NEXT_PUBLIC_CLOUD_PRESET,
};

export default envConfig;
