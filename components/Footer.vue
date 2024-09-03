<script setup>
const social = (data) => {
  if (data === "phone") {
    window.location.href = "tel:+1234567890";
  } else if (data === "email") {
    window.location.href = "mailto:info@example.com";
  } else {
    window.open("https://line.me/ti/p/@yourlineid", "_blank");
  }
};
</script>
<template>
  <v-footer class="footer" padless>
    <v-container>
      <v-row class="footer-row">
        <v-col cols="12" md="4">
          <v-card flat class="footer-card">
            <v-card-text>
              <h3 class="footer-heading text-white">
                {{ $t("footer.address") }}
              </h3>
              <p class="text-white">
                Abbon Corporation Co., Ltd. THE 9th TOWERS, Grand Rama9, Tower
                A, 30th Floor
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card flat class="footer-card">
            <v-card-text>
              <h3 class="footer-heading text-white">
                {{ $t("footer.phone") }}
              </h3>
              <v-btn text color="white" @click="social('phone')">
                <v-icon left>mdi-phone</v-icon> 082-123-4561
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card flat class="footer-card">
            <v-card-text>
              <h3 class="footer-heading text-white">
                {{ $t("footer.email") }}
              </h3>
              <v-btn text color="white" @click="social('email')">
                <v-icon left>mdi-email</v-icon> info@example.com
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="footer-row">
        <v-col cols="12">
          <v-card flat class="footer-card">
            <v-card-text>
              <h3 class="footer-heading text-white">{{ $t("footer.line") }}</h3>
              <v-btn text color="white" @click="social()">
                <v-icon left>mdi-line-scan</v-icon> @yourlineid
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style scoped>
.footer {
  background-color: rgb(37, 36, 36);
  padding: rem 0;
  color: #ecf0f1;
}

.footer-row {
  margin-bottom: 1rem;
}

.footer-card {
  margin: 0.5rem 0;
  background-color: transparent;
}

.footer-heading {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.v-btn {
  text-transform: none;
  font-size: 16px;
}

.v-icon {
  margin-right: 8px;
}
</style>
