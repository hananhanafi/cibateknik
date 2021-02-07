<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left "> 
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight"><h1>Produk</h1></div>
                    <div class="p-2 bd-highlight float-right ml-auto "><b-button id="show-btn"  size="xl"  class="rounded-pill text-white w-100" variant="primary" @click="$router.push({name:'admin-inventory-tambah'})">Tambah</b-button></div>
                    <!-- <div class="p-2 bd-highlight">Flex item 3</div> -->
                </div>
                <div>
                    <b-table
                    :sticky-header="stickyHeader"
                    :no-border-collapse="noCollapse"
                    responsive
                    :items="items"
                    :fields="fields"
                    >
                    
                    <!-- eslint-disable-next-line vue/no-unused-vars -->
                    <template #thead-top="data">
                        <b-tr>
                        <b-th colspan="4"><span class="sr-only">Name and ID</span></b-th>
                        <b-th colspan="31" >Tanggal</b-th>
                        </b-tr>
                    </template>
                    <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
                    <!-- eslint-disable-next-line vue/no-unused-vars -->
                    <template #head(id)="scope">
                        <div class="text-nowrap">Row ID</div>
                    </template>
                    <template #head()="scope">
                        <div class="text-nowrap">
                        {{ scope.label }}
                        </div>
                    </template>
                    </b-table>
                </div>
            </div>
                
            
        </b-container>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
        stickyHeader: true,
        noCollapse: false,
        fields: [
            { key: 'no', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'merk', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'type', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            '1',
            '2',
            { key: '3', stickyColumn: true, variant: 'info' },
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            
            { key: 'keluar', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'masuk', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'stock', stickyColumn: true, isRowHeader: true, variant: 'primary' },
            { key: 'action', stickyColumn: true, isRowHeader: true, variant: 'primary' },
        ],
        items: [
            { id: 1, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 2, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 3, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 4, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 5, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 7, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 8, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 9, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 },
            { id: 10, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 }
        ]

            }
        },
        
        mounted() {
        },
        methods: {
        }
    }
</script>

<style>
    .red {
    color: red;
    }
    table.modalInfo>tr>td{
        vertical-align: top;
    }
</style>