// Student Attendance Register JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Attendance checkboxes - Select all functionality
    const selectAllMorning = document.getElementById('select-all-morning');
    const selectAllAfternoon = document.getElementById('select-all-afternoon');
    
    if (selectAllMorning) {
        selectAllMorning.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('input[name^="morning_status"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    if (selectAllAfternoon) {
        selectAllAfternoon.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('input[name^="afternoon_status"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.add('fade');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    });
    
    // Print report functionality
    const printReportBtn = document.getElementById('print-report');
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Date range validation for reports
    const reportForm = document.getElementById('report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            const startDate = new Date(document.getElementById('start_date').value);
            const endDate = new Date(document.getElementById('end_date').value);
            
            if (endDate < startDate) {
                e.preventDefault();
                alert('End date cannot be earlier than start date');
            }
        });
    }
    
    // Student search functionality
    const studentSearch = document.getElementById('student-search');
    if (studentSearch) {
        studentSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const studentRows = document.querySelectorAll('.student-row');
            
            studentRows.forEach(row => {
                const studentName = row.querySelector('.student-name').textContent.toLowerCase();
                const admissionNumber = row.querySelector('.admission-number').textContent.toLowerCase();
                
                if (studentName.includes(searchTerm) || admissionNumber.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Form validation for adding students
    const addStudentForm = document.getElementById('add-student-form');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            const admissionNumber = document.getElementById('admission_number').value;
            const name = document.getElementById('name').value;
            const dateOfBirth = document.getElementById('date_of_birth').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            
            if (!admissionNumber || !name || !dateOfBirth || !gender) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    }
    
    // Confirm delete actions
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });
    
    // Highlight current date in attendance calendar
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput && !dateInput.value) {
        dateInput.value = today;
    }
    
    // Counter animation for dashboard
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const increment = target / (duration / interval);
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(count);
            }
        }, interval);
    });
});
