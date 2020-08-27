<template>
  <div class="addGoods">
    <van-nav-bar :title="type==2?'修改项目':'添加项目'" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="info">
      <div class="listgroup">
        <van-field v-model="item_no" label="项目编号" placeholder="请输入" required />
        <van-field v-model="name" label="项目名称" placeholder="请输入" required />
        <van-field
          v-model="categoryName"
          @click="categoryDialog = true"
          label="项目分类"
          placeholder="请选择"
          is-link
          required
          readonly
        />
        <van-action-sheet v-model="categoryDialog">
          <van-picker
            title="项目分类"
            @cancel="categoryDialog=false"
            show-toolbar
            :columns="catelist"
            value-key="name"
            @confirm="Confirm"
            required
          />
        </van-action-sheet>
        <van-field name="uploader" label="项目图片">
          <template #input>
            <van-image
              style="padding:0 0.16rem 0.16rem 0"
              width="1.6rem"
              height="1.6rem"
              fit="cover"
              :src="img|imgUrl"
              v-show="type==2&&!uploader.length&&img"
            />
            <van-uploader v-model="uploader" multiple :max-count="1" :after-read="afterRead" />
          </template>
        </van-field>
      </div>
      <div class="listgroup">
        <van-field v-model="price" label="标准价格" placeholder="请输入" required type="number" />
        <van-field
          v-model="belong_job"
          is-link
          label="归属部门"
          placeholder="请选择"
          @click="belongDialog = true"
          readonly
        />
        <van-action-sheet v-model="belongDialog">
          <van-picker
            title="归属部门"
            show-toolbar
            :columns="bumenlist"
            @cancel="belongDialog=false"
            @confirm="onConfirm"
          />
        </van-action-sheet>
        <van-field name="switch" label="是否停用">
          <template #input>
            <van-switch v-model="is_stop" size="20" active-color="#fe0043" />
          </template>
        </van-field>
        <van-field v-model="remark" label="备注" />
      </div>
    </div>
    <van-button color="#fe0043" block @click="submit">保存</van-button>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  components: {},
  props: {},
  data () {
    return {
      uploader: [],
      categoryDialog: false,
      belongDialog: false,
      catelist: [],
      bumenlist: ['销售部', '管理部', '美容部', '按摩组', '足疗组'],
      storeid: sessionStorage.getItem('storeid'),
      type: 1,
      id: 0,
      ccard_count: 0,
      ccard_price: 0,
      ccard_total: 0,
      img: '',
      name: '',
      item_no: '',
      price: '',
      belong_job: '',
      categoryName: '',
      category_id: '',
      is_stop: false,
      remark: ''
    }
  },
  methods: {
    Confirm (value) {
      this.categoryName = value.name
      this.category_id = value.id
      this.categoryDialog = false
    },
    onConfirm (value) {
      this.belong_job = value
      this.belongDialog = false
    },
    async getItemsInfo () {
      const res = await this.$axios.get('/api?datatype=get_item_byid', {
        params: {
          storeid: this.storeid,
          id: this.id
        }
      })
      console.log(res)
      if (res.data.code == 1) {
        this.img = res.data.data.img
        this.name = res.data.data.name
        this.item_no = res.data.data.item_no
        this.price = res.data.data.price
        this.belong_job = res.data.data.belong_job
        this.categoryName = res.data.data.title
        this.category_id = res.data.data.category_id
        this.is_stop = res.data.data.is_stop == 1 ? true : false
        this.remark = res.data.data.remark
      }
    },
    // 获取产品分类
    async getCPcate () {
      const res = await this.$axios.get('/api?datatype=get_itemcate&storeid=' + this.storeid)
      console.log(res)
      res.data.data.forEach(item => {
        this.$set(item, 'name', item.title)
      })
      this.catelist = res.data.data
    },
    // 上传图片
    async afterRead (file) {
      file.status = 'uploading';
      let data = qs.stringify({ img: file.content })
      const res = await this.$axios.post('/api?datatype=upload_img', data)
      console.log(res)
      if (res.data.code == 1 && res.data.data) {
        file.status = 'done';
        this.img = res.data.data
      } else {
        file.status = 'failed';
        file.message = '上传失败';
      }
    },
    async submit () {
      if (!this.item_no) return this.$message.error('请输入项目编号')
      if (!this.name) return this.$message.error('请输入项目名称')
      if (!this.price) return this.$message.error('请输入价格')
      if (!this.category_id) return this.$message.error('请选择项目分类')
      const params = {
        storeid: this.storeid,
        remark: this.remark,
        type: this.type,
        id: this.id,
        img: this.img,
        item_no: this.item_no,
        name: this.name,
        price: this.price,
        category_id: this.category_id,
        belong_job: this.belong_job,
        is_stop: this.is_stop ? 1 : 0,
        remark: this.remark,
        ccard_count: this.ccard_count,
        ccard_price: this.ccard_price,
        ccard_total: this.ccard_total
      }
      const res = await this.$axios.get('/api?datatype=insert_item', {
        params
      })
      console.log(res)
      if (res.data.code == 1) {
        this.$toast(res.data.msg)
        this.$router.go(-1)
      } else {
        this.$toast(res.data.msg)
      }
    }
  },
  created () {
    let id = this.$route.query.id
    if (id) {
      this.id = id
      this.type = 2
      this.getItemsInfo()
    }
    this.getCPcate()
  },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.addGoods {
  background-color: #f9f9f9;
  .info {
    height: calc(100% - 2rem);
    overflow-y: auto;
  }
  .listgroup {
    margin-bottom: 0.2rem;
  }
}
</style>
