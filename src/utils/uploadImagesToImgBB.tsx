import envConfig from "../config/envConfig";

export const uploadImagesToImgBB = async (files: any) => {
  try {
    // Create an array of promises for each file upload
    const uploadPromises = files.map((file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", envConfig.cloudPreset as string);

      return fetch(
        `https://api.cloudinary.com/v1_1/${envConfig.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to upload image to Cloudinary.");
          }
          return response.json();
        })
        .then((data) => data.secure_url);
    });

    // Wait for all uploads to complete
    const secureUrls = await Promise.all(uploadPromises);

    return secureUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};
