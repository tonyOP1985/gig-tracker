<template>
  <div>
    <ToolBar></ToolBar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import ToolBar from '../components/navigation/ToolBar';

export default {
  components: {
    ToolBar
  }
};
</script>
