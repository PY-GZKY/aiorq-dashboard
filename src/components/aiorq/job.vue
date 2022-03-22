<template>
  <div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="20" :xs="24">
          <el-form ref="query" :model="query" :inline="true" label-width="68px">
            <el-form-item label="">
              <el-select
                v-model="query.worker"
                placeholder="工人"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <el-option label="所有" key="" value="" />
                <el-option
                  v-for="item in workerList"
                  :key="item.worker_name"
                  :label="item.worker_name"
                  :value="item.worker_name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="query.task"
                placeholder="任务"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <el-option label="所有" key="" value="" />
                <el-option
                  v-for="item in taskList"
                  :key="item.function_ms"
                  :label="item.function_name"
                  :value="item.function_name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="query.status"
                placeholder="状态"
                clearable
                style="width: 130px"
                size="mini"
                @change="handleFilter"
              >
                <el-option label="所有" key="" value="" />
                <el-option
                  v-for="item in statusList"
                  :key="item.us"
                  :label="item.zh"
                  :value="item.us"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input
                placeholder="任务ID"
                clearable
                size="mini"
                style="width: 200px"
                @keyup.enter.native="handleFilter"
              />
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
        <el-table-column min-width="110px" align="center" label="job_id">
          <template slot-scope="{ row }">
            <el-tag type="success" size="mini">{{ row.job_id }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="任务" min-width="110px">
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.function }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="queue_name" min-width="110px">
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.queue_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="worker_name" min-width="110px">
          <template slot-scope="{ row }">
            <el-tag type="" size="mini">{{ row.worker_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="args"
          label="args"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="kwargs"
          label="kwargs"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="job_try"
          label="任务重试次数"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="enqueue_time"
          label="入队时间"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="start_time"
          label="开始时间"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="finish_time"
          label="结束时间"
          min-width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column min-width="80px" align="center" label="运行状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.finish_time" type="success" size="mini"
              >success</el-tag
            >
            <el-tag v-else type="info" size="mini">failed</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="result"
          label="运行结果"
          min-width="120"
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
        status: "状态",
        worker: "pai",
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
      get_results({}).then((res) => {
        this.results = res.data.rows;
        this.total = res.data.rows.length;
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.get_results();
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
      // console.log(this.currentPage); //点击第几页
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