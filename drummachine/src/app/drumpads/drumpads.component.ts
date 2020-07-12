import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
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
  @Input('volume') volume: number;

  @Output() soundDescription: EventEmitter<string> = new EventEmitter();
  @Output() keypressEmit: EventEmitter<void> = new EventEmitter();

  constructor(private drumpadService: DrummachineService) {}

  ngOnInit() {
    this.drumpadService.getDrumpads().subscribe((drumpadArr) => {
      this.drumpads = drumpadArr;
      console.log(drumpadArr);
    });
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
    let drumpad: HTMLAudioElement;
    let dp: HTMLDivElement;
    // loop through HTMLCollection, because apparently it doesn't have an iterator....
    for (let i = 0; i <= audioElements.length - 1; i++) {
      // if pad clicked matches the collection item, we are going to use that drum pad so stop looping
      if (audioElements.item(i).id === key) {
        drumpad = <HTMLAudioElement>audioElements.item(i);
        dp = <HTMLDivElement>audioElements.item(i).parentElement;
        break;
      }
    }
    if (drumpad) {
      drumpad.volume = this.volume;
      if (keypress) this.keypressEmit.emit();
      drumpad.play();
    }
  }
}
