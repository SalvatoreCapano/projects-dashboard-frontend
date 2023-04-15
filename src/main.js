import { createApp } from 'vue'

import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faChevronDown, faArrowRightFromBracket, faChartLine, faHouse, faGear, faTableColumns, faDiagramProject, faAddressCard, faPeopleGroup, faGauge, faClockRotateLeft, faMagnifyingGlass, faPlus, faEye, faPen, faTrashCan, faChevronLeft, faFilePowerpoint, faCheck, faXmark, faExclamation, faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faArrowRightFromBracket, faChartLine, faHouse, faGear, faTableColumns, faDiagramProject, faAddressCard, faPeopleGroup, faGauge, faClockRotateLeft, faMagnifyingGlass, faPlus, faEye, faPen, faTrashCan, faChevronLeft, faFilePowerpoint, faCheck, faXmark, faExclamation, faCaretUp)

import App from './App.vue'

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')