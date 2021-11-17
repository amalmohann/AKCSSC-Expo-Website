import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  CreatePostResponse,
  GetPostResponse,
  Post,
} from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsLoading: boolean = true;
  posts: Post[] = [] as Post[];
  postForm: FormGroup = new FormGroup({
    startupname: new FormControl(''),
    logo: new FormControl(''),
    category: new FormControl(''),
    caption: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchAllPost();
  }

  public fetchAllPost() {
    //Fetch All Post
    this.spinner.show();
    this.commonService.getPost().subscribe(
      (fetchAllPost: GetPostResponse) => {
        if (fetchAllPost.acknowledgement.status === 'SUCCESS') {
          this.posts = fetchAllPost.posts;
          this.postsLoading = false;
          this.spinner.hide();          
        } else {
          this.toast.error(
            fetchAllPost.acknowledgement.message,
            fetchAllPost.acknowledgement.status
          );
          this.postsLoading = false;
          this.spinner.hide();          
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }

  //Fetch Post By ID

  public fetchPostById() {
    this.commonService.getSinglePost().subscribe(
      (fetchPostById: any) => {
        if (fetchPostById.acknowledgement.status === 'SUCCESS') {
        } else {
          this.toast.error(
            fetchPostById.acknowledgement.message,
            fetchPostById.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }

  // Create Post

  public createPost(values: any) {
    //Fetch All Post
    this.commonService.createPost(values).subscribe(
      (createPost: CreatePostResponse) => {
        if (createPost.acknowledgement.status === 'SUCCESS') {
        } else {
          this.toast.error(
            createPost.acknowledgement.message,
            createPost.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }

  // Update Post

  public updatePost(values: any) {
    this.commonService.updateCategory(values).subscribe(
      (updatePost: CommonResponse) => {
        if (updatePost.acknowledgement.status === 'SUCCESS') {
          //Updated Category
        } else {
          this.toast.error(
            updatePost.acknowledgement.message,
            updatePost.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }

  // Delete Post

  public deletePost() {
    //delete catergery
    this.commonService.deletePost().subscribe(
      (deletePost: CommonResponse) => {
        if (deletePost.acknowledgement.status === 'SUCCESS') {
        } else {
          this.toast.error(
            deletePost.acknowledgement.message,
            deletePost.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }
}
