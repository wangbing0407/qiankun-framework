<template>
  <div>
    <div class="btn-box">
        <el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="handleUpload" >
            <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button size="small" type="danger" @click="changeState">改变状态</el-button>
        <el-button size="small" type="primary" @click="getTableData">获取表格数据</el-button>
    </div>
    <div>
      <vxe-table ref="xTable" :align="allAlign" :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="attachment" title="附件">
            <template #default="{ row }">
                <!-- <vxe-input v-model="data.name"></vxe-input> -->
                <span>{{ row.attachment ? row.attachment.name : '' }}</span>
            </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            allAlign: null,
            tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ]
        }
    },
    methods: {
        handleUpload(file) {
            console.log(file);
            
        },
        changeState() {
            const fileTyle = {
                name: 'aaa.text',
                size: 2352423,
                path: 'http://www.baidu.com'
            }
            this.tableData.map(r => {
                r.attachment = fileTyle
            })
            this.$refs.xTable.reloadData(this.tableData)
        },
        getTableData() {
            this.tableData.map(r => {
                r.attachment = r.attachment.path
            })
            console.log(this.tableData);
        }
    }
}
</script>

<style>
.btn-box {
    display: flex;
}
</style>