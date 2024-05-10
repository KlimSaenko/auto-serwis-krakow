<template>
    <div class="overflow-hidden">
        <ScrollParallax :speed="0.5">
            <div class="bg-cover bg-center bg-service-banner w-screen h-[24rem] md:h-[30rem] lg:h-[36rem] 2xl:h-[42rem] min-h-80 md:min-h-96">
                <div class="flex h-full items-center text-white">
                    <div class="flex w-full justify-center">
                        <div class="relative bottom-6 max-md:max-w-96 md:bottom-16 text-reveal">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl leading-[3rem] relative pl-10 pr-12 py-6 font-jost-bold bg-zinc-950/55 sm:animate-text-reveal">{{ $t('home.mainBannerTitle') }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollParallax>
    </div>
</template>