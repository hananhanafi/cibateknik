<template>
    <div class="d-flex align-items-end flex-grow-1">
        <div class="text-center w-100">
            <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center mb-0">
                <li class="page-item" :class="{'disabled' : isFirstPage}" >
                    <a class="page-link  btn btn-sm" href="#" @click.prevent="changePage(data.first_page)">Awal</a>
                </li>
                
                <li v-if="!isFirstPage && (data.first_page+2 < data.current_page)" class="page-item disabled" >
                    <a class="page-link  btn btn-sm" href="#">...</a>
                </li>

                <li v-for="(page,i) in data.last_page"  :key="i" class="page-item">
                    
                    <a v-if="i+1 >= data.current_page-2 && i+1 <= data.current_page+2" class="page-link  btn btn-sm" :class="{
                        'bg-primary text-white disabled':data.current_page==i+1,
                    }" 
                    @click.prevent="changePage(i+1)"
                    >
                        {{i+1}}
                    </a>

                </li>
                
                <li v-if="!isLastPage && (data.last_page-2 > data.current_page)" class="page-item disabled" >
                    <a class="page-link  btn btn-sm" href="#">...</a>
                </li>
                
                <li class="page-item" :class="{'disabled' : isLastPage}">
                    <a href="#" class="page-link  btn btn-sm" @click.prevent="changePage(data.last_page)">Akhir</a>
                </li>
            </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        data: Object
    },
    computed: {
        isFirstPage() {
            return this.data.current_page === 1;
        },
        isLastPage() {
            return this.data.current_page === this.data.last_page;
        }
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