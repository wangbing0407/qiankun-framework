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
      <vxe-table ref="xTable" border :align="allAlign" :data="tableData" @checkbox-change="selectChangeEvent" :span-method="rowspanMethod">
        <vxe-column type="checkbox" width="60"></vxe-column>
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
    <div>
        <el-table :data="mergeData" :span-method="objectSpanMethod" @selection-change="handleSelectionChange" border style="width: 100%; margin-top: 20px">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
            <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
            <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
        </el-table>
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
                { id: 10002, name: 'Test1', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10002, name: 'Test1', role: 'Test', sex: 'Women', age: 22, address: 'Shenzhen' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ],
            tableSelection: [],
            mergeSelection: [],
            mergeData: [
                { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10}, 
                { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10}, 
                { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10}, 
                { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10}, 
            ],
            multipleSelection: []
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
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        selectChangeEvent(selection) {
            console.log(selection);
            const { row, data } = selection
            data.map(r => {
                if(r.name === row.name) this.mergeSelection.push(r)
            })
            console.log(this.mergeSelection);
        },
        rowspanMethod ({ row, _rowIndex, column, visibleData,columnIndex,rowIndex }) {
            let fields = ['name']
            let cellValue = row[column.property]
            let prevRow = visibleData[_rowIndex - 1]
            let nextRow = visibleData[_rowIndex + 1]
            if (cellValue && fields.includes(column.property)) {
                if (prevRow && prevRow[column.property] === cellValue) {
                    return { rowspan: 0, colspan: 0 }
                } else {
                    let countRowspan = 1
                    while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                    }
                    if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                    }
                }
            }
            // if (columnIndex === 0) {
            //     if (rowIndex % 2 === 0) {
            //         return {
            //         rowspan: 2,
            //         colspan: 1
            //         };
            //     }
            // }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            const mergeColumn = [0,1]
            if (mergeColumn.includes(columnIndex)) {
                if (rowIndex % 2 === 0) {
                    return {
                    rowspan: 2,
                    colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    };
                }
            }
        }
    }
}
</script>

<style>
.btn-box {
    display: flex;
}
</style>