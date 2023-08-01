<template>
    <div>
        <div class="d-flex flex-wrap justify-content-between mr-3 ml-3 mt-4">
            <div v-for="(item, index) in showProductList" :key=index>
                <card @buyProduct="orderProduct" :num="imgOrder + index" :productDetails="item"></card>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <b-pagination @input="linkGen" v-model="pageNumber" :total-rows="productList.length" :per-page="pageSize"
                aria-controls="my-table"></b-pagination>
        </div>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" color="#0069d9"></loading>

    </div>
</template>

<script>

const Card = () => import("@/components/product/card.vue")
const Loading = () => import('vue-loading-overlay')

export default {
    data() {
        return {
            productList: [],
            showProductList: [],
            pageSize: 10,
            pageNumber: 1,
            isLoading: false,
            imgOrder: 10,
            min: 1,
            max: 8
        }
    },
    components: {
        Card,
        Loading
    },
    methods: {
        orderProduct(product) {
            let tmpProduct = {
                orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                productId: product.productId,
                quantity: product.selectedQuantity,
                customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

            }
            this.isLoading = true



            this.$store.dispatch('shopping/orderProduct', tmpProduct)
                .then(() => {
                    this.isLoading = false
                    this.getProducts()
                    this.$bvToast.toast(`${product.productName || ''} purchased successfully`, {
                        title: 'Success',
                        toaster: 'b-toaster-top-center',
                        variant: 'success',
                        solid: true
                    })
                })
                .catch(() => {
                    this.isLoading = false
                })
            if (product.selectedQuantity == product.availableQuantity) {
                this.imgOrder = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            }
        },
        getProducts() {
            this.isLoading = true
            this.$store.dispatch('shopping/getProductList')
                .then(res => {
                    this.isLoading = false
                    this.productList = []

                    this.productList = res.data.filter(s => s.availableQuantity > 0)

                    this.showProductList = this.productList.slice(((this.pageSize * this.pageNumber) - 10), this.pageSize * this.pageNumber)
                })
                .catch(() => {
                    this.isLoading = false
                })
        },
        linkGen(pageNum) {
            this.pageNumber = pageNum
            this.showProductList = this.productList.slice(((this.pageSize * this.pageNumber) - 10), this.pageSize * this.pageNumber)

        }
    },
    created() {
        this.getProducts()
    }
}
</script>

