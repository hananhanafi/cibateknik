<template>
    <div class="d-flex align-items-end flex-grow-1">
        <div class="text-center w-100">
            <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center mb-0">
                <li class="page-item" :class="{'disabled' : isFirstPage}" >
                    <a @click.prevent="changePage(data.first_page)" class="page-link  btn btn-sm" href="#">Awal</a>
                </li>
                
                <li v-if="!isFirstPage && (data.first_page+2 < data.current_page)" class="page-item disabled" >
                    <a class="page-link  btn btn-sm" href="#">...</a>
                </li>

                <li class="page-item"  v-for="(page,i) in data.last_page" :key="i">
                    
                    <a v-if="i+1 >= data.current_page-2 && i+1 <= data.current_page+2" @click.prevent="changePage(i+1)" class="page-link  btn btn-sm" 
                    :class="{
                        'bg-primary text-white disabled':data.current_page==i+1,
                    }"
                    >
                        {{i+1}}
                    </a>

                </li>
                
                <li v-if="!isLastPage && (data.last_page-2 > data.current_page)" class="page-item disabled" >
                    <a class="page-link  btn btn-sm" href="#">...</a>
                </li>
                
                <li class="page-item" :class="{'disabled' : isLastPage}">
                    <a @click.prevent="changePage(data.last_page)" class="page-link  btn btn-sm" href="#">Akhir</a>
                </li>
            </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    computed: {
        isFirstPage() {
            return this.data.current_page == 1;
        },
        isLastPage() {
            return this.data.current_page == this.data.last_page;
        }
    },
    mounted(){
        console.log("datame",this.data);
    },
    methods: {
        changePage(page){
            this.$emit("page-update",page);
        },
        pageBreak(){

        }
    }
    
}
</script>