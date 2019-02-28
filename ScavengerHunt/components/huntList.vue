<template>
    <view>

        
        <view  v-for="hunt in hunts" :key = "hunt.id" class="huntButton">
            
            <text> {{hunt.name}} </text>
            
            <button
            :title="'Join'"
            :on-press="() => {joinHunt(hunt)}"/>

            <button
            :title = "'Edit'"
            :on-press="() => {editHunt(hunt)}"/>

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
        join:{
            type : Function
        },
        edit:{
            type: Function
        }
        

    },

    mounted(){

        console.log(this.hunts);
    },
    methods:{

        joinHunt(hunt){
            

            this.join(hunt);
        },

        editHunt(hunt){

            this.edit(hunt);
        }
    }
}
</script>

<style>


.huntButton{
    display:flex;
}


</style>
