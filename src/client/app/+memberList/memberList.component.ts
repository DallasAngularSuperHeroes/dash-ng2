import { FORM_DIRECTIVES } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import  { Member, MemberListService } from '../shared/index';
import {Http} from '@angular/http';

// import { MemberListService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'memberList',
  templateUrl: 'memberList.component.html',
  styleUrls: ['memberList.component.css'],
  // providers: [MemberListServiceProvider],
  directives: [FORM_DIRECTIVES]
})
/**
 * This class represents the lazy loaded MemberListComponent.
 */
export class MemberListComponent implements OnInit {

  // newMember: string;

  members: Member[];
   private memberListService : MemberListService;
  /**
   * Creates an instance of the MemberListComponent with the injected
   * MemberListService.
   *
   * @param {MemberListService} memberListService the injected MemberListService
   */
  constructor(private http: Http){
    this.memberListService = MemberListService.getInstance(this.http);
  }

  ngOnInit(){
    return this.memberListService.init().subscribe( members => {
      console.log(`132  ${JSON.stringify(members[0].country)}`);
      this.members = members
      console.log(`133  `);
    });
  }

    //this.members = memberListService.get();
    // addMember(): boolean {
    //   this.memberListService.add(this.newMember);
    //   this.newMember = '';
    //   return false;

};
