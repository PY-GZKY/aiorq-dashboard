<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="10"
        :lg="12"
        :xl="24"
        style="margin-bottom: 10px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Redis Config</span>
          </div>

          <el-descriptions title="" :column="3" border>
            <el-descriptions-item
              v-for="(item, index) in items"
              :key="index"
              :label="item.label"
            >
              <el-tag size="small">{{ item.value }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_redis_info } from "@/api/index";
export default {
  name: "Setting",
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        project: "",
        status: "",
      },
      items: {},
    };
  },
  created() {
    this.get_redis_info();
  },
  methods: {
    get_redis_info() {
      this.listLoading = true;
      get_redis_info({}).then((response) => {
        console.log("response: ", response);
        this.items = response.data.items;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },

    resetTemp() {
      this.temp = {
        name: "",
        host: "",
        port: "",
        user: "",
        pwd: "",
        update_time: this.dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
    },

    xxx(row) {
      // this.listLoading = true;
      console.log("listQuery: ", this.listQuery);
      read_process_log(this.general.name, row.name).then((response) => {
        this.processLogItem.processLogList = response.data.log.stdout;
        this.processLogItem.generalName = this.general.name;
        this.processLogItem.processName = row.name;
        setTimeout(() => {
          // this.listLoading = false;
        }, 3 * 1000);
      });
    },
  },
};
</script>