import { defineAsyncComponent } from 'vue'

const loaders = {
  modal: () => import('../components/Modal.vue'),
  slideover: () => import('../components/Slideover.vue'),
  drawer: () => import('../components/Drawer.vue')
}

/**
 * Modal, Slideover and Drawer as async components, so a menu overlay is only fetched once it is first opened.
 */
export const lazyOverlays = {
  modal: defineAsyncComponent(loaders.modal),
  slideover: defineAsyncComponent(loaders.slideover),
  drawer: defineAsyncComponent(loaders.drawer)
}

/**
 * Loads the overlay component's chunk ahead of time, e.g. from an idle callback.
 */
export function loadOverlay(name: keyof typeof loaders) {
  return loaders[name]()
}
