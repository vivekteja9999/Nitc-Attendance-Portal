import { Component , OnInit } from '@angular/core';
import { on } from 'events';
import { SubjectService } from '../subject-registration/subject.service';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../class-registration/class.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { error } from 'console';


@Component({
  selector: 'app-modify-sub-cls',
  imports: [NavbarLoggedComponent  ,FormsModule , CommonModule],
  templateUrl: './modify-sub-cls.component.html',
  styleUrl: './modify-sub-cls.component.css'
})
export class ModifySubclsComponent implements OnInit{
  subjects: any[] = [];
  filteredSubjects: any[] = [];
  searchsubjectCode: string = '';
  selectedSubject: any = null;

  classes: any[] = [];
  filteredClasses: any[] = [];
  searchclassCode: string = '';
  selectedClass: any = null;

  
  constructor(private classService:ClassService , private subjectService: SubjectService, private toast: ToastrService) {}

  ngOnInit() {
    this.loadClasses();
    this.loadSubjects();
  }

  

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data : any) => {
        this.subjects = data;
        this.filteredSubjects = data; // Ensure filteredSubjects is updated
      },
      (error : any) => {
        this.toast.error('Failed to fetch subjects');
      }
    );
  }

  searchSubject() {
    if (this.searchsubjectCode.trim() === '') {
      this.filteredSubjects = this.subjects;
      return;
    }

    this.subjectService.searchSubjectByCode(this.searchsubjectCode).subscribe(
      (data : any) => {
        this.filteredSubjects = [data]; 
      // Display only the found subject
      },
      (error : any) => {
        this.toast.error('Subject not found');
        this.filteredSubjects = []; // Clear the table if no subject found
      }
    );
  }

  deleteSubject(subjectId: number) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.deleteSubject(subjectId).subscribe(
        () => {
          this.toast.success('Subject deleted successfully');
          this.loadSubjects(); // Refresh subjects after deletion
        },
        (error : any ) => {
          this.toast.error('Failed to delete subject');
          console.error(error);
        }
      );
    }
  }
  loadClasses() {
    this.classService.getAllClasses().subscribe(
      (data :any) => {
        this.classes = data;
        this.filteredClasses = data;
      },
      (error: any) => {
        this.toast.error('Failed to fetch classes');
      }
    );
  }

  // Search class
  searchClass() {
    if (this.searchclassCode.trim() === '') {
      this.filteredClasses = this.classes;
      return;
    }

    this.classService.searchClassByCode(this.searchclassCode).subscribe(
      (data: any) => {
        this.filteredClasses = [data];
      },
      (error: any) => {
        this.toast.error('Class not found');
        this.filteredClasses = [];
      }
    );
  }

  // Delete a class
  deleteClass(classId: number) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.deleteClass(classId).subscribe(
        () => {
          this.toast.success('Class deleted successfully');
          this.loadClasses();
        },
        (error: any) => {
          this.toast.error('Failed to delete class');
          console.error(error);
        }
      );
    }
  }
}
