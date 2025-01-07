import { ref } from 'vue';

const isModalOpened = ref(false);

let customOpenFunc: ((description: string) => void) | undefined = undefined;
let customCloseFunc: (() => void) | undefined = undefined;

function registerOpenFunc(func: (description: string) => void){
	if (customOpenFunc) {
		console.error('Appointment modal function can be registered only once. Modal open function has been already registered.');
	} else {
		customOpenFunc = func;
	}
}

function registerCloseFunc(func: () => void){
	if (customCloseFunc) {
		console.error('Appointment modal function can be registered only once. Modal close function has been already registered.');
	} else {
		customCloseFunc = func;
	}
}

function openAppointmentModal(description: string = '') {
	isModalOpened.value = true;

	if (customOpenFunc) {
		customOpenFunc(description);
	}
}

function closeAppointmentModal() {
	isModalOpened.value = false;

	if (customCloseFunc) {
		customCloseFunc();
	}
}

export { isModalOpened, openAppointmentModal, closeAppointmentModal, registerOpenFunc, registerCloseFunc };