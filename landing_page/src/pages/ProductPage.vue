<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import _ from 'lodash';

import { fetchSneakerDetail, fetchSneakerDetailQueryKey} from '@/services/product_service';
import { useRootStore } from '@/stores/root_store';
import { SneakerVariation, SneakerVariationLibrary } from '@/types/sneaker';
import { computeAvailableVariationLibrary, formatPrice, getSelectedVariation } from '@/utils/sneaker_util';
import { className } from '@/utils/template_utils';
import { toast } from 'vue3-toastify';
import { useCartStore } from '@/stores/cart_store';

const myRoute = useRoute();
const router = useRouter();
const rootStore = useRootStore();
const cartStore = useCartStore();
const {name: deviceName} = useDisplay();
const { slug } = myRoute.params as {
    slug:string
};

const selectedImage = ref<string>();
const color = ref<string | undefined>();
const size = ref<string | undefined>();

const {data} = useQuery({
    queryKey: [fetchSneakerDetailQueryKey, slug] as const,
    queryFn: () => {
        return fetchSneakerDetail(slug);
    },
});


const variationLibrary = computed<SneakerVariationLibrary>(() => {
    if(!data || !data.value) return {
        colors: {},
        images: {},
        sizes: {},
    }

    return data.value.variationLibrary;
})



/**
 * The variations remaining when the customer has selected color or size on the SneakerCard
 */
const variations = computed<SneakerVariation[]>(() => {
    if(!data || !data.value) return [];
    const colorValue = color.value;
    const sizeValue = size.value;
    const dataValue = data.value;

    if (colorValue === undefined && sizeValue === undefined) {
        return dataValue.variations;
    }

    return dataValue.variations.filter((item) => {
        let result = true;
        if (colorValue !== undefined && colorValue !== item.color) {
            result = false;
        }

        if (sizeValue !== undefined && sizeValue !== item.size) {
            result = false;
        }
        return result;
    });
});

const availableVariationLibrary = computed<SneakerVariationLibrary>(() => {
    return computeAvailableVariationLibrary(variations.value, variationLibrary.value);
});

const price = computed<string>(() => {
    const variationValue = variations.value;
    
    if(variationValue.length === 0) return formatPrice(0);

    let min = variationValue[0].price;
    let max = min;

    for (const { price } of variationValue) {
        if (min > price) min = price;
        if (max < price) max = price;
    }

    // case have only one price
    if(min === max) return formatPrice(min);

    return `${formatPrice(min)} - ${formatPrice(max)}`;
});

const images = computed<[string, string][]>(() => {
    if(!data || !data.value) return [];

    return Object.entries(data.value.variationLibrary.images);
});

const colors = computed<{
    colorKey:string;
    colorValue:string;
    available: boolean;
}[]>(() => {
    const availableColor = Object.keys(availableVariationLibrary.value.colors);
    return Object.entries(variationLibrary.value.colors).map(([colorKey, colorValue]) => {
        return {colorKey, colorValue, available: availableColor.includes(colorKey)};
    });
});

 const sizes = computed<{
    sizeKey:string;
    sizeValue:string;
    available: boolean;
}[]>(() => {
    const availableSizes = Object.keys(availableVariationLibrary.value.sizes);
    return Object.entries(variationLibrary.value.sizes).map(([sizeKey, sizeValue]) => {
        return {sizeKey, sizeValue, available: availableSizes.includes(sizeKey)};
    });
});

const canBuy = computed<boolean>(() => {
    // if the customer haven't selected color and size yet.
    if(!color.value || !size.value) return false;

    // else
    return true;
});

const addToCart = async ():Promise<boolean> => {
    if(!data || !data.value) {
        toast.warning('There was an unknown error while adding to cart');
        return false;
    }
    const dataValue = data.value;
    const selectedVariation = getSelectedVariation(color.value, size.value, dataValue.variations);

    // If the customer has not selected the color and size yet. 
    if(!selectedVariation) {
        toast.warning('You need to select the color and size first !');
        return false;
    }

    

    // If ok //
    await cartStore.add(data.value.id, selectedVariation.id);
    const selectedColorName = dataValue.variationLibrary.colors[selectedVariation.color];
    const selectedSizeName = dataValue.variationLibrary.sizes[selectedVariation.size];
    toast.success(`Added ${selectedColorName} ${dataValue.name} size ${selectedSizeName} to cart`);

    return true;
}

const handleColorChange = (colorKey:string, selectCallbackFn:(v:boolean)=>any) => {
    if(color.value === colorKey){
        color.value = undefined;
        selectCallbackFn(false);
        return;
    }
    color.value = colorKey;
    selectCallbackFn(true);
}

const handleSizeChange = (sizeKey:string, selectCallbackFn:(v:boolean)=>any) => {
    if(size.value === sizeKey){
        size.value = undefined;
        selectCallbackFn(false);
        return;
    }
    size.value = sizeKey;
    selectCallbackFn(true);
}

const handleAddToCartClick = async () => {
    await addToCart();
}

const handleBuyNowClick = async () => {
    await addToCart();
    router.push('/cart');
}

// update image when the customer has selected the size or the color.
watch(() => {
    const uniqueImages = _.uniq(variations.value.map(v => v.image));
    if(uniqueImages.length === 1){
        return uniqueImages[0];
    }
    return undefined;
}, (v) =>{
    if(!v) return;
    selectedImage.value = v;
});


watch(data, (v) => {
    if(!v) return;
    selectedImage.value = v.variations[0].image;
});


const {} = myRoute.query;
</script>

<template>
    <v-container>
        <v-row>
            <v-col v-if="rootStore.isMobile" cols="12">
                <v-sheet elevation="1" color="surface" rounded="lg" class="py-5">
                    <h1 class="text-center text-h4 text-lg-left text-md-h3 ">{{ data?.name }}</h1>
                </v-sheet>
            </v-col>
            <v-col cols="12">
                <v-sheet elevation="1" color="surface" rounded="lg" class="pa-2">
                    <v-row>
                        <!-- * carousel -->
                        <v-col cols="12" lg="5">
                            <v-carousel
                                hide-delimiter-background
                                circle
                                continuous
                                width="100%"
                                :touch="rootStore.isMobile"
                                v-model:model-value="selectedImage"
                                :show-arrows="!rootStore.isMobile"
                                color="secondary"
                            >
                                <template v-slot:prev="{ props }">
                                    <v-btn
                                        variant="text"
                                        color="secondary"
                                        icon="mdi:mdi-chevron-left"
                                        rounded="lg"
                                        @click="props.onClick"
                                    />
                                </template>
        
                                <template v-slot:next="{ props }">
                                    <v-btn
                                        variant="text"
                                        color="secondary"
                                        icon="mdi:mdi-chevron-right"
                                        rounded="lg"
                                        @click="props.onClick"
                                    />
                                </template>
        
                                <v-carousel-item 
                                    v-for="([key, image]) of images" 
                                    :key="key"
                                    :src="image"
                                    aspect-ratio="1/1"
                                    :value="key"
                                    :alt="data?.name||''"
                                />
                            </v-carousel>
                        </v-col>

                        <!-- product info -->
                        <v-col cols="12" lg="7">
                            <v-row>
                                <!-- title -->
                                <v-col v-if="!rootStore.isMobile" cols="12">
                                    <h1 class="text-h3">{{ data?.name }}</h1>
                                </v-col>

                                <!-- price -->
                                <v-col cols="12" class="my-1">
                                    <div 
                                        :class="className('price rounded-lg text-h6 text-sm-h5 text-md-h4 text-center text-lg-left color-deep-orange', style['price'])">
                                        {{ price }}
                                    </div>
                                </v-col>

                                <!-- size and color -->
                                <v-col cols="12" class="my-5">
                                    <!-- size -->
                                    <v-row>
                                        <v-col v-if="deviceName!=='xs'" cols="2">
                                            <div class="text-h6">Size</div>
                                        </v-col>
                                        <v-col>
                                            <v-slide-group show-arrows color="secondary" center-active>
                                                <v-slide-group-item 
                                                    v-for="({sizeKey, sizeValue, available}, index) of sizes"
                                                    :key="`${index}-${sizeKey}`"
                                                    v-slot:default="{isSelected, select}"
                                                >
                                                    <v-btn 
                                                        :variant="available?'flat':'outlined'"
                                                        :color="isSelected?'primary':'secondary'"
                                                        :disabled="!available"
                                                        class="mx-2"
                                                        @click="if(available) handleSizeChange(sizeKey, select);"
                                                    >
                                                        {{ sizeValue }}
                                                    </v-btn>
                                                </v-slide-group-item>
                                            </v-slide-group>
                                        </v-col>
                                    </v-row>

                                    <!-- * colors -->
                                    <v-row>
                                        <v-col v-if="deviceName!=='xs'" cols="2">
                                            <div class="text-h6">Color</div>
                                        </v-col>
                                        <v-col>
                                            <v-slide-group show-arrows center-active>
                                                <v-slide-group-item 
                                                    v-for="({colorKey, colorValue, available}, index) of colors"
                                                    :key="`${index}-${colorKey}`"
                                                    v-slot:default="{select, isSelected}"
                                                >
                                                    <v-btn 
                                                        :variant="available?(isSelected?'elevated':'flat'):'outlined'"
                                                        :color="colorValue"
                                                        :disabled="!available"
                                                        class="ma-2"
                                                        rounded="pill"
                                                        @click="if(available) handleColorChange(colorKey, select);"
                                                    >
                                                        {{ colorValue }}
                                                    </v-btn>
                                                </v-slide-group-item>
                                            </v-slide-group>
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <!-- buttons -->
                                <v-col cols="12" class="my-5">
                                    <v-row justify="space-around">
                                        <!-- buy now -->
                                        <v-col cols="6" md="5" lg="5" xl="4">
                                            <v-btn 
                                                variant="flat"
                                                color="secondary"
                                                width="100%"
                                                height="50px"
                                                :disabled="!canBuy"
                                                @click="handleBuyNowClick"
                                            >
                                                Buy Now
                                            </v-btn>
                                        </v-col>

                                        <!-- add to cart -->
                                        <v-col cols="6" md="5" lg="5" xl="4">
                                            <v-btn 
                                                variant="outlined"
                                                color="secondary"
                                                width="100%"
                                                height="50px"
                                                :disabled="!canBuy"
                                                @click="handleAddToCartClick"
                                            >
                                                Add To Cart
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>


            <v-col cols="12">
                <v-sheet
                    elevation="1"
                    rounded="lg"
                    class="pa-2 text-body-1 bg-surface"
                    style="text-align: justify;"
                >
                    <h2 class="text-h4">Description</h2>
                    <article 
                        :class="style['article']" 
                        v-html="data?.description"
                    ></article>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" module="style">

.article{
    p {
        margin: 10px 0px;
    }
}

.price{
    display: block;

    width: 100%;
    height: fit-content;
    
    padding: 20px;

    color: orangered !important;
    font-weight: 700 !important;

    background-color: rgba(var(--v-theme-secondary), 0.05);
}
</style>
