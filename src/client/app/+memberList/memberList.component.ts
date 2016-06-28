import {FORM_DIRECTIVES} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import  {Member, MemberListService} from '../shared/index';
import {Http} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'memberList',
  templateUrl: 'memberList.component.html',
  styleUrls: ['memberList.component.css'],
  directives: [FORM_DIRECTIVES]
})
/**
 * This class represents the lazy loaded MemberListComponent.
 */
export class MemberListComponent implements OnInit {

  members:Member[];

  /**
   * Creates an instance of the MemberListComponent with the injected
   * MemberListService.
   *
   * @param {MemberListService} memberListService the injected MemberListService
   */
  constructor(private http:Http, private memberListService:MemberListService) {
  }

  ngOnInit() {
    return this.memberListService.init().subscribe(members => {
      this.members = members
    });
  }
  
  // addMember():boolean {
  //   this.memberListService.add(this.newMember);
  //   this.newMember = '';
  //   return false;
  // }
}
;
