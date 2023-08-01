import Services from '@/services/ShoopingService'
export default {
    namespaced: true,
    state: {        
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getProductList() {
            return new Services().fetchProductList()
        },
        orderProduct(ctx,data) {
            return new Services().orderProduct(data)
        },
        reStock(ctx, data) {
            return new Services().reStock(data) 
        }
    }
}