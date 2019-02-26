<template>
    <view>
     
    </view>
</template>


<script>

import HuntItemList from '../components/huntItemList.vue';


export default {
    name: 'Hunt',
    props:{

        navigation:{
            type: Object
        }
    },
    data(){


        const {hunt} = this.navigation.state;
        return {

            hunt:hunt
        };

    },
    components:{

        HuntItemList
    }
}
</script>
