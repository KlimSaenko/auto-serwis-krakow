<template>
    <div class="overflow-hidden">
        <ScrollParallax :speed="0.5">
            <div class="bg-cover bg-center bg-service-banner w-screen h-[24rem] md:h-[30rem] lg:h-[36rem] 2xl:h-[42rem] min-h-80 md:min-h-96">
                <div class="flex h-full justify-center items-center">
                    <div class="text-gray-100 text-center pb-[8em] lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg [text-shadow:_0_0_10px_rgb(0_0_0_/_25%)]">
                        <h1 class="my-5 text-5xl md:text-7xl 2xl:text-7xl font-jost-medium">Front Auto</h1>
                        <p class="my-3 text-2xl font-jost-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo magni porro nobis amet repellat vero cumque, architecto blanditiis?</p>
                    </div>
                </div>

                <!-- <div class="flex h-full items-center bg-gradient-to-r from-zinc-900/70 from-15% to-zinc-700/0 to-90% sm:to-70% md:to-40%">
                    <h1 class="pl-8 sm:pl-12 md:pl-14 lg:pl-16 2xl:pl-20 pb-16 2xl:pb-18 uppercase leading-[1.1] md:leading-[1.15] 2xl:leading-[1.2] tracking-wide md:tracking-wider 2xl:tracking-wider text-5xl md:text-7xl 2xl:text-7xl font-jost-medium text-gray-100 w-[22rem] md:w-[34rem] 2xl:w-[42rem]">
                        <p>Лучший Сервис</p>
                        <p class="bg-red-600 mt-1 -ml-3 pl-3 md:-ml-4 md:pl-4 md:p-1">в Кракове</p>
                    </h1>
                </div> -->

                <!-- <div class="flex h-full items-center text-white">
                    <div class="flex w-full justify-center">
                        <div class="relative bottom-6 max-md:max-w-96 md:bottom-16 text-reveal">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl leading-[3rem] relative pl-10 pr-12 py-6 font-jost-bold bg-zinc-950/55 sm:animate-text-reveal">{{ $t('home.mainBannerTitle') }}</h1>
                        </div>
                    </div>
                </div> -->
            </div>
        </ScrollParallax>
    </div>
</template>