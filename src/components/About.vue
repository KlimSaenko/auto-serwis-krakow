<template>
    <div class="mt-5 mb-20 md:grid grid-cols-3 gap-5 lg:gap-8 text-zinc-800">
        <div class="col-span-1 max-md:hidden">
            <img src="https://assets-global.website-files.com/6441814048adf88d2aedeba0/64495d69b3de818529e74208_image-right-p-500.jpg" class="object-cover rounded-lg" />
        </div>
        <div class="pl-3 col-span-2 text-xl font-jost-light leading-8">
            <h1 class="text-5xl mb-12 md:mb-9 font-jost-bold max-md:flex justify-center max-md:text-center">{{ $t('home.aboutTitle') }}</h1>

            <p>{{ $t('home.aboutContent_1') }}</p>
            <ul class="my-4">
                <li v-for="content in $tm('home.aboutAdvantages')" class="flex items-start py-2">
                    <img src="/public/icons/verified-badge.svg" width="24" height="24" class="m-1" />
                    <p class="ml-3">
                        {{ content }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>