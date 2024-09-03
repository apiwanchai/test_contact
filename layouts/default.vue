<script setup>
import Cookies from "js-cookie";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const drawer = ref(false);
const lang = ref("en");

const items = computed(() => [
  {
    title: t("lang.thai"),
    lang: "th",
    img: new URL("@/assets/icons/thailand.png", import.meta.url).href,
  },
  {
    title: t("lang.eng"),
    lang: "en",
    img: new URL("@/assets/icons/united-states.png", import.meta.url).href,
  },
]);
const itemsP = computed(() => [{ title: t("editProflie"), lang: "th" }]);

const admins = computed(() => [
  {
    title: t("menu.list"),
    icon: "mdi-account-multiple-outline",
    link: "/Contact",
  },
  { title: t("menu.create"), icon: "mdi-cog-outline", link: "/Contact/create" },
]);

const getFlagImage = computed(() => {
  return locale.value === "th"
    ? new URL("@/assets/icons/thailand.png", import.meta.url).href
    : new URL("@/assets/icons/united-states.png", import.meta.url).href;
});

const profileImage = ref("https://cdn.vuetifyjs.com/images/john.jpg");

onMounted(() => {
  const savedProfileImage = localStorage.getItem("profileImage");

  if (savedProfileImage) {
    profileImage.value = savedProfileImage;
  }
});

watch(profileImage, (newImage) => {
  localStorage.setItem("profileImage", newImage);
});

const changeLang = (data) => {
  lang.value = data;
  locale.value = data;
  Cookies.set("locale", locale.value, { expires: 365 });

  const { locale: i18nLocale } = useI18n();

  i18nLocale.value = data;

  console.log(locale.value);
};

const editProfileImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    profileImage.value = imageUrl;
    location.reload();
    localStorage.setItem("profileImage", imageUrl);
  }
};
</script>

<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" color="black">
      <v-list>
        <h1 class="text-center">Contact App</h1>
        <v-divider class="my-3"></v-divider>
        <v-list-item
          :to="{ path: '/' }"
          :title="$t('menu.home')"
          prepend-icon="mdi-home"
        ></v-list-item>
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              prepend-icon="mdi-account-multiple-outline"
              v-bind="props"
              :title="$t('menu.contact')"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            :to="admin.link"
            :prepend-icon="admin.icon"
            :title="admin.title"
          ></v-list-item>
        </v-list-group>

        <!-- Current Location Link -->
        <v-list-item
          :to="{ path: '/Location' }"
          :title="$t('menu.location')"
          prepend-icon="mdi-map-marker"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar floating>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon="mdi-home" @click="navigateTo('/')"></v-btn>
      <v-app-bar-title>
        <p class="">Contact App</p>
      </v-app-bar-title>

      <v-spacer></v-spacer>
      <div class="px-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" :image="profileImage" size="40"></v-avatar>
          </template>
          <input
            type="file"
            ref="fileInput"
            class="d-none"
            @change="editProfileImage"
          />
          <v-list>
            <v-list-item
              v-for="(item, index) in itemsP"
              :key="index"
              @click="$refs.fileInput.click()"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <p class="hidden-sm-and-down">Apiwanchai Yingtavorn</p>

      <div class="px-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" :image="getFlagImage" size="30"></v-avatar>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :title="item.title"
              @click="changeLang(item.lang)"
            >
            
                <template v-slot:prepend>
                  <v-avatar size="20"  :image="item.img">
                    
                  </v-avatar>
                </template>
             
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>
