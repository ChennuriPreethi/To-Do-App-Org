import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {ServiceService} from '../service.service';
import { Admininfo } from '../admininfo';
import { ActivatedRoute,Params, Router } from "@angular/router"; 

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {
  ToDoForm:any;
  users:any[]=[];
  tasks:any[]=[];
  datasaved = false;
  message: any;
  status:any;
  selectedlistId:any;
  // selectedtaskId:any;
  listId:any;
  taskId:any;
  constructor(private fB: FormBuilder, private aS:ServiceService,private rT:Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedlistId=params.listId;
          // this.selectedtaskId=params.taskId;
          this.aS.getAllNCTasks(params.listId).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        }
        else{
          this.selectedlistId = undefined;
        }
        
      }
    )  
    this.setFormState();
    
  }
  setFormState(): void {
    this.ToDoForm = this.fB.group({
      task: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  onSubmit() {
    
    let adinfo = this.ToDoForm.value;
    // console.log(adinfo);
    this.adminAccount(adinfo);
    this.ToDoForm.reset();
    this.aS.getAllTasks(this.selectedlistId).subscribe((tasks: any) => {
      this.tasks = tasks;
      window.location.reload();
    });
    
  }
  adminAccount(admininfo:Admininfo) {
    this.aS.addTask(admininfo,this.selectedlistId).subscribe(
      (doc:any) => {
        let response=JSON.stringify(doc);
        console.log(doc);
        this.datasaved = true;
        this.message = doc['msg'];
        this.status = doc['status'];
       this.ToDoForm.reset();
      }
    )
  }

  delTask(_id:string){
    if(confirm(`Are you sure to delete this task?`)==true){
      this.aS.deleteTask(this.selectedlistId,_id).subscribe((res:any)=>{
        console.log(res);
      })
      alert("Deleted Successfully");
      window.location.reload();
   }
  }

  
  // delTask(_id:string){
  //   if(confirm(`Are you sure to delete this task?`)==true){
  //     this.aS.deleteTask(_id).subscribe((res)=>{
  //       console.log(res);
        
  //     }) 
  //     alert("Deleted Successfully");
  //   }
  // }

  // editTask(_UserID:string,_id:string){
  //   this.aS.updateTask(this.listId,this.taskId).subscribe(()=>{
  //     console.log("Completed successfully");
  //     _id.completed = true
  //   })
  // }

  // userTask(){
  //   this.aS.addUserTask(this.ToDoForm.value).subscribe((data) => {
  //     console.log(data);  
  //     this.users = data;
  //   });
  //   alert('Task Saved...!!');
  //   this.ToDoForm.reset()  
  // }
  }


