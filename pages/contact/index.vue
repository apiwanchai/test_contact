<script setup>
import { ref, computed } from "vue";
import mocData from "@/mocdata.json";

const list = ref(mocData);
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(20);

const showDeleteConfirmDialog = ref(false);
const showSuccessSnackbar = ref(false);
const showErrorSnackbar = ref(false);
const itemToDelete = ref(null);

const filteredList = computed(() => {
  if (searchQuery.value.length < 3) return list.value;
  return list.value.filter((item) =>
    item.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedList = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredList.value.slice(startIndex, endIndex);
});

const confirmDelete = (item) => {
  itemToDelete.value = item;
  showDeleteConfirmDialog.value = true;
};
const deleteItem = async () => {
  if (!itemToDelete.value) return;
  try {
    await fetch(`/api/delete/${itemToDelete.value.id}`, {
      method: "DELETE",
    });
    list.value = list.value.filter((item) => item.id !== itemToDelete.value.id);
    showSuccessSnackbar.value = true;
  } catch (error) {
    showErrorSnackbar.value = true;
  } finally {
    showDeleteConfirmDialog.value = false;
    itemToDelete.value = null;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};
</script>

<template>
  <v-container class="mt-8">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          :label="$t('list.search')"
          prepend-inner-icon="mdi-magnify"
          clearable
          @click:clear="clearSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="pageSize"
          :items="[10, 20, 50, 100]"
          :label="$t('itemperpage')"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, index) in paginatedList"
        :key="item.id"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title>{{ item.fullname }}</v-card-title>
          <v-card-subtitle
            >{{ $t("list.age") }}: {{ item.age }}</v-card-subtitle
          >

          <v-card-actions>
            <v-btn icon @click="confirmDelete(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(filteredList.length / pageSize)"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="showDeleteConfirmDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ $t("alert.confirmTitle") }}</v-card-title>
        <v-card-text>{{ $t("alert.confirmMessage") }}</v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="deleteItem">{{
            $t("alert.confirmDelete")
          }}</v-btn>
          <v-btn text @click="showDeleteConfirmDialog = false">{{
            $t("alert.cancel")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
