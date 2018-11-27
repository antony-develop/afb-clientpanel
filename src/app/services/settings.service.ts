import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  };

  constructor() { 
    const storageSettings = localStorage.getItem('settings');
    if (storageSettings != null) {
      this.settings = JSON.parse(storageSettings);
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  setSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
