import Request from '@/helpers/BaseService'

class ShoopingService extends Request {
    fetchProductList() {
        return this.submit('get','Product')
    }
    reStock(data) {
        return this.submit('post','Product', data)
    }
    orderProduct(data) {
        return this.submit('post','OrderProducts',data)
    }

}

export default ShoopingService