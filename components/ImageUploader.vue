<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg, image/webp, image/avif">
    <button @click="uploadImage">Upload</button>
    <!--  <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" /> -->
  </div>
</template>

<script setup>
const file = ref(null);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    // Handle successful upload
    console.log('File uploaded successfully', response)
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>