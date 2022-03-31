<template>
  <div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="20" :xs="24">
          <el-form ref="query" :model="query" :inline="true" label-width="68px">
            <el-form-item>
              <el-input
                v-model="query.worker"
                placeholder="进程名称"
                clearable
                size="mini"
                style="width: 200px"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="query.queue"
                placeholder="队列"
                clearable
                size="mini"
                style="width: 200px"
              />
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="query.is_action"
                placeholder="状态"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <el-option
                  v-for="(item, index) in ['在线', '离线']"
                  :key="!index"
                  :label="item"
                  :value="!index"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-search"
                @click="handleFilter"
              >
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-table
        :data="workers"
        border
        fit
        highlight-current-row
        style="width: 100%"
        class="table"
      >
        <el-table-column min-width="110px" align="center" label="进程名称">
          <template slot-scope="{ row }">
            <el-tag type="success" size="mini">{{ row.worker_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="队列" min-width="110px">
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.queue_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="80px" align="center" label="状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.is_action" type="success" size="mini"
              >运行中</el-tag
            >
            <el-tag v-else type="info" size="mini">离线</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="health_check.queued"
          label="等待中"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="health_check.j_complete"
          label="已完成"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="health_check.j_ongoing"
          label="进行中"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="health_check.j_failed"
          label="执行失败"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column align="center" label="运行函数" min-width="200px">
          <template slot-scope="{ row }">
            <el-tag
              v-for="(item, index) in row.functions"
              type="success"
              :key="index"
              size="mini"
              style="margin: 3px"
            >
              {{ item }}(...)
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="red"
              @click="handle(scope.$index, scope.row)"
              >详细配置参数</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 100]"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
        <div class="pagination-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_workers } from "../../api/index";
export default {
  name: "worker",
  data() {
    return {
      loading: false,
      limit: 1,
      sizeLimit: 100,
      query: {
        is_action: null,
        worker: null,
        queue: null,
      },
      workers: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
      form: {},
      showFuncVisible: false,
    };
  },
  created() {
    this.get_workers();
  },

  methods: {
    get_workers() {
      console.log("this.query: ", this.query);
      get_workers(this.query).then((res) => {
        console.log(res);
        this.workers = res.data.workers;
        this.total = res.data.workers.length;
        setTimeout(() => {}, 1.5 * 1000);
      });
    },

    handleFilter() {
      this.get_workers();
    },

    handleSizeChange(size) {
      this.pagesize = size;
      this.get_workers();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
  },
};
</script>

<style scoped>
.upload-demo {
  margin-top: 0px;
  height: 150px;
}
.crumbs {
  margin-top: 0px;
}
.dialog-conent {
  margin-left: 15px;
}
.handle-box {
  margin-bottom: 15px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 12px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>