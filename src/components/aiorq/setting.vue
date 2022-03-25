<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="24"
        :md="10"
        :lg="8"
        :xl="8"
        style="margin-bottom: 10px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>redis</span>
          </div>

          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="results"
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="node" width="150">
              <template slot-scope="{ row }">
                <span>{{ row.general.name }}</span>
              </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="connected">
              <template slot-scope="{ row }">
                <el-row>
                  <el-button
                    v-if="row.general.connected"
                    type="success"
                    icon="el-icon-check"
                    circle
                  ></el-button>
                  <el-button
                    v-else
                    type="info"
                    icon="el-icon-close"
                    circle
                  ></el-button>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="">
              <template slot-scope="{ row, $index }">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="mini"
                    @click.stop="() => handleNodeUpdate(row)"
                    >编辑
                  </el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click.stop="() => handleNodeDelete(row)"
                    >删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>


      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>task</span>
          </div>
          <el-form :inline="true" label-position="right">
            <el-form-item size="small">
              <el-button type="success" @click="startAllProcess(row)"
                >START ALL</el-button
              >
            </el-form-item>
            <el-form-item size="small">
              <el-button type="warning" @click="stopAllProcess(row)"
                >STOP ALL</el-button
              >
            </el-form-item>
            <el-form-item size="small">
              <el-button type="primary" @click="restartAllProcess(row)"
                >RESTART ALL</el-button
              >
            </el-form-item>
          </el-form>

          <el-table
            :key="tableKey"
            :data="results"
            v-loading="listLoading"
            aria-setsize
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="node" width="130px">
              <template slot-scope="{ row }">
                <span>{{ general.name }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="name">
              <template slot-scope="{ row }">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column width="240px" align="center" label="description">
              <template slot-scope="{ row }">
                <span>{{ row.description }}</span>
              </template>
            </el-table-column>

            <el-table-column label="statename" width="140px" align="center">
              <template slot-scope="{ row }">
                <div>
                  <el-button
                    v-if="row.statename == 'RUNNING'"
                    type="success"
                    size="mini"
                    plain
                    >运行中
                  </el-button>
                  <el-button v-else type="danger" plain size="mini"
                    >已停止
                  </el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="">
              <template slot-scope="{ row, $index }">
                <div>
                  <el-button
                    type="success"
                    size="mini"
                    @click="startProcess(row)"
                    >Start
                  </el-button>

                  <el-button
                    type="warning"
                    size="mini"
                    @click="stopProcess(row)"
                    >Stop
                  </el-button>

                  <el-button
                    type="primary"
                    size="mini"
                    @click="restartProcess(row)"
                    >Restart
                  </el-button>
                  <el-button
                    type="info"
                    size="mini"
                    @click="handleStdoutLog(row)"
                    >StdoutLog
                  </el-button>
                  <el-button type="danger" size="mini">StderrLog</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>


      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>config</span>
          </div>
          <el-form :inline="true" label-position="right">
            <el-form-item size="small">
              <el-button type="success" @click="startAllProcess(row)"
                >START ALL</el-button
              >
            </el-form-item>
            <el-form-item size="small">
              <el-button type="warning" @click="stopAllProcess(row)"
                >STOP ALL</el-button
              >
            </el-form-item>
            <el-form-item size="small">
              <el-button type="primary" @click="restartAllProcess(row)"
                >RESTART ALL</el-button
              >
            </el-form-item>
          </el-form>

          <el-table
            :key="tableKey"
            :data="results"
            v-loading="listLoading"
            aria-setsize
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="node" width="130px">
              <template slot-scope="{ row }">
                <span>{{ general.name }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="name">
              <template slot-scope="{ row }">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column width="240px" align="center" label="description">
              <template slot-scope="{ row }">
                <span>{{ row.description }}</span>
              </template>
            </el-table-column>

            <el-table-column label="statename" width="140px" align="center">
              <template slot-scope="{ row }">
                <div>
                  <el-button
                    v-if="row.statename == 'RUNNING'"
                    type="success"
                    size="mini"
                    plain
                    >运行中
                  </el-button>
                  <el-button v-else type="danger" plain size="mini"
                    >已停止
                  </el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="">
              <template slot-scope="{ row, $index }">
                <div>
                  <el-button
                    type="success"
                    size="mini"
                    @click="startProcess(row)"
                    >Start
                  </el-button>

                  <el-button
                    type="warning"
                    size="mini"
                    @click="stopProcess(row)"
                    >Stop
                  </el-button>

                  <el-button
                    type="primary"
                    size="mini"
                    @click="restartProcess(row)"
                    >Restart
                  </el-button>
                  <el-button
                    type="info"
                    size="mini"
                    @click="handleStdoutLog(row)"
                    >StdoutLog
                  </el-button>
                  <el-button type="danger" size="mini">StderrLog</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_ } from "@/api/index";
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
      temp: {},
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      console.log("listQuery: ", this.listQuery);
      get_nodes().then((response) => {
        console.log("response: ", response);
        this.nodeList = response.data.items;
        this.node_total = response.data.total || 2;
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