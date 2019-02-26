<template>

    <view>

        <view v-if="defaultOpen">

            <button :on-press = "openEditHunt" :title = "'Edit Fences'"/>
            
            <button :on-press = "openEditFences" :title = "'Edit Items'"/>
                
        </view>

        <edit-fences  v-else-if="editItemsOpen" :selectedHunt="hunt" :close = "close"/>



    </view>
</template>




<script>


    import EditFences from '../components/editFences.vue';

    export default{

        props:{

            hunt:{
                type:Object
            }
        },

        data(){

            return {

                defaultOpen:true,
                editItemsOpen:false,
                editFencesOpen:false,
            }

        },

        methods:{

                openEditHunt(){

                    this.editItemsOpen = true;
                    this.defaultOpen = false;
                    this.editFencesOpen = false;
                },

                openEditFences(){

                    this.editFencesOpen = true;
                    his.editItemsOpen = false;
                    this.defaultOpen = false;
                },


                //Will be passed as prop to widows.
                close(){

                    this.defaultOpen = true;
                    this.editItemsOpen = false;
                    this.editFencesOpen = false;
                    
                }
        },

        components:{

            EditFences
        }

    }


</script>