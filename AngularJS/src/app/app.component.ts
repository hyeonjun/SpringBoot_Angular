import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { MemberService } from './member.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public members : Member[];
  public editMember : Member | undefined;
  public deleteMember : Member | undefined;

  constructor(private memberService: MemberService) {
    this.members = [];
  }

  ngOnInit() {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getUsers().subscribe(
      (response : Member[]) => {
        this.members = response;
        // console.log(this.members);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMember(addForm: NgForm) : void {
    document.getElementById('add-member-form')?.click();
    this.memberService.addUsers(addForm.value).subscribe(
      (_response: Member) => {
        this.getMembers();
        addForm.reset();
      }, (error: HttpErrorResponse) => {
        alert("사용 불가능한 아이디입니다.");
        addForm.reset();
      }
    );
  }

  public onUpdateMember(member : Member) : void {
    this.memberService.updateUsers(member).subscribe(
      (_response: Member) => {
        console.log(member);
        this.getMembers();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMember(userid : string | undefined) : void {
    if(userid != undefined){
      this.memberService.deleteUsers(userid).subscribe(
        (_response:void) =>{
          this.getMembers();
        }, (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }
  }

  public onOpenModal(member : Member | null,  mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addMemberModal');
    }
    if (mode === 'edit'){
      if(member != null){
        this.editMember = member;
      }
      button.setAttribute('data-target', '#updateMemberModal');
    }
    if (mode === 'delete'){
      if(member != null){
        this.deleteMember = member;
      }
      button.setAttribute('data-target', '#deleteMemberModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public searchMembers(key: string): void{
    const results : Member[] = [];
    for (const m of this.members){
      if (m.userid.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        m.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        m.phone.indexOf(key) !== -1) {
          results.push(m);
      }
    }
    this.members = results;
    if (results.length === 0 || !key){
      this.getMembers();
    }
  }
}
