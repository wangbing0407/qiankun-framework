<template>
  <div class="about">
    <h1 style="color: coral;">This is an vue2子应用 about page</h1>
    <EditTable />
  </div>
</template>

<script>
import EditTable from './EditTable'

export default {
  data() {
    return {

    }
  },
  components: {
    EditTable
  }
}
</script>