<script setup>
const profileImage = ref("https://cdn.vuetifyjs.com/images/john.jpg"); 
const fullName = ref("Apiwanchai Yingtavorn");

onMounted(() => {
  const savedProfileImage = localStorage.getItem("profileImage");
  const savedFullName = localStorage.getItem("fullName");

  if (savedProfileImage) {
    profileImage.value = savedProfileImage;
  }

  if (savedFullName) {
    fullName.value = savedFullName;
  }
});

watch(profileImage, (newImage) => {
  localStorage.setItem("profileImage", newImage);
});

watch(fullName, (newName) => {
  localStorage.setItem("fullName", newName);
});


const editProfileImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    profileImage.value = imageUrl;
    localStorage.setItem("profileImage", imageUrl);
    location.reload();
  }
};


const editFullName = (newName) => {
  fullName.value = newName;
  localStorage.setItem("fullName", newName); 
};
</script>

<template>
  <v-container class="mt-8 d-flex flex-column align-center" height="700">
  
    <v-avatar size="150">
      <v-img :src="profileImage" alt="Profile Image"></v-img>
    </v-avatar>
    
   
    <v-btn class="mt-4" @click="$refs.fileInput.click()" icon="mdi-camera-account"></v-btn>
    <p class="mt-2">{{ $t('editProflie') }}</p>
    

    <input type="file" ref="fileInput" class="d-none" @change="editProfileImage" />
 
    <h2 class="mt-4">{{ fullName }}</h2>

  </v-container>
</template>
