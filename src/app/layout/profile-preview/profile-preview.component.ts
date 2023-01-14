import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss'],
})
export class ProfilePreviewComponent implements OnInit {
  @Input() imgUrl: string = "";
  constructor() {}

  ngOnInit(): void {
    this.imgUrl = environment.api + '/' +this.imgUrl;
  }
}
