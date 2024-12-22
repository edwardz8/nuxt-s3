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

const uploadFile = async () => {
    if (!file.value) {
        alert('Please select a file first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);

    try {
        const { data, error } = await useFetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (data.value?.url) {
            imageUrl.value = data.value.url;
            alert('File uploaded successfully to S3!');
        } else {
            alert('File upload failed.' + (error.value?.data?.error || ''));
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('An error occurred while uploading the file.');
    }
};
</script>