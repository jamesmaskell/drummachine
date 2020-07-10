import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Drum machine';
  soundDescription: string;
  volume: number = 0.5;
  volumeBar: number = 320;
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

  onDragStart(e: DragEvent) {
    var img = document.createElement('img');
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  onDrag(e: DragEvent) {
    console.log('onDragA', this.volumeBar);

    if (e.offsetX > -16 && e.offsetX < 624) {
      this.volumeBar = e.offsetX;
      this.volume = (e.offsetX + 16) / 640;
    } else if (e.offsetX >= 624) {
      this.volumeBar = 624;
      this.volume = 1;
    } else if (e.offsetX <= -16) {
      this.volumeBar = -16;
      this.volume = 0;
    }

    console.log('onDragB', this.volumeBar);
  }

  onDragEnd() {
    console.log('onDragEnd', this.volumeBar);
  }

  onVolClick(e: MouseEvent) {
    this.volumeBar = e.offsetX;
    this.volume = e.offsetX / 640;
  }

  onPadClick(description, key): void {
    this.soundDescription = description;
    this.play(key);
  }

  slide(slideKey: string) {
    (slideKey === ',' || slideKey === 'ArrowLeft') && this.volume > 0
      ? this.volumeBar - 10 < 0
        ? (this.volumeBar = -16)
        : (this.volumeBar -= 10)
      : this.volumeBar;
    (slideKey === '.' || slideKey === 'ArrowRight') && this.volume < 1
      ? this.volumeBar - 10 > 624
        ? (this.volumeBar = 624)
        : (this.volumeBar += 10)
      : this.volumeBar;
    this.volume = (this.volumeBar + 16) / 640;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.slide(event.key);

    let pad = this.drumpads.find(
      (pad) => pad.Key.toUpperCase() === event.key.toUpperCase()
    );
    if (pad) {
      this.soundDescription = pad.Description;
      this.play(event.key.toUpperCase());
    }
  }

  play(key) {
    // Don't like tying the DOM to the component code (Angular say don't do this)
    // However, freecodecamp tests 6 and 7 forced this upon me
    let audioElements: HTMLCollection = this.dom.nativeElement.getElementsByTagName(
      'audio'
    );
    let drumpad: HTMLAudioElement;
    // loop through HTMLCollection, because apparently it doesn't have an iterator....
    for (let i = 0; i <= audioElements.length - 1; i++) {
      // if pad clicked matches the collection item, we are going to use that drum pad so stop looping
      if (audioElements.item(i).id === key) {
        drumpad = <HTMLAudioElement>audioElements.item(i);
        break;
      }
    }
    if (drumpad) {
      drumpad.volume = this.volume;
      drumpad.play();
    }
  }
}
