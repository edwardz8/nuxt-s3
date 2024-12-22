<template>
    <div>
        <input type="file" accept="image/*" @change="handleFileChange" />
        <button @click="uploadFile" :disabled="!file">Upload</button>
        <div v-if="imageUrl">
            <img :src="imageUrl" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);
const imageUrl = ref(null);

const handleFileChange = (event) => {
    file.value = event.target.files[0];
};

async function uploadFile(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    // Handle successful upload
    console.log('File uploaded successfully', response)
  } catch (error) {
    // Handle upload error
    console.error('Failed to upload file', error)
  }
}
</script>