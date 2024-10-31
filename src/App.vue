<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import ContactInfoHeader from './components/header/ContactInfoHeader.vue';
	import AppointmentModal from './components/AppointmentModal.vue';
    import Footer from './components/Footer.vue';
    import { ref, provide, watch } from 'vue';
    import TransitionWaiter from '@/vue-helpers/transitionWaiter';

    const isAppointmentModalOpened = ref(false);
	const appointmentModalDescription = ref('');
	
    const openAppointmentModal = (description: string = '') => {
      	isAppointmentModalOpened.value = true;
		appointmentModalDescription.value = description ?? '';
    };
	const closeAppointmentModal = () => {
      	isAppointmentModalOpened.value = false;
    };

    const isMenuExpanded = ref(false);

    let scrollTop = 0;

    watch([isAppointmentModalOpened, isMenuExpanded], bodyOverlaps => {
        const body = document.body;
        const alreadyOverlapped = body.classList.contains('no-scroll');
        const currentlyOverlapped = bodyOverlaps.some(value => value);
        
        if (currentlyOverlapped && !alreadyOverlapped){
            scrollTop = document.documentElement.scrollTop;
            body.style.setProperty('--st', -(scrollTop) + "px");
            body.classList.add('no-scroll');
        } else if (!currentlyOverlapped && alreadyOverlapped) {
            body.classList.remove('no-scroll');
            window.scrollTo(0, scrollTop);
        };
    });

    provide('isAppointmentModalOpened', isAppointmentModalOpened);
    provide('openAppointmentModal', openAppointmentModal);
	provide('closeAppointmentModal', closeAppointmentModal);
	provide('appointmentModalDescription', appointmentModalDescription);
    provide('isMenuExpanded', isMenuExpanded);

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
