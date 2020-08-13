<template>
  <div class="member">
    {{currentDate}}
    <div class="time">
      <div class="start date"
           @click="open('start')">
        <span>8月03日</span>
        <van-icon name="arrow-down" />
      </div>
      <span class="point">至</span>
      <div class="end date"
           @click="open('end')">
        <span>8月03日</span>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <van-popup v-model="show"
               position="bottom"
               round>
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           title="选择年月日"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @cancel='cancel'
                           @confirm='submit' />
    </van-popup>

  </div>
</template>

<script>
const MINDATE = new Date(2020, 0, 1)
const MAXDATE = new Date(2025, 0, 1)
export default {
  components: {},
  props: {},
  data() {
    return {
      show: false,
      startDate: '',
      endDate: '',
      type: '',
      minDate: MINDATE,
      maxDate: MAXDATE,
      currentDate: '',
    } 
  },
  methods: {
    open(type) {
      this.show = !this.show
      this.type = type
    },
    submit() {
      if (this.type === 'start') {
        this.startDate = this.currentDate
        this.minDate = this.currentDate
      } else {
        this.endDate = this.currentDate
        this.maxDate = this.currentDate
      }
      this.show = false
    },
    cancel() {
      if (this.type === 'start') {
        this.startDate = ''
        this.minDate = MINDATE
      } else {
        this.endDate = ''
        this.maxDate = MAXDATE
      }
      this.show = false
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.time {
  
}
</style>
