<template>
    <div class="overflow-hidden">
        <ScrollParallax speed=0.5>
            <div class="bg-cover bg-center bg-service-banner w-screen md:h-[30rem] lg:h-[36rem] 2xl:h-[42rem] min-h-80">
                <div class="flex h-full items-center text-white mx-auto md:max-w-screen-md lg:max-w-screen-lg">
                    <div class="flex w-full justify-center">
                        <div class="relative bottom-16 text-reveal">
                            <h1 class="text-7xl w-max relative pl-7 pr-9 py-4 font-jost-bold bg-zinc-950/50 animate-text-reveal">{{ $t('home.mainBannerTitle') }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollParallax>
    </div>
</template>