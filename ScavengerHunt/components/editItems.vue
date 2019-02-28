<template>

    <view>
        
        <button v-for="item in hunt.items" :key = "item.id" :title="join" :on-press="editItem"/>
        <button :title = "'Add Item'" :on-press = "addItem"/>
        <button :title = "'Cancel'" :on-press="close"/>

    </view>

</template>


<script>

  
    export default{

        props:{

            hunt:{
                type:Object
            },
            makeEdit:{
                type: Function
            },
            close:{
                type: Function
            }
        },
        


        methods:{

            //Both go to edit item.his
            editItem(){

                //Navigate to or open the edit item 
                this.makeEdit();
            },

            addItem(){

                this.makeEdit(true);
            },

           

        }
    }


</script>