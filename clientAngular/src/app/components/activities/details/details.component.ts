import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/_models/activity';
import { User } from 'src/app/_models/auth';
import { Vote } from 'src/app/_models/vote';
import { ActivityService } from 'src/app/_services/activity.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from 'src/app/_services/comment.service';
import { Comment } from '../../../_models/comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  activity: Activity | null = null;
  activityId: string = '';
  user: User | null = null;
  comments: Comment[] = [];
  commentModel = {
    text: '',
  };

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private authSerivce: AuthService,
    private commentSerivce: CommentService
  ) {}

  ngOnInit(): void {
    this.initializeState();
    this.listeners();
  }

  listeners = () => {
    this.activityService.onActivityGetData.subscribe((data) => {
      if (data) this.activity = data;
    });
    this.commentSerivce.onCommentsGetData.subscribe((comments) => {
      if (!comments) return;
      this.comments = comments;
    });
  };

  initializeState = () => {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.activityId = id;
    this.activityService.getActivity(id);
    this.commentSerivce.fetchComments(id);

    this.authSerivce.currentUser$.subscribe({
      next: (user) => {
        console.log('How about user');
        console.log(user);
        this.user = user;
      },
    });
  };

  changeVote = (vote: Vote) => {
    if (!this.user) return;
    this.activityService.updateVoteOnActivity(vote);
  };

  addComment = () => {
    this.commentSerivce.addComment(this.commentModel.text, this.activityId);
  };
}
