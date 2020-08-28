<template>
  <div class="addstaff">
    <van-nav-bar :title="type==2?'修改员工资料':'新增员工'" left-arrow @click-left="back"></van-nav-bar>
    <div class="info">
      <div class="listgroup">
        <van-field v-model="jobNo" label="编号" placeholder="请输入" required :readonly="type==2" />
        <van-field v-model="name" label="姓名" placeholder="请输入" required />
        <van-field v-model="mobile" label="手机号码" placeholder="请输入" type="tel" required />
        <van-field name="uploader" label="员工头像">
          <template #input>
            <van-image
              style="padding:0 0.16rem 0.16rem 0"
              width="1.6rem"
              height="1.6rem"
              fit="cover"
              :src="avatar|imgUrl"
              v-show="type==2&&!uploader.length&&avatar"
            />
            <van-uploader v-model="uploader" multiple :max-count="1" :after-read="afterRead" />
          </template>
        </van-field>
      </div>
      <div class="listgroup">
        <van-field name="radio" label="性别" required>
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="男" checked-color="#fe0043">男</van-radio>
              <van-radio name="女" checked-color="#fe0043">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="serviceJob"
          @click="serviceJobDialog = true"
          label="服务职称"
          placeholder="请选择"
          is-link
          required
          readonly
        />
        <van-action-sheet v-model="serviceJobDialog">
          <van-picker
            title="服务职称"
            @cancel="serviceJobDialog=false"
            show-toolbar
            :columns="serviceJoblist"
            value-key="name"
            @confirm="serviceJobConfirm"
            required
          />
        </van-action-sheet>
        <van-field
          v-model="section"
          is-link
          label="部门"
          placeholder="请选择"
          @click="sectionDialog = true"
          readonly
        />
        <van-action-sheet v-model="sectionDialog">
          <van-picker
            title="部门"
            show-toolbar
            :columns="sectionlist"
            @cancel="sectionDialog=false"
            @confirm="sectionConfirm"
          />
        </van-action-sheet>
        <van-field
          v-model="job"
          is-link
          label="职位"
          placeholder="请选择"
          @click="jobDialog = true"
          readonly
        />
        <van-action-sheet v-model="jobDialog">
          <van-picker
            title="职位"
            show-toolbar
            :columns="joblist"
            @cancel="jobDialog=false"
            @confirm="jobConfirm"
          />
        </van-action-sheet>
        <van-field
          v-model="nowStatus"
          is-link
          label="目前状态"
          placeholder="请选择"
          @click="nowStatusDialog = true"
          readonly
        />
        <van-action-sheet v-model="nowStatusDialog">
          <van-picker
            title="目前状态"
            show-toolbar
            :columns="nowStatuslist"
            @cancel="nowStatusDialog=false"
            @confirm="nowStatusConfirm"
          />
        </van-action-sheet>
        <van-field name="switch" label="预约状态">
          <template #input>
            <van-switch v-model="yyStatus" size="20" active-color="#fe0043" />
          </template>
        </van-field>
      </div>
      <div class="listgroup">
        <van-field v-model="username" label="登录账号" />
        <van-field v-model="password" label="登录密码" />
        <van-field v-model="remark" label="备注" />
      </div>
    </div>
    <van-button color="#fe0043" block @click="submit" size="20">保存</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['info'],
  data () {
    return {
      uploader: [],
      avatar: '',
      id: 0,
      type: 1,
      jobNo: '',
      name: '',
      sex: '男',
      mobile: '',
      section: '',
      serviceJob: '',
      job: '',
      nowStatus: '在职',
      yyStatus: true,
      username: '',
      password: '',
      remark: '',
      sectionDialog: false,
      serviceJobDialog: false,
      jobDialog: false,
      nowStatusDialog: false,
      storeid: sessionStorage.getItem('storeid'),
      nowStatuslist: ['在职', '未在职', '离职'],
      sectionlist: ['销售部', '管理部', '美容组', '按摩组', '足疗组'],
      serviceJoblist: ['店长', '经理', '助理', '顾问', '学徒', '美容师', '初级美容师', '按摩师', '美体师'],
      joblist: ['店长', '管理人员', '收银人员', '美容经理', '美容师', '按摩师', '足疗师', '清洁工']
    }
  },
  methods: {
    back () {
      if (this.type == 1) {
        this.$router.go(-1)
      } else {
        this.$emit('close')
      }
    },
    serviceJobConfirm (value) {
      this.serviceJob = value
      this.serviceJobDialog = false
    },
    sectionConfirm (value) {
      this.section = value
      this.sectionDialog = false
    },
    jobConfirm (value) {
      this.job = value
      this.jobDialog = false
    },
    nowStatusConfirm (value) {
      this.nowStatus = value
      this.nowStatusDialog = false
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
      if (!this.jobNo) return this.$toast('请输入编号')
      if (!this.name) return this.$toast('请输入姓名')
      if (!this.mobile) return this.$toast('请输入手机号')
      if (!(/^1[3456789]\d{9}$/.test(this.mobile))) return this.$toast('手机号不正确')
      if (!this.serviceJob) return this.$toast('请选择服务职称')
      let nowStatus = ''
      if (this.nowStatus == '在职') {
        nowStatus = 1
      } else if (this.nowStatus == '未在职') {
        nowStatus = 2
      } else {
        nowStatus = 3
      }
      const params = {
        storeid: this.storeid,
        id: this.id,
        type: this.type,
        avatar: this.avatar,
        job_no: this.jobNo,
        name: this.name,
        sex: this.sex == '男' ? '1' : '2',
        mobile: this.mobile,
        section: this.section,
        service_job: this.serviceJob,
        job: this.job,
        now_status: nowStatus,
        yy_status: this.yyStatus ? '1' : '0',
        username: this.username,
        password: this.password,
        remark: this.remark
      }
      const res = await this.$axios.get('/api?datatype=insert_staff', {
        params
      })
      console.log(res)
      if (res.data.code == 1) {
        this.$toast(res.data.msg)
        this.back()
      } else {
        this.$toast(res.data.msg)
      }
    }
  },
  created () {
    console.log(this.info)
    if (this.info) {
      this.type = 2
      let obj = JSON.parse(this.info)
      this.id = obj.id
      this.jobNo = obj.job_no
      this.name = obj.name
      this.sex = obj.sex == 1 ? '男' : '女'
      this.mobile = obj.mobile
      this.section = obj.section
      this.serviceJob = obj.service_job
      this.job = obj.job
      this.nowStatus = obj.now_status == 1 ? '在职' : obj.now_status == 2 ? '未在职' : '离职'
      this.yyStatus = obj.yy_status == 1 ? true : false
      this.username = obj.username
      this.password = obj.password
      this.remark = obj.remark
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.addstaff {
  background-color: #f9f9f9;
  height: 100%;
  .info {
    height: calc(100% - 2rem);
    overflow-y: auto;
  }
  .listgroup {
    margin-bottom: 0.2rem;
  }
}
</style>
