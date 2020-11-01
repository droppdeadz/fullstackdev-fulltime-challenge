<template>
  <div class="locker-container-wrap">
    <LockerCabinet :key="lockerData.id" :id="'locker_number_' + lockerData.id" v-for="(lockerData, idx) in $store.getters.lockers" :locker="lockerData" :lockerIndex="idx">
    </LockerCabinet>
  </div>
</template>

<script>
  import LockerCabinet from './LockerCabinet.vue'

  export default {
    name: 'LockerContainer',
    components: {
      LockerCabinet
    },
    created() {
      this.fetchLocker();
    },
    methods: {
      fetchLocker() {
        this.$store.dispatch("fetchLocker");
      }
    },
  }
</script>

<style scoped>
  .locker-container-wrap {
    display: flex;
    flex-wrap: wrap;
    background-color: #545363;
    border: 1px solid #000;
    justify-content: space-between;
    padding: 10px;
  }
</style>