import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DrummachineService } from '../drummachine.service';
import { Drumpads } from '../drumpads';
@Component({
  selector: 'app-drumpads',
  templateUrl: './drumpads.component.html',
  styleUrls: ['./drumpads.component.scss'],
})
export class DrumpadsComponent implements OnInit {
  drumpads: Drumpads[];
  timer: any;

  @ViewChild('padDOMHandle') dom: ElementRef;
  @Input('volume') volume: number;
  @Output() soundDescription: EventEmitter<string> = new EventEmitter();
  @Output() keypressEmit: EventEmitter<void> = new EventEmitter();

  constructor(private drumpadService: DrummachineService) {}

  ngOnInit() {
    this.drumpadService.getDrumpads().subscribe((drumpadArr) => {
      this.drumpads = drumpadArr;
    });
  }

  setVolume(e) {
    this.volume = e;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let pad = this.drumpads.find(
      (pad) => pad.Key.toUpperCase() === event.key.toUpperCase()
    );
    if (pad) {
      this.soundDescription.emit(pad.Description);
      this.play(event.key.toUpperCase(), true);
    }
  }

  onPadClick(description, key): void {
    this.soundDescription.emit(description);
    this.play(key, false);
  }

  play(key, keypress) {
    // Don't like tying the DOM to the component code (Angular say don't do this)
    // However, freecodecamp tests 6 and 7 forced this upon me
    let audioElements: HTMLCollection = this.dom.nativeElement.getElementsByTagName(
      'audio'
    );
    let drumpadAudioHandle: HTMLAudioElement;
    let drumpadDivHandle: HTMLDivElement;
    // loop through HTMLCollection, because apparently it doesn't have an iterator....
    for (let i = 0; i <= audioElements.length - 1; i++) {
      // if pad clicked matches the collection item, we are going to use that drum pad so stop looping
      if (audioElements.item(i).id === key) {
        drumpadAudioHandle = <HTMLAudioElement>audioElements.item(i);
        drumpadDivHandle = <HTMLDivElement>audioElements.item(i).parentElement;
        break;
      }
    }
    if (drumpadAudioHandle) {
      drumpadAudioHandle.volume = this.volume;
      if (keypress) this.mimicClickOnKeypress(drumpadDivHandle);
      drumpadAudioHandle.play();
    }
  }

  mimicClickOnKeypress(drumpadDivHandle: HTMLDivElement) {
    clearTimeout(this.timer);
    let drumpadStyle = window.getComputedStyle(drumpadDivHandle);

    // create new color for keypress
    let newColor = drumpadStyle
      .getPropertyValue('background-color')
      .replace('rgb', 'rgba');
    newColor = newColor.replace(/\)/i, ', 0.8)');

    drumpadDivHandle.style.backgroundColor = newColor;
    drumpadDivHandle.style.top = '1px';
    drumpadDivHandle.style.left = '1px';

    this.timer = setTimeout(() => {
      drumpadDivHandle.style.backgroundColor = '';
      drumpadDivHandle.style.top = '';
      drumpadDivHandle.style.left = '';
    }, 100);
  }
}
