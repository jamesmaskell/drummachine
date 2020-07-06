import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Drum machine';
  soundDescription: string;
  @ViewChild('padDOMHandle') dom: ElementRef;

  drumpads = [
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

  onClick(description, key): void {
    this.soundDescription = description;
    this.play(key);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.play(event.key.toUpperCase());
  }

  play(key) {
    // Don't like tying the DOM to the component code
    // However, freecodecamp tests 6 and 7 forced this upon me
    let audioElements: HTMLCollection = this.dom.nativeElement.getElementsByTagName(
      'audio'
    );
    let drumpad: HTMLAudioElement;
    for (let i = 0; i <= audioElements.length - 1; i++) {
      if (audioElements.item(i).id === key) {
        drumpad = <HTMLAudioElement>audioElements.item(i);
        break;
      }
    }
    if (drumpad) {
      drumpad.play();
    }
  }
}
