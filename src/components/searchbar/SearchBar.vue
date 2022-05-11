<template>
  <div class="searchbar-container">
    <input
      type="text"
      class="form-control"
      placeholder="buscar lugares"
      v-model="searchTerm"
    />

    <SearchResult />
  </div>
</template>

<script lang="ts" src="./SearchBar.ts">
</script>

<style>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 10px 10px rgb(0, 0, 0, 0.2);
  width: 250px;
  border-radius: 10px !important;
  overflow: hidden;
}
</style>