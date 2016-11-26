import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1321847c',
  },
  'push': {
    'sender_id': '11252016',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

import {Component} from '@angular/core';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component( ... )
export class MyPage {
  constructor(public push: Push) {
  ...
  }
}
