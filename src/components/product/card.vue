<template>
    <b-card :img-src="`https://picsum.photos/600/300/?image=${num}`" img-alt="Image" img-top tag="article"
        style="max-width: 20rem;" class="mb-2">
        <b-card-text>
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <span class="text-primary">Product Name </span>
                    <span>
                        {{ productDetails.productName }} {{ num }}
                    </span>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="text-primary">In Stock </span>
                    <span> {{ productDetails.availableQuantity }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="text-primary">Quantity</span>
                    <div v-if="productDetails.availableQuantity > 0">
                        <select v-model="selectedQuantity" name="quantity" id="carquantitys">
                            <option v-for="(item, index) in productDetails.availableQuantity" :key="index" :value="item">{{
                                item }}</option>
                        </select>
                    </div>
                    <div v-else>
                        <input type="number" v-model="selectedQuantity" id="quantity" name="quantity" min="1">
                        <span v-if="$v.selectedQuantity.$error && !$v.selectedQuantity.required"> This field required</span>
                        <span
                            v-if="$v.selectedQuantity.$error && $v.selectedQuantity.required && !$v.selectedQuantity.numeric">Enter
                            valid value</span>
                    </div>
                </div>
            </div>
        </b-card-text>
        <div>
            <b-button class="col-md-12"  v-if="productDetails.availableQuantity > 0" @click="buyProduct" variant="dark">Buy</b-button>
            <b-button class="col-md-12" v-if="productDetails.availableQuantity == 0" @click="orderProduct" variant="dark">Order</b-button>
        </div>
        <img lazy v-show="productDetails.availableQuantity == 0" class="out-of-stock" src="../../../static/img/out_of_stock.png" alt="out of stock"/>
    </b-card>
</template>

<script>
const { required, numeric } = require('vuelidate/lib/validators')

export default {
    data() {
        return {
            quanityList: [],
            selectedQuantity: 1,
            isLoading: false,
            number: 2
        }
    },
    props: ['productDetails', 'num'],
    validations: {
        selectedQuantity: {
            required,
            numeric
        }
    },
    methods: {
        buyProduct() {
            let tmpProd = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('buyProduct', tmpProd)
        },
        orderProduct() {
            this.$v.selectedQuantity.$touch()
            if (this.$v.selectedQuantity.$invalid) {
                return false
            }
            let tmpProd = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('orderProduct', tmpProd)
        }
    }
}

</script>