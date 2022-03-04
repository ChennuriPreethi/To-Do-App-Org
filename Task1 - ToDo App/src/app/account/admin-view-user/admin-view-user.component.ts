import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Admininfo } from '../admininfo';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {
  users:any[]=[];
  tasks:any[] = [];
  constructor(private aS:ServiceService,private rT:Router,private fB:FormBuilder, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        console.log(params);
        this.aS.getAllTasks(params.listId).subscribe((tasks: any[])=>{
          this.tasks=tasks;
        })
      }
    )

    this.aS.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });


  }
  
  // userTask(admininfo:Admininfo){
  //   this.aS.getAllTasks().subscribe((data:any) => {
  //     console.log(data); 
  //     this.users = data;
  //   });
    //alert('Task Saved...!!');
    // this.ToDoForm.reset() 
  }

 
  


