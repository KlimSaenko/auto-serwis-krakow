<script setup lang="ts">
    import { ref, onMounted, watch, inject, type Ref } from 'vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
	import appointmentSender from '@/vue-helpers/appointmentSender';
    import { CountryProperty, type CountryData, findOne as findCountry, all as getAllCountries } from 'country-codes-list';
    import Translations from '@/vue-helpers/translations';
    import useClickOutside from '@/vue-helpers/useClickOutside';
	import { useI18n } from 'vue-i18n';

	const isModalOpened = inject<Ref<boolean>>('isAppointmentModalOpened') ?? ref(false);
    const closeAppointmentModal = inject<() => void>('closeAppointmentModal');
	const preDescription = inject<Ref<string>>('appointmentModalDescription');

    const isLocationSelectorOpen = ref(false);
    const currentLocation = ref<CountryData | null>(findCountry('countryCode' as CountryProperty, Translations.defaultLocale.region));
	const { locale } = useI18n();

	const form = {
		customerName: ref<string>(''),
		phoneCode: ref<string>(currentLocation.value?.countryCallingCode ?? ''),
		phone: ref<string>(''),
		vinNumber: ref<string>(''),
		licensePlate: ref<string>(''),
		description: ref<string | undefined>(preDescription?.value)
	};

	const processingForm = ref(false);
	const isFormSentModalSuccess = ref<boolean | undefined>();

	const customerNameValid = ref(true);
	const customerContactInfoValid = ref(true);
	
	watch(isModalOpened, opened => {
		if (opened){
			form.description.value = preDescription?.value;
			processingForm.value = false;
		}
	});

	watch(form.customerName, customerName => {
		if (!customerNameValid.value && customerName.trim()){
			customerNameValid.value = true;
		}
	});

    watch(form.phoneCode, code => form.phoneCode.value = code.replace(/\D/g, '').substring(0, 4));
    watch(form.phone, phone => {
		form.phone.value = phone.replace(/\D/g, '');
		if (!customerContactInfoValid.value && phone.trim()){
			customerContactInfoValid.value = true;
		}
	});

    const allCountries = getAllCountries().filter(value => value.region == 'Europe');

    const componentRef = ref();
    const excludeRef = ref();

    watch(currentLocation, curLoc => {
		if (curLoc?.countryCallingCode){
			form.phoneCode.value = curLoc.countryCallingCode;
		}
    });

    onMounted(async () => {
		const localeInfo = await Translations.getUserLocaleInfo();
		currentLocation.value = findCountry('countryCode' as CountryProperty, localeInfo.region);
    });

    useClickOutside(
		componentRef,
		closeCountrySelector,
		excludeRef
    );

    function closeCountrySelector(){
		isLocationSelectorOpen.value = false;

		if (currentLocation.value?.countryCallingCode == form.phoneCode.value)
			return;

		currentLocation.value = findCountry('countryCallingCode' as CountryProperty, form.phoneCode.value!);
    }

	function openFormSentModal(success: boolean){
		isFormSentModalSuccess.value = success;
		
		setTimeout(() => isFormSentModalSuccess.value = undefined, 7000);
    }

    async function handleSubmit(){
		if (processingForm.value === true){
			return;
		}

		if (!form.customerName.value.trim()){
			customerNameValid.value = false;
		}
		
		if (!form.phone.value.trim()){
			customerContactInfoValid.value = false;
		}

		if (!customerNameValid.value || !customerContactInfoValid.value){
			return;
		}

		processingForm.value = true;

		const senderInfo = {
			name: form.customerName.value,
			contactLinks: {
				tel: form.phoneCode.value + ' ' + form.phone.value
			},
			details: {
				vinNumber: form.vinNumber.value,
				licensePlate: form.licensePlate.value,
				description: form.description.value ?? '',
				time: new Date().toUTCString(),
				language: locale.value
			}
		};

		const result = await appointmentSender.SendMessage(senderInfo);

		if (result){
			openFormSentModal(true);
			clearAllFields();

			if (closeAppointmentModal){
				closeAppointmentModal();
			}
		}
		else {
            openFormSentModal(false);
        }
    }

	function clearAllFields() {
		form.customerName.value = '';
        form.phone.value = '';
        form.vinNumber.value = '';
        form.licensePlate.value = '';
        form.description.value = '';
	}
</script>

<style lang="css">
	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity .3s;
	}

	.modal-fade-enter-from,
	.modal-fade-leave-to {
		opacity: 0;
	}
</style>

<template>
	<Transition name="modal-fade" appear @after-leave="processingForm = false">
		<div v-show="isModalOpened" class="scrollbar fixed inset-0 w-full h-full md:p-6 m-0 bg-zinc-950/60 z-[900] flex overflow-x-hidden overflow-y-auto">
			<div class="m-auto md:w-[56rem] tracking-wide bg-white md:rounded-3xl shadow-xl shadow-black/40 font-jost text-zinc-500 relative overflow-x-hidden overflow-y-auto md:grid md:grid-cols-5">
				<div class="col-span-3 p-8 xl:p-10">
					<form @submit.prevent="handleSubmit">
						<h2 class="text-4xl text-zinc-800">{{ $t("modal.appointmentTitle") }}</h2>

						<i18n-t class="my-6" keypath="modal.appointmentDescription" scope="global" tag="p">
							<template #privacyPolicyLabel>
								<a href="" target="_blank" class="md:hover:underline cursor-pointer text-blue-600/80 lowercase">{{ $t('modal.privacyPolicyLabel') }}</a>  
							</template>
						</i18n-t>

						<div class="my-6">
							<label for="customerName" class="block mb-2">{{ $t("modal.customerNameLabel") }}<span class="text-[red] font-jost-medium select-none"> *</span></label>
							<div class="relative">
								<input id="customerName" type="text" v-model="form.customerName.value" :aria-validate="customerNameValid" class="bg-gray-50 border tracking-wide aria-[validate='false']:border-[red] border-gray-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 p-2" :placeholder="$t('modal.customerNameFieldPlaceholder')">
							</div>
						</div>

						<div class="my-6">
							<label for="phone" class="block mb-2">{{ $t("modal.customerNumberLabel") }}<span class="text-[red] font-jost-medium select-none"> *</span></label>
							<div class="flex relative">
								<div ref="componentRef" @focusin="isLocationSelectorOpen = true" @click="isLocationSelectorOpen = true" class="relative flex font-jost items-center cursor-pointer pl-10 pr-6 font-medium text-center bg-gray-100 text-gray-700 border border-gray-300 rounded-s-lg md:hover:bg-gray-200 active:bg-gray-200">
									<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
										<span :class="currentLocation ? `fi-${ currentLocation.countryCode.toLowerCase() }` : ''" class="fi bg-white h-4 !w-4 !bg-cover rounded-full ring-1 ring-zinc-800/10"></span>
									</div>
									
									<span>+</span>
									<input id="phoneCode" type="tel" :size="form.phoneCode.value.length" v-model="form.phoneCode.value" autocomplete="tel-country-code" maxlength="4" class="tracking-wide cursor-text shadow-none ring-0 border-0 outline-none bg-transparent" />
									
									<div class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
										<svg class="w-2.5 h-2.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
									</div>
								</div>

								<div v-if="isLocationSelectorOpen" ref="excludeRef" class="absolute font-jost max-h-52 left-0 top-full overflow-y-auto z-10 mt-1 text-[0.9rem] w-max rounded-md shadow-md bg-white ring-1 ring-zinc-800 ring-opacity-5 p-1 space-y-1">
									<ul class="grid grid-flow-row gap-1">
										<li v-for="loc of allCountries.filter(value => value.countryCallingCode.startsWith(form.phoneCode.value ?? ''))" @click="currentLocation = loc" :aria-checked="currentLocation?.countryCode == loc.countryCode" class="flex items-center tracking-wide px-3 py-2 align-baseline text-gray-700 aria-checked:bg-zinc-200/60 aria-checked:text-zinc-800 md:hover:bg-zinc-200/60 md:hover:text-zinc-800 active:bg-zinc-200/60 active:text-zinc-800 cursor-pointer rounded-md">
											<span :class="`fi-${ loc.countryCode.toLowerCase() }`" class="fi !bg-cover bg-white rounded-full h-4 !w-4 mr-3 ring-1 ring-zinc-800/10"></span>
											<span>{{ `${loc.countryNameLocal} (+${loc.countryCallingCode})` }}</span>
										</li>
									</ul>
								</div>

								<div class="relative w-full">
									<input id="phone" type="tel" v-model="form.phone.value" maxlength="12" autocomplete="tel tel-national" :aria-validate="customerContactInfoValid" class="block tracking-wide p-2 pr-3 w-full text-zinc-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 aria-[validate='false']:border-[red]" placeholder="123-456-7890" />
								</div>
							</div>
						</div>

						<div class="my-6">
							<label for="vinNumber" class="block mb-2">{{ $t("modal.vinNumberLabel") }}</label>
							<div class="relative group">
								<input id="vinNumber" type="text" v-model="form.vinNumber.value" class="bg-gray-50 border tracking-wide aria-[validate='false']:border-[red] border-gray-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 p-2" placeholder="1HGEM21991L005461">

								<div class="tooltip-top absolute flex top-full opacity-0 left-0 right-0 z-10 max-md:hidden invisible md:group-focus-within:visible md:group-focus-within:opacity-100 duration-200 md:group-focus-within:delay-500 font-jost">
									<p class="flex rounded-md bg-zinc-700 text-gray-200 px-2 py-1 pl-3 max-w-72 mx-auto leading-6">
										{{ $t('modal.vinNumberFieldTooltip') }}
									</p>
								</div>
							</div>
						</div>
						
						<div class="my-6">
							<label for="licensePlate" class="block mb-2">{{ $t("modal.licensePlateLabel") }}</label>
							<div class="relative group">
								<input id="licensePlate" type="text" v-model="form.licensePlate.value" class="bg-gray-50 border tracking-wide aria-[validate='false']:border-[red] border-gray-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 p-2" placeholder="KR 12345">

								<div class="tooltip-top absolute flex top-full opacity-0 left-0 right-0 z-10 max-md:hidden invisible md:group-focus-within:visible md:group-focus-within:opacity-100 duration-200 md:group-focus-within:delay-500 font-jost">
									<p class="flex rounded-md bg-zinc-700 text-gray-200 px-2 py-1 pl-3 max-w-72 mx-auto leading-6">
										{{ $t('modal.licensePlateFieldTooltip') }}
									</p>
								</div>
							</div>
						</div>

						<div class="my-6">
							<label for="problemDescription" class="block mb-2">{{ $t("modal.customerMessageLabel") }}</label>
							<textarea id="problemDescription" rows="4" v-model="form.description.value" class="block tracking-wide px-3 py-2 w-full text-zinc-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="$t('modal.customerMessageFieldPlaceholder')"></textarea>
						</div>

						<div class="mt-7 flex items-end">
							<button type="submit" class="relative tracking-wider text-gray-100 md:hover:text-[red] active:text-[red] bg-[red] border border-[red] md:hover:bg-white active:bg-white font-jost-medium py-2 px-3 md:px-4 h-min rounded-lg inline-flex items-center duration-150">
								<span :aria-hidden="processingForm" class="whitespace-nowrap aria-hidden:invisible">{{ $t("header.onlineAppointment") }}</span>

								<div v-if="processingForm" class="flex w-full p-12 justify-center">
									<svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
										<path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
									</svg>
									<span class="sr-only">Loading...</span>
								</div>
							</button>

							<p class="ms-5 -mb-1 text-[red] font-jost leading-5 text-[0.95rem]">
								<span v-if="!customerNameValid">{{ $t('modal.customerNameMissingError')}}&nbsp;</span>
								<span v-if="!customerContactInfoValid"> {{ $t('modal.customerContactInfoMissingError') }}</span>
							</p>
						</div>
					</form>
				</div>

				<div class="col-span-2 bg-gray-200 flex flex-col">
					<div class="relative px-8 md:px-5 lg:px-7 py-10 pb-0">
						<h2 class="text-4xl text-zinc-800">{{ $t("modal.contactsTitle") }}</h2>

						<p class="my-6">
							{{ $t('modal.contactsDescription') }}
						</p>

						<ul class="my-6">
							<li class="mt-6 flex items-center">
								<svg class="mr-3 min-w-5 text-zinc-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
									<g transform="scale(2.6 2.6)" >
										<path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
									</g>
								</svg>
								<span>{{ getConfigConst('corporateInfo.addressFull') }}</span>
							</li>

							<li class="mt-6 flex items-center">
								<svg class="mr-3 min-w-5 text-zinc-700" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="m17.4 22a15.42 15.42 0 0 1 -15.4-15.4 4.6 4.6 0 0 1 4.6-4.6 3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1 -.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76 4.6 4.6 0 0 1 -4.64 4.53z"/>
								</svg>
								<span>{{ getConfigConst('corporateInfo.contactNumber') }}</span>
							</li>

							<li class="mt-6 flex items-center">
								<svg class="mr-3 min-w-5 text-zinc-700" height="20" width="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"/>
								</svg>
								<span>{{ getConfigConst("corporateInfo.telegramTag") }}</span>
							</li>

							<li class="mt-6 flex items-center">
								<svg class="mr-3 min-w-5 text-zinc-700" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
									<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
									<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
								</svg>
								<span>{{ getConfigConst('corporateInfo.email') }}</span>
							</li>
						</ul>
					</div>

					<div class="flex mt-auto aspect-square max-md:-mb-40 justify-center bg-red-car-top bg-bottom bg-[length:100%] max-md:bg-[length:120%] bg-no-repeat">
						<div class="flex self-end max-w-[90%] md:max-w-[70%] max-md:mb-40">
							<span class="block my-4 text-sm text-white text-center">© 2024 Front Auto. {{ $t('footer.allRightsReserved') }}.</span>
						</div>
					</div>
				</div>

				<button @click="closeAppointmentModal" class="fixed md:absolute right-6 top-6 w-12 h-12 p-2 text-gray-500 md:hover:text-gray-900 md:hover:bg-zinc-300 active:text-gray-900 active:bg-zinc-300 rounded-full max-md:bg-white/85 ">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 96 96">
						<path d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z" />
					</svg>
				</button>
			</div>
		</div>
	</Transition>

	<Transition name="modal-fade" appear>
		<div v-if="isFormSentModalSuccess !== undefined" class="fixed right-7 bottom-7 max-sm:right-5 max-sm:left-5 z-[901] p-5 pr-9 sm:max-w-80 bg-white overflow-hidden rounded-lg shadow-lg shadow-black/15 border">
			<div class="flex items-center">
				<svg v-if="isFormSentModalSuccess" class="w-9 h-9 me-4 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>

				<svg v-else class="w-9 h-9 me-4 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"/>
				</svg>

				<p class="font-jost text-zinc-800">{{ $t(isFormSentModalSuccess ? 'modal.apointmentSentMessageSuccess' : 'modal.apointmentSentMessageFault') }}</p>
			</div>
			
			<button @click="isFormSentModalSuccess = undefined" class="absolute right-1.5 top-1.5 w-6 h-6 p-1 text-gray-500 md:hover:text-gray-900 active:text-gray-900">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 96 96">
					<path d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z" />
				</svg>
			</button>
		</div>
	</Transition>
</template>