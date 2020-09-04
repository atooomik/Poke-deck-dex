import Vue from 'vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'

config.showMissingIcons = true

library.add(faSpinner, faTimesCircle)

Vue.component('fa-icon', FontAwesomeIcon)
