const parse5 = require('parse5');
const json = parse5.parseFragment(`<template lang="tpl">
    <div id="box">
        <button v-if="sd" type="button" :name="name" v-bind="$attrs" v-bind:value="123">submit</button>
        <template v-else>22</template>
    </div>
</template>
<script>
alert(2)
</script>
`, {
        sourceCodeLocationInfo: true,
    });

console.log(json);