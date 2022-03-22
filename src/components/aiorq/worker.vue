<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.status"
          placeholder="状态"
          class="handle-select mr10"
        >
          <el-option key="true" label="运行" value="运行"></el-option>
          <el-option key="false" label="离线" value="离线"></el-option>
        </el-select>
        <el-input
          v-model="query.worker"
          placeholder="worker"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>

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

        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >查看运行函数</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
        status: "状态",
        worker: "pai",
      },
      workers: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
      form: {},
    };
  },
  created() {
    this.get_workers();
  },

  methods: {
    get_workers() {
      get_workers({}).then((res) => {
        console.log(res);
        this.workers = res.data.workers;
        this.total = res.data.workers.length;
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
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