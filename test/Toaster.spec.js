import Toaster from '../src/Toaster.vue'
import Installer from '../src/main.js'
import emitter from '../src/emitter'
import sinon from 'sinon'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('Toaster.vue', () => {
  it('is an Object', () => {
    expect(typeof Toaster).toBe('object')
  })

  it('responds to events and add new toast', (done) => {
    const localVue = createLocalVue()
    localVue.use(Installer)
    const spy = sinon.spy(Toaster.methods, 'addToast')
    const spy2 = sinon.spy(Toaster.methods, 'closeToast')
    const wrapper = shallowMount(Toaster, {
      localVue
    })
    emitter.emit('addToast', {
      type: 'error',
      title: 'Error',
      message: 'Item could not be added'
    })
    expect(spy.called).toBe(true)
    expect(wrapper.vm.toasts.length).toBe(1)
    setTimeout(() => {
      expect(spy2.called).toBe(true)
      expect(wrapper.vm.toasts.length).toBe(0)
      done()
    }, 4000)
  })

  it('removes eventListener on page destroy', () => {
    const localVue = createLocalVue()
    localVue.use(Installer)
    const spy = sinon.spy(emitter, 'removeListener')
    const wrapper = shallowMount(Toaster, {
      localVue
    })
    wrapper.destroy()
    expect(spy.called).toBe(true)
  })
})
