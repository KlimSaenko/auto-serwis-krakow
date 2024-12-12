<script setup lang="ts">
    import { EditorContent, useEditor } from '@tiptap/vue-3';
    import StarterKit from '@tiptap/starter-kit';
    import Underline from '@tiptap/extension-underline';
    import TextStyle from '@tiptap/extension-text-style'
    import Color from '@tiptap/extension-color';
    import TextAlign from '@tiptap/extension-text-align';
    import Placeholder from '@tiptap/extension-placeholder';
    import Image from '@tiptap/extension-image';
    import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
    import ImageResize from 'tiptap-extension-resize-image';
    import { onBeforeUnmount, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import ApiService from '@/vue-helpers/apiService';

    const props = defineProps({
        initContent: {
            type: String,
            default: ''
        },
        activeButtons: {
            type: Array<String>,
            validator(list: string[]) {
                for (let el of list) {
                    if (['bold','italic','strike','underline','code','h1','h2','h3','bulletList','orderedList','blockquote','codeBlock','horizontalRule','undo','redo','uploadImage','alignLeft','alignCenter','alignRight','alignJustify']
                        .indexOf(el) === -1
                    ) {
                        return false;
                    }
                }
                return true;
            },
            default: ['bold', 'italic']
        }
    });

    const hasContent = ref(true);

    defineExpose({
        hasContent,
        getHTML,
        getText
    });

    const { t } = useI18n();

    const { initContent, activeButtons } = props;

    const editor = useEditor({
        content: initContent,
        extensions: [
            StarterKit.configure({ heading: {}}),
            TextStyle, 
            Color,
            Underline,
            Image.configure({ allowBase64: true }),
            GlobalDragHandle,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: t('admin.blog.postContentPlaceholder'), emptyEditorClass: 'is-editor-empty', }),
            ImageResize
        ],
        editorProps: {
            attributes: {
                class: 'outline-none'
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer?.files){
                    uploadImages(event.dataTransfer.files);
                }

                return false;
            }
        },
        onUpdate({ editor }) {
            hasContent.value = !editor.isEmpty;
        }
    });

    onBeforeUnmount(() => {
        editor.value?.destroy();
    });

    function onImagesUpload(payload: Event) {
        const files = (payload.target as HTMLInputElement)?.files;

        if (!files){
            return;
        }

        uploadImages(files);
    }

    async function uploadImages(fileList: FileList): Promise<boolean> {
        for (const file of fileList){
            if (!file?.type.startsWith("image/")) {
                return false;
            }

            var form = new FormData();
            form.append('image', file);

            const filePath = await ApiService.UploadFile(form);

            if (filePath){
                editor.value?.chain().focus().setImage({ src: filePath }).run();
            } else {
                alert(`Failed to upload the file ${file.name}.`);
                return false;
            }
        }

        return true;
    }

    function verifyMenuButton(buttonName: string){
        return activeButtons.indexOf(buttonName) != -1;
    }

    function getHTML(): string | undefined {
        return editor.value?.isEmpty
             ? undefined
             : editor.value?.getHTML();
    }

    function getText(): string {
        return editor.value?.getText() ?? '';
    }
</script>

<style lang="css">
    .tiptap p.is-editor-empty:first-child::before {
        color: #adb5bd;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }

    .tiptap img {
        display: block;
        height: auto;
        margin: 1.5rem 0;
        max-width: 100%;
    }
</style>

<template>
    <div class="font-jost">
        <div v-if="editor" class="font-jost-medium flex flex-row gap-2 p-2 items-center bg-white rounded-t-xl shadow-md hover:[&_button]:bg-zinc-200 [&_button]:px-1.5 [&_button]:py-1 [&_button]:h-7 [&_button_svg]:h-full [&_button]:rounded-lg leading-4">
            <button v-if="verifyMenuButton('bold')" :class="{ 'bg-zinc-200': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>text-bold</title>
                    <path d="M17.194,10.962A6.271,6.271,0,0,0,12.844.248H4.3a1.25,1.25,0,0,0,0,2.5H5.313a.25.25,0,0,1,.25.25V21a.25.25,0,0,1-.25.25H4.3a1.25,1.25,0,1,0,0,2.5h9.963a6.742,6.742,0,0,0,2.93-12.786Zm-4.35-8.214a3.762,3.762,0,0,1,0,7.523H8.313a.25.25,0,0,1-.25-.25V3a.25.25,0,0,1,.25-.25Zm1.42,18.5H8.313a.25.25,0,0,1-.25-.25V13.021a.25.25,0,0,1,.25-.25h4.531c.017,0,.033,0,.049,0l.013,0h1.358a4.239,4.239,0,0,1,0,8.477Z"/>
                </svg>
            </button>

            <button v-if="verifyMenuButton('italic')" :class="{ 'bg-zinc-200': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>text-italic</title>
                    <path d="M22.5.248H14.863a1.25,1.25,0,0,0,0,2.5h1.086a.25.25,0,0,1,.211.384L4.78,21.017a.5.5,0,0,1-.422.231H1.5a1.25,1.25,0,0,0,0,2.5H9.137a1.25,1.25,0,0,0,0-2.5H8.051a.25.25,0,0,1-.211-.384L19.22,2.98a.5.5,0,0,1,.422-.232H22.5a1.25,1.25,0,0,0,0-2.5Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('strike')" :class="{ 'bg-zinc-200': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>text-strike-through</title>
                    <path d="M23.75,12.952A1.25,1.25,0,0,0,22.5,11.7H13.564a.492.492,0,0,1-.282-.09c-.722-.513-1.482-.981-2.218-1.432-2.8-1.715-4.5-2.9-4.5-4.863,0-2.235,2.207-2.569,3.523-2.569a4.54,4.54,0,0,1,3.081.764A2.662,2.662,0,0,1,13.615,5.5l0,.3a1.25,1.25,0,1,0,2.5,0l0-.268A4.887,4.887,0,0,0,14.95,1.755C13.949.741,12.359.248,10.091.248c-3.658,0-6.023,1.989-6.023,5.069,0,2.773,1.892,4.512,4,5.927a.25.25,0,0,1-.139.458H1.5a1.25,1.25,0,0,0,0,2.5H12.477a.251.251,0,0,1,.159.058,4.339,4.339,0,0,1,1.932,3.466c0,3.268-3.426,3.522-4.477,3.522-1.814,0-3.139-.405-3.834-1.173a3.394,3.394,0,0,1-.65-2.7,1.25,1.25,0,0,0-2.488-.246A5.76,5.76,0,0,0,4.4,21.753c1.2,1.324,3.114,2,5.688,2,4.174,0,6.977-2.42,6.977-6.022a6.059,6.059,0,0,0-.849-3.147.25.25,0,0,1,.216-.377H22.5A1.25,1.25,0,0,0,23.75,12.952Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('underline')" :class="{ 'bg-zinc-200': editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>text-underline</title>
                    <path d="M22.5,21.248H1.5a1.25,1.25,0,0,0,0,2.5h21a1.25,1.25,0,0,0,0-2.5Z"/><path d="M1.978,2.748H3.341a.25.25,0,0,1,.25.25v8.523a8.409,8.409,0,0,0,16.818,0V3a.25.25,0,0,1,.25-.25h1.363a1.25,1.25,0,0,0,0-2.5H16.3a1.25,1.25,0,0,0,0,2.5h1.363a.25.25,0,0,1,.25.25v8.523a5.909,5.909,0,0,1-11.818,0V3a.25.25,0,0,1,.25-.25H7.7a1.25,1.25,0,1,0,0-2.5H1.978a1.25,1.25,0,0,0,0,2.5Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('code')" :class="{ 'bg-zinc-200': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>angle-brackets</title>
                    <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z"/><path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z"/>
                </svg>
            </button>

            <div class="border-l border-[#333] h-5 mx-2"></div>
    
            <button v-if="verifyMenuButton('h1')" :class="{ 'bg-zinc-200': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
                H1
            </button>
    
            <button v-if="verifyMenuButton('h2')" :class="{ 'bg-zinc-200': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
                H2
            </button>
    
            <button v-if="verifyMenuButton('h3')" :class="{ 'bg-zinc-200': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
                H3
            </button>
    
            <div class="border-l border-[#333] h-5 mx-2"></div>
    
            <button v-if="verifyMenuButton('bulletList')" :class="{ 'bg-zinc-200': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>list-bullets</title>
                    <circle cx="2.5" cy="3.998" r="2.5"/>
                    <path d="M8.5,5H23a1,1,0,0,0,0-2H8.5a1,1,0,0,0,0,2Z"/>
                    <circle cx="2.5" cy="11.998" r="2.5"/>
                    <path d="M23,11H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/>
                    <circle cx="2.5" cy="19.998" r="2.5"/>
                    <path d="M23,19H8.5a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('orderedList')" :class="{ 'bg-zinc-200': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>list-numbers</title>
                    <path d="M7.75,4.5h15a1,1,0,0,0,0-2h-15a1,1,0,0,0,0,2Z"/>
                    <path d="M22.75,11h-15a1,1,0,1,0,0,2h15a1,1,0,0,0,0-2Z"/>
                    <path d="M22.75,19.5h-15a1,1,0,0,0,0,2h15a1,1,0,0,0,0-2Z"/>
                    <path d="M2.212,17.248A2,2,0,0,0,.279,18.732a.75.75,0,1,0,1.45.386.5.5,0,1,1,.483.63.75.75,0,1,0,0,1.5.5.5,0,1,1-.482.635.75.75,0,1,0-1.445.4,2,2,0,1,0,3.589-1.648.251.251,0,0,1,0-.278,2,2,0,0,0-1.662-3.111Z"/>
                    <path d="M4.25,10.748a2,2,0,0,0-4,0,.75.75,0,0,0,1.5,0,.5.5,0,0,1,1,0,1.031,1.031,0,0,1-.227.645L.414,14.029A.75.75,0,0,0,1,15.248H3.5a.75.75,0,0,0,0-1.5H3.081a.249.249,0,0,1-.195-.406L3.7,12.33A2.544,2.544,0,0,0,4.25,10.748Z"/>
                    <path d="M4,5.248H3.75A.25.25,0,0,1,3.5,5V1.623A1.377,1.377,0,0,0,2.125.248H1.5a.75.75,0,0,0,0,1.5h.25A.25.25,0,0,1,2,2V5a.25.25,0,0,1-.25.25H1.5a.75.75,0,0,0,0,1.5H4a.75.75,0,0,0,0-1.5Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('blockquote')" :class="{ 'bg-zinc-200': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>close-quote</title>
                    <path d="M18.559,3.932a4.942,4.942,0,1,0,0,9.883,4.609,4.609,0,0,0,1.115-.141.25.25,0,0,1,.276.368,6.83,6.83,0,0,1-5.878,3.523,1.25,1.25,0,0,0,0,2.5,9.71,9.71,0,0,0,9.428-9.95V8.873A4.947,4.947,0,0,0,18.559,3.932Z"/>
                    <path d="M6.236,3.932a4.942,4.942,0,0,0,0,9.883,4.6,4.6,0,0,0,1.115-.141.25.25,0,0,1,.277.368A6.83,6.83,0,0,1,1.75,17.565a1.25,1.25,0,0,0,0,2.5,9.711,9.711,0,0,0,9.428-9.95V8.873A4.947,4.947,0,0,0,6.236,3.932Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('codeBlock')" :class="{ 'bg-zinc-200': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>angle-brackets</title>
                    <path d="M9.147,21.552a1.244,1.244,0,0,1-.895-.378L.84,13.561a2.257,2.257,0,0,1,0-3.125L8.252,2.823a1.25,1.25,0,0,1,1.791,1.744l-6.9,7.083a.5.5,0,0,0,0,.7l6.9,7.082a1.25,1.25,0,0,1-.9,2.122Z"/><path d="M14.854,21.552a1.25,1.25,0,0,1-.9-2.122l6.9-7.083a.5.5,0,0,0,0-.7l-6.9-7.082a1.25,1.25,0,0,1,1.791-1.744l7.411,7.612a2.257,2.257,0,0,1,0,3.125l-7.412,7.614A1.244,1.244,0,0,1,14.854,21.552Zm6.514-9.373h0Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('horizontalRule')" @click="editor.chain().focus().setHorizontalRule().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>horizontal-rule</title>
                    <path d="M5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L5,13 Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('undo')" @click="editor.chain().focus().undo().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>undo</title>
                    <path d="M17.786,3.77A12.542,12.542,0,0,0,4.821,2.905a.249.249,0,0,1-.292-.045L1.937.269A.507.507,0,0,0,1.392.16a.5.5,0,0,0-.308.462v6.7a.5.5,0,0,0,.5.5h6.7a.5.5,0,0,0,.354-.854L6.783,5.115a.253.253,0,0,1-.068-.228.249.249,0,0,1,.152-.181,10,10,0,0,1,9.466,1.1,9.759,9.759,0,0,1,.094,15.809A1.25,1.25,0,0,0,17.9,23.631a12.122,12.122,0,0,0,5.013-9.961A12.125,12.125,0,0,0,17.786,3.77Z"/>
                </svg>
            </button>
    
            <button v-if="verifyMenuButton('redo')" @click="editor.chain().focus().redo().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <title>redo</title>
                    <path d="M22.608.161a.5.5,0,0,0-.545.108L19.472,2.86a.25.25,0,0,1-.292.045A12.537,12.537,0,0,0,6.214,3.77,12.259,12.259,0,0,0,6.1,23.632a1.25,1.25,0,0,0,1.476-2.018A9.759,9.759,0,0,1,7.667,5.805a10,10,0,0,1,9.466-1.1.25.25,0,0,1,.084.409l-1.85,1.85a.5.5,0,0,0,.354.853h6.7a.5.5,0,0,0,.5-.5V.623A.5.5,0,0,0,22.608.161Z"/>
                </svg>
            </button>

            <button v-if="verifyMenuButton('uploadImage')" class="!p-0">
                <label class="cursor-pointer">
                    <input type="file" accept="image/*" @change="onImagesUpload" multiple hidden />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="mx-1.5">
                        <title>redo</title>
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/>
                    </svg>
                </label>
            </button>
    
            <div class="border-l border-[#333] h-5 mx-2"></div>
    
            <button v-if="verifyMenuButton('alignLeft')" :class="{ 'bg-zinc-200': editor.isActive({ textAlign: 'left' }) }" @click="editor.chain().focus().setTextAlign('left').run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <title>align left</title>
                    <path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <button v-if="verifyMenuButton('alignCenter')" :class="{ 'bg-zinc-200': editor.isActive({ textAlign: 'center' }) }" @click="editor.chain().focus().setTextAlign('center').run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <title>align center</title>
                    <path d="M3 6H21M3 14H21M17 10H7M17 18H7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <button v-if="verifyMenuButton('alignRight')" :class="{ 'bg-zinc-200': editor.isActive({ textAlign: 'right' }) }" @click="editor.chain().focus().setTextAlign('right').run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <title>align right</title>
                    <path d="M8 10H21M3 14H21M8 18H21M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button v-if="verifyMenuButton('alignJustify')" :class="{ 'bg-zinc-200': editor.isActive({ textAlign: 'justify' }) }" @click="editor.chain().focus().setTextAlign('justify').run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <title>align justify</title>
                    <path d="M3 10H21M3 14H21M3 18H21M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    
        <editor-content class="m-6 text-xl" :editor="editor" />
    </div>
  </template>