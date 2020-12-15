<template>
    <div>
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" :style="{height: windowH.height+'px'}">
                <b-col cols="12" lg="6" md="8"  sm="10" class="mx-auto my-auto"> 
                    <div >
                        <div>
                        <div class="py-2" style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);border-radius:40px">
                            <div class="my-5 mx-5 text-medium">
                                <h2 class="font-weight-bold text-" >Login</h2>

                                <b-form-input class="rounded-pill mb-2" placeholder="Username"></b-form-input>
                                <b-form-input class="rounded-pill mb-2" placeholder="Password"></b-form-input>

                                <div class="text-center mt-2">

                                    <b-button class="rounded-pill w-50" style="background: linear-gradient(88.49deg, #41E296 0%, #3BB7B4 100%);" >Masuk</b-button>
                                </div>

                            </div>

                            <div>
                            </div>
                        </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <!-- <section class="section has-text-centered">
            <h1 class="title is-1">
                Your Window
            </h1>
            <h3 class="title is-3">
                Width: {{ windowH.width }} px<br/>
                Height: {{ windowH.height }} px
            </h3>
        </section> -->
        
    </div>
    
</template>

<script>
    export default {
        // page properties go here
        data() {
            return {
                windowH: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            // window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            }
        }
    }
</script>

<style>
    .red {
    color: red;
    }
    .form-control{
        background-color: #efefef;
    }
</style>