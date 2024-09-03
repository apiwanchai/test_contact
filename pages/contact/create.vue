<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contactForm = ref({
  fullName: "",
  age: null,
});

const nameRules = computed(() => [
  (v) => !!v || t('validate.fullname'),
  (v) => (v && v.length >= 3) || t('validate.fullLeast'),
]);

const ageRules = computed(() => [
  (v) => !!v || t('validate.age'),
  (v) => (v && !isNaN(v)) || t('validate.ageNumber'),
  (v) => (v && v > 0) || t('validate.ageZero'),
]);

const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const router = useRouter();

const submitForm = async () => {
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        fullName: contactForm.value.fullName,
        age: contactForm.value.age,
      },
    });

    if (response.success) {
      showSuccessModal.value = true;
      setTimeout(() => {
        showSuccessModal.value = false;
        navigateTo('/Contact')
      }, 2000);
    } else {
      throw new Error('Failed to add contact');
    }
  } catch (error) {
    showErrorModal.value = true;
    setTimeout(() => {
      showErrorModal.value = false;
    }, 2000);
  }
};
</script>


<template>
  <v-container height="800" >
    <v-card class="mx-auto my-12 pa-6" max-width="600">
      <!-- หัวข้อของฟอร์ม -->
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon left>mdi-account-plus</v-icon>
       {{ $t('create.contact') }}
      </v-card-title>

      <v-divider></v-divider>

      <!-- ฟอร์ม Create Contact -->
      <v-form @submit.prevent="submitForm">
        <v-card-text>
          <v-row>
            <!-- ชื่อ-นามสกุล -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="contactForm.fullName"
                :label=" $t('create.fullname')"
                :rules="nameRules"
                required
                prepend-inner-icon="mdi-account"
                outlined
              ></v-text-field>
            </v-col>
            <!-- อายุ -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="contactForm.age"
                :label=" $t('create.age')"
                type="number"
                :rules="ageRules"
                required
                prepend-inner-icon="mdi-cake"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- ปุ่ม Submit -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" @click="submitForm" elevation="2">
            <v-icon left>mdi-check-circle</v-icon>
            {{ $t('create.submit') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <!-- Success Modal -->
    <v-dialog v-model="showSuccessModal" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="green">mdi-check-circle</v-icon>
          {{ $t('alert.success') }}
        </v-card-title>
        <v-card-text> {{ $t('alert.titleSuccess') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="navigateTo('/Contact')">{{ $t('create.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Modal -->
    <v-dialog v-model="showErrorModal" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="red">mdi-alert-circle</v-icon>
          {{ $t('alert.error') }}
        </v-card-title>
        <v-card-text>
          {{ $t('alert.titleError') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="showErrorModal = false">{{ $t('create.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
