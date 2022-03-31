<template>
  <div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="20" :xs="24">
          <el-form ref="query" :model="query" :inline="true" label-width="68px">
            <el-form-item>
              <el-input
                v-model="query.worker_name"
                placeholder="进程名称"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="query.queue_name"
                placeholder="队列名称"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="query.function"
                placeholder="任务名称"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="query.job_id"
                placeholder="任务id"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="query.state"
                placeholder="状态"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <el-option
                  v-for="(item, index) in [{'label':'运行中','value':'in_progress'}, {'label':'等待中','value':'queued'},{'label':'延迟','value':'deferred'},]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                v-waves
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
        :data="results"
        border
        fit
        highlight-current-row
        style="width: 100%"
        class="table"
      >
        <el-table-column
          show-overflow-tooltip
          width="280px"
          align="center"
          label="任务id"
        >
          <template slot-scope="{ row }">
            <el-tag type="success" size="mini">{{ row.job_id }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          label="任务"
          width="140px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.function }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          label="队列名称"
          width="130px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.queue_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          label="进程名称"
          width="130px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.worker_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          width="100px"
          align="center"
          label="任务参数"
        >
          <template slot-scope="{ row }">
            <span>{{ row.args || "-" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          width="140px"
          align="center"
          label="字典参数"
        >
          <template slot-scope="{ row }">
            <span>{{ row.kwargs || "-" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="job_try"
          label="重试次数"
          min-width="80"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="enqueue_time"
          label="入队时间"
          min-width="140"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="start_time"
          label="开始时间"
          min-width="140"
          align="center"
        >
        </el-table-column>

        <el-table-column min-width="110px" align="center" label="状态">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.state == 'deferred'"
              type="warning"
              size="mini"
              plain
              >延迟</el-button
            >
            <el-button
              v-else-if="row.state == 'queued'"
              type=""
              size="mini"
              plain
              >等待中</el-button
            >
            <el-button
              v-else-if="row.state == 'in_progress'"
              type="success"
              :loading="true"
              size="mini"
              plain
              >运行中</el-button
            >
            <el-button
              v-else-if="row.state == 'failed'"
              type="error"
              size="mini"
              plain
              ><i class="el-icon-error"></i>失败</el-button
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
import { get_queued_jobs } from "../../api/index";
export default {
  name: "Job",
  data() {
    return {
      loading: false,
      limit: 1,
      sizeLimit: 100,
      query: {
        state: null,
        worker_name: null,
        queue_name: "pai:queue2",
        function:null,
        job_id: null,
      },
      results: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
      form: {},
    };
  },
  created() {
    this.get_queued_jobs();
  },

  methods: {
    get_queued_jobs() {
      get_queued_jobs(this.query).then((res) => {
        this.results = res.data.rows;
        this.total = res.data.rows.length;
        setTimeout(() => {}, 1.5 * 1000);
      });
    },

    handleFilter() {
      this.get_queued_jobs();
    },

    handleSizeChange(size) {
      this.pagesize = size;
      this.get_results();
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