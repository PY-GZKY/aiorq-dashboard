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
                v-model="query.function"
                placeholder="任务"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>

            <el-form-item>
              <el-input
               v-model="query.job_id"
                placeholder="任务ID"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="query.success"
                placeholder="结果状态"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <!-- <el-option label="所有" key="" value="" /> -->
                <el-option
                  v-for="(item, index) in ['成功', '失败']"
                  :key="item"
                  :label="item"
                  :value="!index"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-date-picker
                v-model="query.start_time"
                type="datetimerange"
                size="mini"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
              >
              </el-date-picker>
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
          width="270px"
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
          width="130px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.function }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          label="队列名称"
          width="110px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.queue_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          label="进程名称"
          width="110px"
        >
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.worker_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          width="90px"
          align="center"
          label="任务参数"
        >
          <template slot-scope="{ row }">
            <span>{{ row.args || "-" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          width="100px"
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
          min-width="160"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="start_time"
          label="开始时间"
          min-width="160"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="finish_time"
          label="结束时间"
          min-width="160"
          align="center"
        >
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="运行状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.success" type="success" size="mini"
              >succeeded</el-tag
            >
            <el-tag v-else type="danger" size="mini">failed</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="result"
          label="运行结果"
          width="120"
          align="center"
        >
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
import { get_results } from "../../api/index";
export default {
  name: "worker",
  data() {
    return {
      loading: false,
      limit: 1,
      sizeLimit: 100,
      query: {
        success: null,
        worker_name: null,
        function: null,
        job_id: null,
        start_time: null
      },
      results: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
      form: {},
    };
  },
  created() {
    this.get_results();
  },

  methods: {
    get_results() {
      get_results(this.query).then((res) => {
        this.results = res.data.rows;
        this.total = res.data.rows.length;
        setTimeout(() => {}, 1.5 * 1000);
      });
    },

    handleFilter() {
      this.get_results();
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