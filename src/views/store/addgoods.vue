<template>
  <div class="addGoods">
    <van-nav-bar :title="type==2?'修改商品':'添加商品'" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="info">
      <div class="listgroup">
        <van-field v-model="goods_no" label="商品编号" placeholder="请输入商品编号" required />
        <van-field v-model="goods_name" label="商品名称" placeholder="请输入商品名称" required />
        <van-field
          v-model="categoryName"
          @click="show = true"
          label="商品分类"
          placeholder="请选择商品分类"
          is-link
          required
          readonly
        />
        <van-action-sheet v-model="show">
          <van-picker
            title="商品分类"
            @cancel="show=false"
            show-toolbar
            :columns="items"
            value-key="name"
            @confirm="Confirm"
            required
          />
        </van-action-sheet>
        <van-field name="uploader" label="商品图片">
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
        <van-field v-model="in_cost" label="采购价格" placeholder="请输入采购价格" required type="number" />
        <van-field v-model="price" label="销售价格" placeholder="请输入标准价格" required type="number" />
        <van-field
          v-model="goods_unit"
          is-link
          label="标准单位"
          placeholder="请选择标准单位"
          @click="showunit = true"
          required
          readonly
        />
        <van-action-sheet v-model="showunit">
          <van-picker
            title="标准单位"
            show-toolbar
            :columns="unitlist"
            @cancel="showunit=false"
            @confirm="onConfirm"
          />
        </van-action-sheet>
        <van-field v-model="bar_code" label="条形码" placeholder="请输入条形码" />
        <van-field v-model="warehouse" label="存放仓库" placeholder="请输入仓库名" />
      </div>
      <div class="listgroup">
        <van-field name="switch" label="是否停用">
          <template #input>
            <van-switch v-model="is_stop" size="20" active-color="#fe0043" />
          </template>
        </van-field>
        <van-field name="switch" label="停止销售">
          <template #input>
            <van-switch v-model="state" size="20" active-color="#fe0043" />
          </template>
        </van-field>
        <van-field v-model="supplier" label="供应商" />
        <van-field v-model="goods_spec_format" label="规格描述" />
        <!-- <van-field v-model="remark" label="备注" /> -->
        <van-field v-model="remark" rows="1" autosize label="备注" type="textarea" />
      </div>
    </div>
    <van-button color="#fe0043" block @click="submit" size="20">保存</van-button>
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
      show: false,
      showunit: false,
      storeid: sessionStorage.getItem('storeid'),
      items: [],
      unitlist: ['瓶', '盒', '袋', '份', '克', '个', '千克', '升', '毫升', '双', '套'],
      type: 1,
      id: 0,
      img: '',
      goods_name: '',
      goods_no: '',
      price: '',
      in_cost: '',
      categoryName: '',
      category_id: '',
      warehouse: '门店仓库',
      goods_unit: '',
      supplier: '',
      supplier_id: '',
      state: false,
      is_stop: false,
      bar_code: '',
      goods_spec_format: '',
      remark: ''
    }
  },
  methods: {
    Confirm (value) {
      this.categoryName = value.name
      this.category_id = value.id
      this.show = false
    },
    onConfirm (value) {
      this.goods_unit = value
      this.showunit = false
    },
    //获取编辑产品
    async getGoodsInfo () {
      const res = await this.$axios.get('/api?datatype=get_goodsinfo_byid', {
        params: {
          storeid: this.storeid,
          id: this.id
        }
      })
      console.log(res)
      if (res.data.code == 1) {
        this.img = res.data.data.pic
        this.goods_name = res.data.data.goods_name
        this.goods_no = res.data.data.goods_no
        this.price = res.data.data.price
        this.in_cost = res.data.data.in_cost
        this.categoryName = res.data.data.title
        this.category_id = res.data.data.category_id
        this.goods_unit = res.data.data.goods_unit
        this.supplier_id = res.data.data.supplier_id
        this.state = res.data.data.state == 1 ? true : false
        this.is_stop = res.data.data.is_stop == 1 ? true : false
        this.bar_code = res.data.data.bar_code
        this.goods_spec_format = res.data.data.goods_spec_format
        this.remark = res.data.data.remark
      }
    },
    // 获取产品分类
    async getCPcate () {
      const res = await this.$axios.get('/api?datatype=get_goodscate&storeid=' + this.storeid)
      console.log(res)
      res.data.data.forEach(item => {
        this.$set(item, 'name', item.title)
      })
      this.items = res.data.data
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
      if (!this.goods_name || !this.goods_no || !this.price || !this.in_cost || !this.category_id || !this.goods_unit) return this.$toast('请完善信息')
      let params = {
        storeid: this.storeid,
        type: this.type,
        id: this.id,
        pic: this.img,
        goods_name: this.goods_name,
        goods_no: this.goods_no,
        price: this.price,
        in_cost: this.in_cost,
        category_id: this.category_id,
        warehouse: this.warehouse,
        goods_unit: this.goods_unit,
        supplier_id: this.supplier_id,
        state: this.state ? '1' : '0',
        is_stop: this.is_stop ? '1' : '0',
        bar_code: this.bar_code,
        goods_spec_format: this.goods_spec_format,
        remark: this.remark
      }

      const res = await this.$axios.get('/api?datatype=insert_goods', { params })
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
      this.getGoodsInfo()
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
