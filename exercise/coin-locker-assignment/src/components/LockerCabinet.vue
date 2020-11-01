<template>
  <div class="locker-column">
    <button class="btn btn-block btn-danger mb-2" v-if="!locker.status" @click="stopLocker()">Stop Using Locker</button>
    <div class="locker-monitor" :class="[{'unavailiable': !locker.status}]">
      {{ showLockerStatus }}
    </div>
    <div class="locker-cabinet-container" :class="[{'unavailiable': !locker.status}, 'size-' + locker.sizes]">
      <div class="locker-cabinet-size">
        <form @submit.prevent="updateLocker()" class="locker-cabinet-wrap">
          <div class="locker-number-tags">
            {{ locker.name }}
          </div>
          <div class="insert-list-wrap">
            <h6>Time Usage</h6>
            <div class="insert-list-group">
              <TimeInsert :locker="locker" v-model="timeInsertValue"></TimeInsert>
            </div>
          </div>
          <div class="insert-list-wrap">
            <h6>Coin</h6>
            <div class="insert-list-group">
              <CoinInsert v-model="coinData.amount" :key="coinData._id" :id="'coin_' + coinData._id" v-for="coinData in gettersCoins" :locker="locker" :coin="coinData">
              </CoinInsert>
            </div>
          </div>
          <div class="insert-list-wrap">
            <h6>Bill</h6>
            <div class="insert-list-group">
              <BillInsert v-model="billData.amount" :key="billData._id" :id="'bill_' + billData._id" v-for="billData in gettersBills" :locker="locker" :bill="billData">
              </BillInsert>
            </div>
          </div>
          <div class="insert-list-wrap">
            <h6>Summary</h6>
            <div class="insert-list-group">
              <SummaryMonitor :timeInsertValue="timeInsertValue" :locker="locker" :coinList="gettersCoins" :billList="gettersBills" @return-changes="getChildChanges" @return-paid="getChildPaid"></SummaryMonitor>
            </div>
          </div>
          <div class="insert-list-wrap">
            <button type="submit" class="btn btn-block btn-warning">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TimeInsert from './insert/TimeInsert.vue'
import CoinInsert from './insert/CoinInsert.vue'
import BillInsert from './insert/BillInsert.vue'
import SummaryMonitor from './insert/SummaryMonitor.vue'

export default {
  name: 'LockerCabinet',
  data() {
    return {
      timeInsertValue: 0,
      getChanges: 0,
      getPaid: 0,
      gettersCoins: [],
      gettersBills: [],
    }
  },
  props: ['locker', 'lockerIndex'],
  created() {
    this.fetchCoin();
    this.fetchBill();
  },
  methods: {
    async fetchCoin() {
      await this.$store.dispatch("fetchCoin");
      this.gettersCoins = this.$store.getters.coins;
    },
    async fetchBill() {
      await this.$store.dispatch("fetchBill");
      this.gettersBills = this.$store.getters.bills;
    },
    updateLocker() {
      let formData = new FormData(event.target);
      let getUsageTime = formData.get('time_insert');
      let payload = {
        index: this.lockerIndex,
        _id: this.locker._id,
        status: false,
        startDateTime: this.dateFormat(new Date)
      };

      if (parseFloat(getUsageTime) > 0 && this.getPaid > 0 && this.getChanges >= 0) {
        this.$store.dispatch("updateLocker", payload);
        this.gettersCoins = this.$store.getters.coins;
        this.gettersBills = this.$store.getters.bills;
        this.timeInsertValue = 0;
      } else {
        alert('Please Insert The Usage Time Or Pay The Charge!!');
      }
    },
    stopLocker() {
      let payload = {
        index: this.lockerIndex,
        _id: this.locker._id,
        status: true,
        startDateTime: '0000-00-00 00:00:00'
      };
      this.$store.dispatch("updateLocker", payload);
    },
    dateFormat(date) {
      let getMonth = (date.getMonth() + 1);
      let getHours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
      let getMinutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      let getSeconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
      let tmpDate = date.getFullYear() + '-' + getMonth + '-' + date.getDate() + ' ' + getHours + ':' + getMinutes + ':' + getSeconds

      return tmpDate;
    },
    getChildChanges(changes) {
      this.getChanges = changes;
    },
    getChildPaid(paid) {
      this.getPaid = paid;
    },
  },
  computed: {
    showLockerStatus () {
      let message = this.locker.status ? 'Availiable' : 'Unavailiable';
      return message;
    }
  },
  components: {
    TimeInsert,
    CoinInsert,
    BillInsert,
    SummaryMonitor
  }
}
</script>

<style lang="scss" scoped>
  .locker-column {
    position: relative;
    width: 100%;
    flex: 0 0 25%;
    max-width: 25%;
    padding: 10px;
  }

  .locker-monitor {
    position: relative;
    color: #f8ce58;
    padding: 10px;
    background-color: #000;
    font-weight: 600;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    text-align: center;

    &.unavailiable {
      color: hsl(0, 100%, 50%);
    }
  }

  .locker-cabinet-container {
    position: relative;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    background-color: #b1a8ab;
    border: 1px solid #000;
    border-radius: 5px;

    .locker-cabinet-size {
      width: 100%;
      height: 100%;
    }

    .locker-cabinet-wrap {
      position: relative;
      padding: 15px;
      width: 100%;
      height: 100%;

      .locker-number-tags {
        background-color: #fff;
        border: 2px solid #f8ce58;
        padding: 0px 5px;
        width: fit-content;
        text-align: center;
        font-weight: 500;
        border-radius: 5px;
        margin-bottom: 5px;
      }
    }

    &.unavailiable {
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.75);
      }
    }
  }

  .insert-list-wrap {
    margin-bottom: 10px;

    h6 {
      text-decoration: underline;
    }
  }
</style>