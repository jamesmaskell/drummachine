import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Drumpads } from './drumpads';

@Injectable({
  providedIn: 'root',
})
export class DrummachineService {
  private drumpads: Drumpads[] = [
    {
      Key: 'Q',
      Source: '../assets/Heater-1.mp3',
      Description: 'Heater 1',
    },
    {
      Key: 'W',
      Source: '../assets/Heater-2.mp3',
      Description: 'Heater 2',
    },
    {
      Key: 'E',
      Source: '../assets/Heater-3.mp3',
      Description: 'Heater 3',
    },
    {
      Key: 'A',
      Source: '../assets/Heater-4_1.mp3',
      Description: 'Header 4',
    },
    {
      Key: 'S',
      Source: '../assets/Heater-6.mp3',
      Description: 'Clap',
    },
    {
      Key: 'D',
      Source: '../assets/Dsc_Oh.mp3',
      Description: 'Open HH',
    },
    {
      Key: 'Z',
      Source: '../assets/Kick_n_Hat.mp3',
      Description: "Kick n' hat",
    },
    {
      Key: 'X',
      Source: '../assets/RP4_KICK_1.mp3',
      Description: 'Kick',
    },
    {
      Key: 'C',
      Source: '../assets/Cev_H2.mp3',
      Description: 'Closed HH',
    },
  ];

  constructor() {}

  getDrumpads() {
    console.log('get');
    return of(this.drumpads);
  }
}
