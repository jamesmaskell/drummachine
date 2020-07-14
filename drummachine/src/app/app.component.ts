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
  constructor(private drumpadService: DrummachineService) {}

  ngOnInit() {}

  setSoundDescription(e) {
    this.soundDescription = e;
  }
}
