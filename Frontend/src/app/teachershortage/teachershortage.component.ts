import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from '../navbar_loggedin/navbar_loggedin.component';
import { ClassService } from '../registrations/class-registration/class.service';
import { UpdateSubjectService } from '../update-subjects/update-subjects.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-teachershortage',
  imports: [FormsModule, CommonModule, NavbarLoggedComponent],
  templateUrl: './teachershortage.component.html',
  styleUrl: './teachershortage.component.css'
})
export class TeachershortageComponent implements OnInit {

  email: string = '';
  role: string = '';
  isAdmin: boolean = false;

  subjects: any[] = [];
  filteredSubjects: any[] = [];
  filteredClasses: any[] = [];

  sections: any[] = [];
  selectedSubjectCode: string = '';
  selectedSection: any = null;

  students: any[] = [];
  searchQuery: string = '';
  showResults = false;
  noDataFound = false;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private authService: AuthService,
    private classService: ClassService,
    private updateSubjectService: UpdateSubjectService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.loadSections();
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  fetchUserDetails() {
    this.http.get<any>("http://localhost:8082/user/details", this.getHttpOptions()).subscribe(
      user => {
        this.email = user.email;
        this.role = user.role.toLowerCase();
        this.isAdmin = this.role === "admin";
        this.loadSubjects();
      },
      error => {
        console.error("Failed to fetch user details", error);
      }
    );
  }

  loadSections() {
    this.classService.getAllClasses().subscribe(
      (data: any[]) => {
        this.filteredClasses = data;
        this.sections = data;
      },
      error => {
        console.error("Failed to load class sections", error);
      }
    );
  }

  loadSubjects() {
    this.updateSubjectService.getUserSubjects(this.email).subscribe(
      (data: any) => {
        this.subjects = data;
        this.filteredSubjects = data;
      },
      (error: any) => {
        console.error("Failed to load assigned subjects", error);
      }
    );
  }

  onSubjectSelect() {
    this.selectedSection = null;
    this.students = [];
    this.showResults = false;
    this.searchQuery = '';
  }

  getAttendanceData() {
    if (!this.selectedSubjectCode || !this.selectedSection) {
      this.toast.error("Please select both subject and section.");
      return;
    }

    const sectionId = this.selectedSection.classId;

    this.http.get<any[]>(
      `http://localhost:8082/attendance/teacher-student-report?teacherEmail=${this.email}&subjectCode=${this.selectedSubjectCode}&section=${sectionId}`,
      this.getHttpOptions()
    ).subscribe(
      data => {
        this.students = data;
        this.noDataFound = data.length === 0;
        this.showResults = true;
        this.searchQuery = '';
      },
      error => {
        console.error("Failed to fetch attendance data", error);
        this.toast.error("Unable to fetch attendance data");
      }
    );
  }

  filteredStudents() {
    if (!this.searchQuery) {
      return this.students.filter(student => student.percentage < 80);
    }

    const query = this.searchQuery.toLowerCase();

    return this.students.filter(student =>
      student.percentage < 80 &&
      (
        student.studentEmail.toLowerCase().includes(query) ||
        (student.studentName && student.studentName.toLowerCase().includes(query))
      )
    );
  }

  downloadPDF() {
    const filteredData = this.filteredStudents();
    if (filteredData.length === 0) {
      this.toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF();
    const subject = this.subjects.find(s => s.subjectCode === this.selectedSubjectCode)?.subjectName || this.selectedSubjectCode;
    const section = this.selectedSection.classId;

    const fileName = `${this.email}_${subject}_${section}.pdf`;

    doc.setFontSize(14);
    doc.text(`Attendance Shortage Report (< 80%)`, 14, 15);
    doc.setFontSize(11);
    doc.text(`Teacher: ${this.email}`, 14, 23);
    doc.text(`Subject: ${subject}`, 14, 30);
    doc.text(`Section: ${section}`, 14, 37);

    const tableData = filteredData.map((student, index) => [
      index + 1,
      student.studentEmail,
      student.attended,
      student.totalClasses,
      `${student.percentage}%`
    ]);

    autoTable(doc, {
      head: [['Sl.No', 'Student Email', 'Classes Attended', 'Total Classes', 'Attendance %']],
      body: tableData,
      startY: 45
    });

    doc.save(fileName);
  }
}
