<template>

    <view>

        <view v-if="defaultOpen">

            <button :on-press = "openEditHunt" :title = "'Edit Items'"/>
            
            <button :on-press = "openEditFences" :title = "'Edit Fences'"/>
                
        </view>

        <edit-fences  v-else-if="editFencesOpen" :selectedHunt="hunt" :close = "close"/>
        <edit-items v-else-if="editItemsOpen" :hunt = "hunt" :makeEdit = "goToEditItem" :close = "close"/>
        

    </view>
</template>




<script>


    import EditFences from '../components/editFences.vue';
    import EditItems from '../components/editItems.vue';
    import axios from 'axios';
    import urls from '../sitedata/urls.js';
    const url = urls.backendURL;

    export default{

        props:{

           
            
            navigation:{
                type:Object
            }
        },

        data(){

            return {

                defaultOpen:true,
                editItemsOpen:false,
                editFencesOpen:false,
                items:[],
                hunt:null
            }

        },

        mounted(){


            this.hunt = this.navigation.state.params.hunt;
            
            axios.get(url + "/getItemsOfHunt", {
                params: {
                    huntId: this.hunt.id
                }
            })
            .then(response => {

                this.items = response.data;

            })
            .catch(err => {

                console.log("error" , err);
            })


        },

        methods:{


                goToEditItem(isNew){

                    this.navigation.navigate("EditItem",{
                        isNew: isNew
                    });
                },

                openEditHunt(){

                    this.editItemsOpen = true;
                    this.defaultOpen = false;
                    this.editFencesOpen = false;
                },

                openEditFences(){

                    this.editFencesOpen = true;
                    this.editItemsOpen = false;
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

            EditFences,
            EditItems
        }

    }


</script>