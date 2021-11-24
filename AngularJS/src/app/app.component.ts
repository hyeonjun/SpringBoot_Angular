import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public members: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getUsers().subscribe(
      (response : Member[]) => {
        this.members = response;
        console.log(this.members);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
