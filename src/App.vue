<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import ContactInfoHeader from './components/ContactInfoHeader.vue';
	import AppointmentModal from './components/AppointmentModal.vue';
    import Footer from './components/Footer.vue';
    import { provide } from 'vue';
    // import { useSeoMeta } from '@unhead/vue';
    import TransitionWaiter from '@/vue-helpers/transitionWaiter';
    
    provide('hidePageScroll', hidePageScroll);
    provide('allowPageScroll', allowPageScroll);

    const pageScrollActuatorsTags: { [key: string]: boolean } = {};

    function hidePageScroll(actuatorTag: string | undefined) {
        if (actuatorTag && pageScrollActuatorsTags[actuatorTag]){
            return;
        }

        const body = document.body;
        
        if (!body.classList.contains('no-scroll')){
            body.classList.add('no-scroll');
        }

        if (actuatorTag){
            pageScrollActuatorsTags[actuatorTag] = true;
        }
    }

    function allowPageScroll(actuatorTag: string | undefined) {
        const body = document.body;
        
        if (!Object.values(pageScrollActuatorsTags).some(v => v === true) && body.classList.contains('no-scroll')){
            body.classList.remove('no-scroll');
        }

        if (actuatorTag){
            pageScrollActuatorsTags[actuatorTag] = false;
        }
    }

    function onTransitionStarted(){
        TransitionWaiter.Add();
    }

    function onTransitionEnded(){
        TransitionWaiter.Flush();
    }
</script>

<template>
    <ContactInfoHeader />

    <main class="bg-zinc-100 text-zinc-700">
        <router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in" @before-leave="onTransitionStarted" @enter="onTransitionEnded">
				<component :is="Component" />
			</transition>
        </router-view>
    </main>

    <Footer />

    <AppointmentModal />
</template>
