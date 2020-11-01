<template>
  <div class="time-container">
    <input type="number" name="time_insert" :value="value" @input="updateValue($event.target.value)">
  </div>
</template>

<script>
  export default {
    name: 'TimeInsert',
    props: ['value'],
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .time-container {
    input {
      text-align: center;
      font-weight: 600;
      color: rgb(0, 196, 75);
      background: #000;
      padding: 2.5px 5px;
      border: 0;
      width: 100%;
      -moz-appearance: textfield;
      transition: .25s;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>