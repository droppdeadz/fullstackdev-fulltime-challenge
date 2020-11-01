<template>
  <div class="monitor-container">
    <div class="monitor-text-wrap">
      <span>Time Usage</span>
      <span>{{ timeInsertValue }}</span>
    </div>
    <div class="monitor-text-wrap">
      <span>Charge</span>
      <span>{{ renderFee }}</span>
    </div>
    <div class="monitor-text-wrap">
      <span>Paid</span>
      <span>{{ renderPaid }}</span>
    </div>
    <div class="monitor-text-wrap">
      <span>Change</span>
      <span>{{ renderChange }}</span>
    </div>
    <div class="monitor-text-wrap" :key="idx" v-for="(billChanges, idx) in billChangesList">
      <span class="text-indent text-smaller">- {{ idx }}</span>
      <span class="text-indent text-smaller">{{ billChanges }}</span>
    </div>
    <div class="monitor-text-wrap" :key="idx" v-for="(coinChanges, idx) in coinChangesList">
      <span class="text-indent text-smaller">- {{ idx }}</span>
      <span class="text-indent text-smaller">{{ coinChanges }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SummaryMonitor',
    props: ['timeInsertValue', 'locker', 'coinList', 'billList'],
    data() {
      return {
        changes: 0,
        paid: 0,
        coinChangesList: {},
        billChangesList: {}
      }
    },
    watch: {
      changes() {
        this.$emit("return-changes", this.changes);
      },
      paid() {
        this.$emit("return-paid", this.paid);
      }
    },
    computed: {
      renderFee() {
        let lockerSize = this.locker.sizes;
        let fee = this.convertToFee(this.timeInsertValue, lockerSize);

        return fee
      },

      renderPaid() {
        let paid = 0;
        for (const key in this.coinList) {
          if (this.coinList) {
            const element = this.coinList[key];
            if (element.amount > 0) {
              let total_value = (element.amount * element.value);
              paid += total_value;
            }
          }
        }

        for (const key in this.billList) {
          if (this.billList) {
            const element = this.billList[key];
            if (element.amount > 0) {
              let total_value = (element.amount * element.value);
              paid += total_value;
            }
          }
        }

        return paid
      },

      renderChange() {
        let change = 0;
        if (this.renderPaid > 0) {
          change = this.renderPaid - this.renderFee;
          this.setChange(this.renderPaid, this.renderFee);
          this.setPaid(this.renderPaid);
        }

        let tempChange = change;

        let billList = [];
        let coinList = [];

        while (tempChange >= 1000) {
          billList.push('Bill 1000 THB');
          tempChange -= 1000;
        }

        while (tempChange >= 500) {
          billList.push('Bill 500 THB');
          tempChange -= 500;
        }

        while (tempChange >= 100) {
          billList.push('Bill 100 THB');
          tempChange -= 100;
        }

        while (tempChange >= 50) {
          billList.push('Bill 50 THB');
          tempChange -= 50;
        }

        while (tempChange >= 20) {
          billList.push('Bill 20 THB');
          tempChange -= 20;
        }

        while (tempChange >= 10) {
          coinList.push('Coins 10 THB');
          tempChange -= 10;
        }

        while (tempChange >= 5) {
          coinList.push('Coins 5 THB');
          tempChange -= 5;
        }

        while (tempChange >= 2) {
          coinList.push('Coins 2 THB');
          tempChange -= 2;
        }

        while (tempChange >= 1) {
          coinList.push('Coins 1 THB');
          tempChange -= 1;
        }

        this.countDuplicate(billList, 'bill');
        this.countDuplicate(coinList, 'coin');

        return change
      },
    },
    methods: {
      convertToFee(time, lockerSize) {
        let chargeFee = 0;

        if (time > 0) {
          let timeOutOfScope = time - 60;
          let timeOutOfScopeModulus = (timeOutOfScope % 60 == 0 ) ? timeOutOfScope / 60 : Math.ceil(timeOutOfScope / 60);

          if (timeOutOfScope > 0) {
            if (lockerSize == 's') {
              chargeFee = 50 + (timeOutOfScopeModulus * 25);
            } else if (lockerSize == 'm') {
              chargeFee = 100 + (timeOutOfScopeModulus * 50);
            } else if (lockerSize == 'l') {
              chargeFee = 200 + (timeOutOfScopeModulus * 100);
            }
          } else {
            if (lockerSize == 's') {
              chargeFee = 50;
            } else if (lockerSize == 'm') {
              chargeFee = 100;
            } else if (lockerSize == 'l') {
              chargeFee = 200;
            }
          }
        }

        return chargeFee
      },

      countDuplicate(arr, type) {
        var result = {};
        arr.forEach(function (x) {
          result[x] = (result[x] || 0) + 1;
        });

        if (type == 'bill') {
          this.billChangesList = result;
        }

        if (type == 'coin') {
          this.coinChangesList = result;
        }
      },

      setChange(paid, fee) {
        this.changes = paid - fee;
      },

      setPaid(paid) {
        this.paid = paid;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .monitor-container {
    min-height: 100px;
    width: 100%;
    background-color: #000;
    padding: 10px;

    .monitor-text-wrap {
      display: flex;
      justify-content: space-between;
      color: #00c44b;
    }
  }

  .text-indent {
    text-indent: 10px;
  }

  .text-smaller {
    font-size: 90%;
  }
</style>