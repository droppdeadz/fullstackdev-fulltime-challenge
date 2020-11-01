<template>
  <div class="bill-container">
    <div class="bill-label">{{ bill.value }}</div>
    <div class="minus-label" @click="decreaseBill(value)">-</div>
    <input type="number" :name="'bill_id_' + bill.id" class="bill-input" :value="value" @input="updateValue($event.target.value)">
    <div class="plus-label" @click="increaseBill(value)">+</div>
  </div>
</template>

<script>
export default {
  name: 'BillInsert',
  props: ['bill', 'locker', 'value'],
  methods: {
    increaseBill (value) {
      value = value + 1;
      this.$emit('input', value)
    },
    decreaseBill (value) {
      if (value > 0) {
        value = value - 1;
      }
      this.$emit('input', value)
    },
    updateValue(value) {
      this.$emit('input', value)
    }
  },
}
</script>

<style lang="scss" scoped>
  .bill-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .bill-label {
      min-width: 75px;
      min-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #000;
      margin: 0;
      margin-right: 5px;
      user-select: none;
      transition: all 0.2s;
    }

    .minus-label {
      cursor: pointer;
      min-width: 20px;
      min-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #a30101;
      margin: 0;
      margin-right: 5px;
      user-select: none;
    }

    .plus-label {
      cursor: pointer;
      min-width: 20px;
      min-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #01a344;
      margin: 0;
      margin-left: 5px;
      user-select: none;
    }

    .bill-input {
      text-align: right;
      color: #fff;
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