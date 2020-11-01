<template>
  <div id="app">
    <div class="container my-3">
      <div class="row">
        <div class="col-12 text-center">
          <h1>Coin Locker</h1>
        </div>
      </div>
      <LockerContainer></LockerContainer>
    </div>
  </div>
</template>

<script>
import LockerContainer from './components/LockerContainer.vue'
import { store } from "./store/store";

export default {
  name: 'App',
  components: {
    LockerContainer
  },
  store
}
</script>

<style scoped>

</style>