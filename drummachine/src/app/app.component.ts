import { Component, HostListener } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'drummachine';
  soundDescription: string;

  drumpads = [
    {
      Key: 'Q',
      Source: '../assets/Heater-1.mp3',
      Description: 'Q sound',
    },
    {
      Key: 'W',
      Source: '../assets/Heater-1.mp3',
      Description: 'W sound',
    },
    {
      Key: 'E',
      Source: '../assets/Heater-1.mp3',
      Description: 'E sound',
    },
    {
      Key: 'A',
      Source: '../assets/Heater-1.mp3',
      Description: 'A sound',
    },
    {
      Key: 'S',
      Source: '../assets/Heater-1.mp3',
      Description: 'S sound',
    },
    {
      Key: 'D',
      Source: '../assets/Heater-1.mp3',
      Description: 'D sound',
    },
    {
      Key: 'Z',
      Source: '../assets/Heater-1.mp3',
      Description: 'Z sound',
    },
    {
      Key: 'X',
      Source: '../assets/Heater-1.mp3',
      Description: 'X sound',
    },
    {
      Key: 'C',
      Source: '../assets/Heater-1.mp3',
      Description: 'C sound',
    },
  ];

  onClick(description, source): void {
    this.play(description, source);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let pad = this.drumpads.find(
      (element) => element.Key.toLowerCase() == event.key.toLowerCase()
    );
    if (pad != undefined) this.play(pad.Description, pad.Source);
  }

  play(description, source): void {
    this.soundDescription = description;
    let sound = new Howl({
      src: [source],
    });
    sound.play();
  }
}
