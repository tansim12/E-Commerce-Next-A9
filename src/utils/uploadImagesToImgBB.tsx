import envConfig from "@/src/config/envConfig";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const uploadImagesToImgBB = async (files: any) => {
  // const apiKey = envConfig?.imageBbApiKey; // Your API key
  const apiKey = "7ef1a84c76b5db81332f5d3ab765a5e3"; // Your API key
  const expiration = 600; // Image expiration time in seconds
  const uploadUrl = `https://api.imgbb.com/1/upload?expiration=${expiration}&key=${apiKey}`;

  const promises = Array.from(files).map((file: any) => {
    const formData = new FormData();
    formData.append("image", file); // Convert the image file to base64 string

    return fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          return result.data.url; // Return the URL of the uploaded image
        } else {
          throw new Error("Upload failed");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        return null;
      });
  });

  try {
    const uploadedUrls = await Promise.all(promises);
    return uploadedUrls.filter((url) => url !== null); // Return valid URLs only
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};
