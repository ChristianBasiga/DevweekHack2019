<template>
    <view>
     
    </view>
</template>


<script>

import HuntItemList from '../components/huntItemList.vue';
import axios from 'axios';

import urls from '../sitedata/urls.js';
const url = urls.backendURL;

export default {
    name: 'Hunt',
    props:{

        navigation:{
            type: Object
        },
       
    },
    data(){


        console.log(this.navigation.state);
        return {

            hunt:null
        };

    },

    mounted(){

            const {hunt} = this.navigation.state.params;
            this.hunt = hunt;
            axios.get(url + "/getItemsOfHunt", {
                params: {
                    huntId: hunt.id
                }
            })
            .then(response => {

                this.items = response.data;

            })
            .catch(err => {

                console.log("error" , err);
            })

    },
    components:{

        HuntItemList
    }
}
</script>
