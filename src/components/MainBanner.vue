<template>
    <div class="overflow-hidden w-full">
        <ScrollParallax :speed="0.5" class="bg-service-banner bg-cover bg-center aspect-square sm:aspect-[8/5] md:aspect-[8/3] min-h-80 md:min-h-96">
            <div class="flex h-full justify-center items-center">
                <div class="text-gray-100 text-center pb-[8em] lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg">
                    <h1 class="text-6xl sm:text-7xl 2xl:text-8xl font-jost-medium [text-shadow:_0_0_10px_rgb(0_0_0_/_25%)]"><span class="text-[red]">Front</span> Auto</h1>
                    <div class="mt-8 rounded-full bg-white shadow-md shadow-black/50 [shadow] px-5 sm:px-6 md:px-7 py-1.5 sm:py-2 text-zinc-700">
                        <p class="text-lg sm:text-xl 2xl:text-2xl font-jost">{{ $t('home.mainBannerTitle') }}</p>
                    </div>
                </div>
            </div>
        </ScrollParallax>
    </div>
</template>