<template>
    <section>
        <client-only>
        <quill-editor
            ref="editor"
            v-model="dataModel"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
        />
        </client-only>
    </section>
</template>

<script>
    export default {
        name: 'QuillExampleNuxt',
        props: {
            // eslint-disable-next-line vue/require-default-prop
            model: [Object,String,Number,Array]
        },
        data () {
        return {
            dataModel: '',
            editorOption: {
            // Some Quill options...
                placeholder: 'Masukkan deskripsi',
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'align': [] }],

                        ['clean']                                         // remove formatting button
                    ]
                }
            }
        }
        },
        watch: {
            dataModel() {
                this.$emit('updateTextEditor',this.dataModel);
            }
        },
        mounted() {
        // console.log('App inited, the Quill instance object is:', this.$refs.editor.quill)
        this.dataModel = this.model;
        console.log("model",this.model);
        setTimeout(() => {
            this.content = 'I was changed!'
        }, 3000)
        },
        methods: {
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        }
        }
    }
</script>

<style>
    /* .container {
        width: 60%;
        margin: 0 auto;
        padding: 50px 0;
        
    } */

    .ql-editor {
        height: 200px !important;
        overflow-y: auto;
    }
</style>