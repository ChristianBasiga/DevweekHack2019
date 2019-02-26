<template>
    <view >
        <view>
            <button  v-for="hunt in hunts" :key = "hunt.id" class="huntButton"
            :title="hunt.name"
            :on-press="() => {joinHunt(hunt)}"/>
        </view>
    </view>
</template>

<script>

export default {

    name: 'HuntList',
    props: {
        
        hunts:{
            type: Array
        },
        goToHunt:{
            type : Function
        }
        

    },

    methods:{

        joinHunt(hunt){
            

                this.goToHunt(hunt);
        }
    }
}
</script>

