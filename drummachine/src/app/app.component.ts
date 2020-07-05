import { Component, HostListener } from '@angular/core';

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
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'Q sound',
    },
    {
      Key: 'W',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'W sound',
    },
    {
      Key: 'E',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'E sound',
    },
    {
      Key: 'A',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'A sound',
    },
    {
      Key: 'S',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'S sound',
    },
    {
      Key: 'D',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'D sound',
    },
    {
      Key: 'Z',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'Z sound',
    },
    {
      Key: 'X',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'X sound',
    },
    {
      Key: 'C',
      Source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      Description: 'C sound',
    },
  ];

  onClick(description, el: HTMLAudioElement): void {
    this.soundDescription = description;
    el.play();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {}
}
