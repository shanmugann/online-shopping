<template>
    <div class="container mt-5">
        <div class="title">
            <h2>Product Order</h2>
        </div>
        <div class="content">
            <b-form @submit.stop.prevent>
                <b-form-group label-class="mr-0 cls-required" class="col-md-10" id="input-group-1" label="Product Name" label-for="productName">
                    <b-form-input id="productName" v-model="product.name"  type="text" placeholder="Enter product name"
                        required></b-form-input>
                    <span id="span1" v-if="$v.product.name.$error && !$v.product.name.required" class="text-danger">Please enter product name</span>
                </b-form-group>
                <b-form-group label-class="mr-0 cls-required" class="col-md-10" id="input-group-1" label="Quantity" label-for="productQuantity">
                    <b-form-input id="productQuantity" v-model="product.quantity" type="text" placeholder="Enter Quantity"
                        required></b-form-input>
                    <span v-if="$v.product.quantity.$error && !$v.product.quantity.required" class="text-danger">Please enter Quantity</span>
                    <span v-if="$v.product.quantity.$error && $v.product.quantity.required && !$v.product.quantity.numeric" class="text-danger">Only numbers are permitted.</span>
                </b-form-group>
                <div class="d-flex ml-3">
                    <b-button id="submit" class="mr-3" @click="onSubmit" variant="dark">Submit</b-button>
                    <b-button id="clear" class="clear" @click="clearFormData">Clear</b-button>
                </div>
            </b-form>
        </div>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" color="#0069d9"></loading>

    </div>
</template>

<script>

const { required, numeric } = require('vuelidate/lib/validators')
const Loading = () => import('vue-loading-overlay')


export default {
    data() {
        return {
            product: {
                name: '',
                quantity: ''
            },
            isLoading: false
        }
    },
    components: {
        Loading
    },
    validations: {
        product: {
            name: {
                required
            },
            quantity: {
                required,
                numeric
            }            
        }
    },
    methods: {
        onSubmit() {
            this.$v.product.$touch()
            if(this.$v.product.$invalid) {
                return false
            }
            let data = {
                productName: this.product.name,
                availableQuantity: parseInt(this.product.quantity)
            }
            this.isLoading = true
            this.$store.dispatch('shopping/reStock', data)
            .then(() => {
                this.isLoading = false

                this.$bvToast.toast(`${this.product.name || ''} ordered successfully`, {
                    title: 'Success',
                    toaster: 'b-toaster-top-center',   
                    variant: 'success',
                    solid: true
                })
                this.clearFormData()
                this.$v.product.$reset()
            })
            .catch(() => {
                this.isLoading = false
            })
        },
        clearFormData() {
            this.product.name = ''
            this.product.quantity = ''
        }
    }
}

</script>