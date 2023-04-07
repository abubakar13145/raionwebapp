<template>
    <div class="content-part tree-content">
        <TreeBox />
    </div>
</template>

<script lang="js">
import { ref } from 'vue';

import TreeBox from './../components/TreeBox.vue';

export default {
    name: "Tree",
    title() {
        return "Raion - Tree";
    },
    components: {
        TreeBox
    }
}
</script>

<style lang="scss">
.tree-content {
    position: relative;
}
</style>