<script setup lang="ts">
    import { RouterView, onBeforeRouteLeave } from 'vue-router';
    import ContactInfoHeader from './components/header/ContactInfoHeader.vue';
	import AppointmentModal from './components/AppointmentModal.vue';
    import Footer from './components/Footer.vue';
    import { ref, provide } from 'vue';
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

    provide('isAppointmentModalOpened', isAppointmentModalOpened);
    provide('openAppointmentModal', openAppointmentModal);
	provide('closeAppointmentModal', closeAppointmentModal);
	provide('appointmentModalDescription', appointmentModalDescription);

    function onTransitionStarted(){
        TransitionWaiter.Add();
    }

    function onTransitionEnded(){
        TransitionWaiter.Flush();
    }
</script>

<template>
    <ContactInfoHeader />

	<AppointmentModal />

    <main class="bg-zinc-100 text-zinc-700">
        <router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in" @before-leave="onTransitionStarted" @enter="onTransitionEnded">
				<component :is="Component" />
			</transition>
        </router-view>
    </main>

    <Footer />
</template>
