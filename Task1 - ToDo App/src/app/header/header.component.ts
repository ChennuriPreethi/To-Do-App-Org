import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from "@angular/router";  
import { ServiceService } from '../account/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isloggedin=false;
  selectedlistId:any;
  tasks:any[]=[];
  lists:any[]=[];
  listId:any;
  routerPath:any;
  constructor(private rT:Router,private route:ActivatedRoute,private aS:ServiceService) {
    if(localStorage.getItem('Loginuser')){
      this.isloggedin=true;
    }
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedlistId=params.listId;
          this.aS.getAllTasks(params.listId).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        }
        else{
          this.selectedlistId = undefined;
        }
        
      }
    )

    // this.routerPath=['/users',this.selectedlistId,'viewTask']
    
  }
  navbarCollapsed = true;
 
  toggleNavbarCollapsing() {
      this.navbarCollapsed = !this.navbarCollapsed;
  }

  onLogout() {  
    localStorage.removeItem('Loginuser');
    this.isloggedin = false;  
    this.rT.navigate(['/login']);
  } 
 
}
