import {
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { Drumpads } from './drumpads';
import { DrummachineService } from './drummachine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Drum machine';
  soundDescription: string;
  @ViewChild('padDOMHandle') dom: ElementRef;
  volume: number = 0.5;

  constructor(private drumpadService: DrummachineService) {}

  ngOnInit() {}

  setVolume(e) {
    this.volume = e;
  }

  setSoundDescription(e) {
    this.soundDescription = e;
  }
}
