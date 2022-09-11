import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/_services/activity.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  model: { title: string; file: File | null } = {
    title: '',
    file: null,
  };

  constructor(
    private activitySerivce: ActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (!fileList?.[0]) return;
    this.model = {
      ...this.model,
      file: fileList[0],
    };
  }

  addPost = () => {
    const formData = new FormData();
    if (this.model.file) formData.append('file', this.model.file);
    formData.append('text', this.model.title);

    this.activitySerivce.createActivity(formData).subscribe({
      next: (resp) => {
        this.activitySerivce.getActivities({});
        this.router.navigateByUrl('/');
      },
    });
  };
}
