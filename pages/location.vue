<script setup>
import { ref } from "vue";

const error = ref("");
const loading = ref(false);

const openMapWithCurrentLocation = () => {
  loading.value = true;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(googleMapsUrl, "_blank");
        loading.value = false;
      },
      (err) => {
        error.value = "Unable to retrieve your location. Please try again.";
        loading.value = false;
      }
    );
  } else {
    error.value = "Geolocation is not supported by your browser.";
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="mt-10 text-center" height="800">
    <v-row>
      <v-col cols="12">
        <v-icon size="80" color="black" class="mb-4">mdi-map-marker</v-icon>
        <h1 class="text-h4 font-weight-bold">{{ $t("location.title") }}</h1>
        <p class="text-subtitle-1">
          {{ $t("location.subttitle") }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="6">
        <v-btn
          @click="openMapWithCurrentLocation"
          color="black"
          large
          block
          rounded
          elevation="5"
          :disabled="loading"
        >
          <v-icon left>mdi-map-outline</v-icon>
          {{ $t("location.buttonText") }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="loading" justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="70"
        ></v-progress-circular>
        <p class="mt-2">{{ $t("location.loading") }}.</p>
      </v-col>
    </v-row>

    <v-row v-if="error" justify="center" class="mt-4">
      <v-col cols="12" md="6">
        <v-alert type="error" dismissible>{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
