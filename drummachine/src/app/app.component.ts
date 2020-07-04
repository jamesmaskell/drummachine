import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'drummachine';
  @ViewChild('qKey') myAudio: HTMLDivElement;
  @ViewChild('wKey') myAudio: ElementRef;
  @ViewChild('eKey') myAudio: ElementRef;
  @ViewChild('aKey') myAudio: ElementRef;
  @ViewChild('myAudio') myAudio: ElementRef;
  @ViewChild('myAudio') myAudio: ElementRef;
  @ViewChild('myAudio') myAudio: ElementRef;
  @ViewChild('myAudio') myAudio: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyPress(event.key);
  }

  keyPress(key: string) {
    console.log(key, this.myAudio);
    console.log(this.myAudio.id.
  }
}
