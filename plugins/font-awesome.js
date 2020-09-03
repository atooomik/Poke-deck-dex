import Vue from 'vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'

config.showMissingIcons = true

library.add(faSpinner)

Vue.component('fa-icon', FontAwesomeIcon)
