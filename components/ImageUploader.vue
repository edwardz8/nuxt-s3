<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg, image/webp, image/avif">
    <button @click="uploadImage">Upload</button>
    <!--  <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" /> -->
  </div>
</template>

<script setup>
const file = ref(null);
const imageUrl = ref('');

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};



/* const uploadImage = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    imageUrl.value = `https://nuxt3-s3bucket.s3.amazonaws.com/${response}`;

    // After S3 upload, save to PostgreSQL
    await $fetch('/api/save-image-metadata', {
      method: 'POST',
      body: JSON.stringify({
        filename: response,
        url: imageUrl.value,
      })
    });
  } catch (error) {
    console.error('Upload or saving metadata failed:', error);
  }
}; */
</script>
