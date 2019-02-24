<template>
    <view>
        <button class="huntButton"
            :title="Hunt"
            :on-press="$emit('hunt-selected', hunt)"
        />
    </view>
</template>


<script>
export default {
    name: 'Hunt',
    props: ["hunt"],
}
</script>
