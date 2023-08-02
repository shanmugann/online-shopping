import { createLocalVue, mount } from '@vue/test-utils'
import OrderForm from '@/project/order/order-form.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

// handle uncaught errors during component render function and watchers.
const errorHandler = (err, vm, info) => {
    expect(err).toBeInstanceOf(Error)
}

//Vue class for you to add components, mixins and install plugins without polluting the global Vue class.
const localVue = createLocalVue({
    errorHandler
})

localVue.use(BootstrapVue)
localVue.use(Vuelidate)

describe('Product Order Form Testing', () => {
    const wrapper = mount(OrderForm, {
        localVue
    })


    test('chect product class properties initial state is empty', () => {
        expect(wrapper.vm.product.name).toBe('')
        expect(wrapper.vm.product.quantity).toBe('')
    })

    test('chect Loader initial state is false', () => {
        expect(wrapper.vm.isLoading).toBe(false)
    })

    test('check product name value updating', async()=> {
        const textInput = wrapper.find('#productName')
        await textInput.setValue('shan')

        expect(wrapper.vm.product.name).toBe('shan')
    })

    test('check product quantity value updating', async()=> {
        const textInput = wrapper.find('#productQuantity')
        await textInput.setValue('8')

        expect(wrapper.vm.product.quantity).toBe('8')
    })

    test('check product name validation working', async()=> {
        expect(wrapper.vm.$v.product.name.$error).toBe(false)
        expect(wrapper.vm.$v.product.name.required).toBe(true)

        await wrapper.setData({ 
            product: {
                name: ''
            }
        })
        const clearButton = wrapper.find('#submit')

        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.name.$error).toBe(true)
        expect(wrapper.vm.$v.product.name.required).toBe(false)


        await wrapper.setData({ 
            product: {
                name: 'shan'
            }
        })

        expect(wrapper.vm.$v.product.name.$error).toBe(false)
        expect(wrapper.vm.$v.product.name.required).toBe(true)

    })


    test('check product quantity validation working', async()=> {
        expect(wrapper.vm.$v.product.quantity.$error).toBe(false)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)

        await wrapper.setData({ 
            product: {
                quantity: ''
            }
        })
        const clearButton = wrapper.find('#submit')

        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: 'a'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: '*'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: '8'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(false)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(true)

    })

    test('Check user allowed to submit form', async() => {
        await wrapper.setData({
            product: {
                name: 'shan',
                quantity: '8'
            }
        })
        const submitButton = wrapper.find('#submit')
        await submitButton.trigger('click')

        expect(wrapper.vm.$v.$invalid).toBe(false)
    })

    test('Empty the order form when click clear button', async () => {

        await wrapper.setData({
            product: {
                name: 'shan',
                quantity: '8'
            }
        })
        const clearButton = wrapper.find('button.clear')

        await clearButton.trigger('click')

        expect(wrapper.vm.product.name).toBe('')
        expect(wrapper.vm.product.quantity).toBe('')
    })

})
