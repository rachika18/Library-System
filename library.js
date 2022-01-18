//shree ganeshaya namah
//library system
var mysql = require('mysql');

//creating database connection
var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "pass",
      database: "library"
    });
console.clear();
//***************************** Front End *****************************//
mainmenu();
//********mainmenu********//
function mainmenu(){
console.log("*************************************** Library System ***************************************");
//switch case for admin and user
var choice = require('readline-sync').question("\nSelect User: 1.Admin 2.Student 3.Exit\n>>>Choice: ");
switch(choice){
    case "1":
        console.log("*************************************** Library System ***************************************");
        admin(); // module for admin
        break;
    case "2":
       
        console.log("*************************************** Library System ***************************************");
        user(); // module for user
        break;
    case "3":
       
        console.log(">>>>>>>Thank you for using our system<<<<<<<");
        break;
    default:
        console.log("Invalid choice");
}
}

        
//***************************** Modules *****************************//
//********Admin Module********//
function admin(){
    
    console.log("\n    *************************************** Admin ***************************************");
    var choice = require('readline-sync').question("\nSelect option: \n\n1. Add Book \n2. Delete Book \n3. Update Book \n4. View Book \n5. Issue Details \n6. Return Details \n7. Add Student \n8. Delete Student \n9. Student Details \n10. Return to Main Menu\n\n>>>Choice: ");
    switch(choice){
        case "1":
            
            console.log("*************************************** Library System ***************************************");
            addBook(); // module for adding book
            break;
        case "2":
           
            console.log("*************************************** Library System ***************************************");
            deleteBook(); // module for deleting book
            break;
        case "3":
            
            console.log("*************************************** Library System ***************************************");
            updateBook(); // module for updating book
            break;
        case "4":
           
            console.log("*************************************** Library System ***************************************");
            viewBook(); // module for viewing user
            break;
        case "5":
            
            console.log("*************************************** Library System ***************************************");
            issueDetails(); // module for viewing issue
            break;
        case "6":
            
            console.log("*************************************** Library System ***************************************");
            returnDetails(); // module for returning book
            break;
        case "7":
           
            console.log("*************************************** Library System ***************************************");
            addStudent(); // module for adding student
            break;

        case "8":
            
            console.log("*************************************** Library System ***************************************");
            deleteStudent(); // module for deleting student
            break;

        case "9":
           
            console.log("*************************************** Library System ***************************************");
            studentDetails(); // module for viewing student
            break;

        case "10":
           
            mainmenu();
            break;

        default:
            console.log("Invalid choice");
    }
}

//********addbook()********//
function addBook(){
    console.log("\n\n\t\t ********************** Add a Book *********************");
    var bookName = require('readline-sync').question("\nEnter book name: ");
    var authorName = require('readline-sync').question("\nEnter author name: ");
    var bookQuantity = require('readline-sync').question("\nEnter book quantity: ");
    var book = {
        bookName: bookName,
        bookAuthor: authorName,
        bookQuantity: bookQuantity
    };
    connection.query('INSERT INTO book_details SET ?', book, function(err, result) {
        if (err) throw err;

    //displaying current added book details using npm table module
    console.log("\n\n********************** Added Book Details *********************");
    var table = require('table');
    var data = [['Book Name', 'Author Name', 'Book Quantity']];
    data.push([book.bookName, book.bookAuthor, book.bookQuantity]);
    console.log(table.table(data));
    console.log("\nBook added successfully");

    //do you want to continue
    var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n\t>>>Choice: ");
    if (choice == "Y" || choice == "y") {
        
        addBook();
    } else {
       
        admin();
    }
    });
}

//********deleteBook()********//
function deleteBook(){
    //diplaying all books
    console.log("\n\n\t\t ********************** Available Books *********************");
    connection.query('SELECT * FROM book_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Book ID','Book Name', 'Author Name', 'Book Quantity']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].bookId,result[i].bookName, result[i].bookAuthor, result[i].bookQuantity]);
        }
        console.log(table.table(data));
   
    //deleting book
    console.log("\n\n********************** Delete a Book *********************");
    var bookId = require('readline-sync').question("\nEnter book ID: ");
    connection.query('DELETE FROM book_details WHERE bookId = ?', bookId, function(err, result) {
        if (err) throw err;
        console.log("\n>>>Book deleted successfully<<<");

        //do you want to continue
        var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            deleteBook();
        } else {
           
            admin();
        }
    });
});
}

//********updateBook()********//
function updateBook(){
    //diplaying all books
    console.log("\n\n\t\t ********************** Available Books *********************");
    connection.query('SELECT * FROM book_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Book ID','Book Name', 'Author Name', 'Book Quantity']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].bookId,result[i].bookName, result[i].bookAuthor, result[i].bookQuantity]);
        }
        console.log(table.table(data)); 

        //updating book
        console.log("\n\n********************** Update a Book *********************");
        var bookId = require('readline-sync').question("\nEnter book ID: ");
        var bookName = require('readline-sync').question("\nEnter book name: ");
        var authorName = require('readline-sync').question("\nEnter author name: ");
        var bookQuantity = require('readline-sync').question("\nEnter book quantity: ");
        var book = {
            bookName: bookName,
            bookAuthor: authorName,
            bookQuantity: bookQuantity
        };
        connection.query('UPDATE book_details SET ? WHERE bookId = ?', [book, bookId], function(err, result) {
            if (err) throw err;

        //displaying current updated book details using npm table module
        console.log("\n\n********************** Updated Book *********************");
        var table = require('table');
        var data = [['Book Name', 'Author Name', 'Book Quantity']];
        data.push([book.bookName, book.bookAuthor, book.bookQuantity]);
        console.log(table.table(data));
        
            console.log("\n>>>Book updated successfully<<<");

            //do you want to continue
            var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n>>>Choice: ");
            if (choice == "Y" || choice == "y") {
                
                updateBook();
            } else {
                
                admin();
            }
        });
    });
}

//********viewBook()********//
function viewBook(){
    //diplaying all books
    console.log("\n\n\t\t ********************** Available Books *********************");
    connection.query('SELECT * FROM book_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Book ID','Book Name', 'Author Name', 'Book Quantity']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].bookId,result[i].bookName, result[i].bookAuthor, result[i].bookQuantity]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return to admin(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            admin();
        } else {
           
            mainmenu();
        }
    });
}

//********issueDetails()********//
function issueDetails(){
    //diplaying issued books details
    console.log("\n\n\t\t ********************** Issued Books *********************");
    connection.query('SELECT * FROM issuedetails', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Issue ID','Student ID','Student Name','Contact Number','Book ID','Book Name','Issue Date','Books In Stock']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].issueNumber,result[i].studentId, result[i].studentName, result[i].contactNumber, result[i].bookId, result[i].bookName, result[i].issueDate, result[i].stock]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return to admin(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            admin();
        } else {
           
        mainmenu();
        }
    });
}

//********returnDetails()********//
function returnDetails(){
    //diplaying returned books details
    console.log("\n\n\t\t ********************** Returned Books *********************");
    connection.query('SELECT * FROM returndetails', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Return ID','Student ID','Student Name','Contact Number','Book ID','Book Name','Return Date','Books In Stock']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].returnNumber,result[i].studentId, result[i].studentName, result[i].contactNumber, result[i].bookId, result[i].bookName, result[i].returnDate, result[i].stock]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return to admin(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            admin();
        } else {
            
            mainmenu();
        }
    });
}

//********addStudent()********//
function addStudent(){
    //adding student details having name, contact number, email id
    console.log("\n\n\t\t ********************** Add Student *********************");
    var studentName = require('readline-sync').question("\nEnter student name: ");
    var contactNumber = require('readline-sync').question("\nEnter contact number: ");
    var emailId = require('readline-sync').question("\nEnter email id: ");
    var student = {
        studentName: studentName,
        contactNumber: contactNumber,
        emailId: emailId
    };
    connection.query('INSERT INTO student_details SET ?', student, function(err, result) {
        if (err) throw err;

        //displaying current added student details using npm table module
        console.log("\n\n  ********************** Added Student *********************");
        var table = require('table');
        var data = [['Student ID','Student Name', 'Contact Number', 'Email ID']];
        data.push([result.insertId, student.studentName, student.contactNumber, student.emailId]);
        console.log(table.table(data));
        console.log("\n>>>Student added successfully<<<");

        //do you want to continue
        var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n\t>>>Choice: ");
        if (choice == "Y" || choice == "y") {
           
            addStudent();
        } else {
            
            admin();
        }
    });
}

//********deleteStudent()********//
function deleteStudent(){
    //displaying all students
    console.log("\n\n\t ********************** Student Details *********************");
    connection.query('SELECT * FROM student_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Student ID','Student Name', 'Contact Number', 'Email ID']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].studentId,result[i].studentName, result[i].contactNumber, result[i].emailId]);
        }
        console.log(table.table(data));
        
    //deleting student details having name, contact number, email id
    console.log("\n\n********************** Delete Student *********************");
    var studentId = require('readline-sync').question("\nEnter student id: ");
    connection.query('DELETE FROM student_details WHERE studentId = ?', studentId, function(err, result) {
        if (err) throw err;
        console.log("\n>>>Student deleted successfully<<<");
        //do you want to continue
        var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
           
            deleteStudent();
        } else {
            
            admin();
        }
    });
    });
}

//********studentDetails()********//
function studentDetails(){
    //diplaying all students
    console.log("\n\n                 ********************** Student Details *********************");
    connection.query('SELECT * FROM student_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Student ID','Student Name', 'Contact Number', 'Email ID']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].studentId,result[i].studentName, result[i].contactNumber, result[i].emailId]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return to admin(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            admin();
        } else {
            
            mainmenu();
        }
    });
}

//********User Module********//
function user(){
  
    console.log("\n    *************************************** Student ***************************************");
    var choice = require('readline-sync').question("\nSelect option: \n\n1. View Book \n2. View Student Details \n3. Issue Book \n4. Return Book \n5. Return to Main Menu\n\n>>>Choice: ");
    switch(choice){
        case "1":
            
            console.log("*************************************** Library System ***************************************");
            sviewBook(); // module for viewing book - Module avialable in admin modules.
            break;
        
        case "2":
            
            console.log("*************************************** Library System ***************************************");
            sviewStudentDetails(); // module for viewing student details 
            break;
        
        case "3":
            
            console.log("*************************************** Library System ***************************************");
            issueBook(); // module for issuing book
            break;
        case "4":
            
            console.log("*************************************** Library System ***************************************");
            returnBook(); // module for returning book
            break;
        case "5":
            
            mainmenu(); // module for returning to main menu
            break;
        default:
            console.log("Invalid choice");
    }
}

//********sviewBook() for student********//
function sviewBook(){
    //diplaying all books
    console.log("\n\n\t\t ********************** Available Books *********************");
    connection.query('SELECT * FROM book_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Book ID','Book Name', 'Author Name', 'Book Quantity']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].bookId,result[i].bookName, result[i].bookAuthor, result[i].bookQuantity]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return to admin(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            user();
        } else {
            
            mainmenu();
        }
    });
}

//********sviewStudentDetails()********//
function sviewStudentDetails(){
    //diplaying all students
    console.log("\n\n\t\t ********************** Student Details *********************");
    connection.query('SELECT * FROM student_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Student ID','Student Name']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].studentId,result[i].studentName]);
        }
        console.log(table.table(data));
        //asking for retuning to admin
        var choice = require('readline-sync').question("\nDo you want to return Menu(Y/N)?\n>>>Choice: ");
        if (choice == "Y" || choice == "y") {
            
            user();
        } else {
            
            mainmenu();
        }
    });
}

//********module for issueBook()********//
function issueBook(){
    // displayinhg all books
    console.log("\n\n\t\t ********************** Book Details *********************");
    connection.query('SELECT * FROM book_details', function(err, result) {
        if (err) throw err;
        var table = require('table');
        var data = [['Book ID','Book Name']];
        for(var i=0; i<result.length; i++){
            data.push([result[i].bookId,result[i].bookName]);
        }
        console.log(table.table(data));
        
    //issue book
    console.log("\n\n********************** Issue Book *********************");
    var studentId = require('readline-sync').question("\nEnter student id: ");
    var bookId = require('readline-sync').question("\nEnter book id: ");
    //fetching current date in dd-mm-yyyy format in issueDate variable
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    var issueDate = dd + '-' + mm + '-' + yyyy;

    //fetching student name and contact number from student_details table in studentName and contactNumber variables
    connection.query('SELECT studentName, contactNumber FROM student_details WHERE studentId = ?', studentId, function(err, result) {
        if (err) throw err;
        var studentName = result[0].studentName;
        var contactNumber = result[0].contactNumber;

        //fetching book name and stock from book_details table in bookName and stock variables
        connection.query('SELECT bookName, bookQuantity FROM book_details WHERE bookId = ?', bookId, function(err, result) {
            if (err) throw err;
            var bookName = result[0].bookName;
            var stock = result[0].bookQuantity;
            //checking if book is available or not
            if(stock > 0){
                //updating book stock
                connection.query('UPDATE book_details SET bookQuantity = ? WHERE bookId = ?', [stock-1, bookId], function(err, result) {
                    if (err) throw err;
                   
                    var issue = {
                        studentId: studentId,
                        studentName: studentName,
                        contactNumber: contactNumber,
                        bookId: bookId,
                        bookName: bookName,
                        issueDate: issueDate,
                        stock : stock-1
                    };

                    //inserting student details in issue_details table
                    connection.query('INSERT INTO issuedetails SET ?',issue, function(err, result) {
                        if (err) throw err;

                    //displaying issued book details with student details using npm table
                    console.log("\n\n********************** Issued Book Details *********************");
                    var table = require('table');
                    var data = [['Student ID','Student Name','Contact Number','Book ID','Book Name','Issue Date','Stock']];
                    data.push([issue.studentId,issue.studentName,issue.contactNumber,issue.bookId,issue.bookName,issue.issueDate,issue.stock]);
                    console.log(table.table(data));
                    
                        console.log("\n>>>Book issued successfully<<<");
                        //do you want to continue
                        var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n>>>Choice: ");
                        if (choice == "Y" || choice == "y") {
                            
                            issueBook();
                        } else {
                           
                            user();
                        }
                        
                    });
    });
}
else{
    console.log("\nBook is not available");
    //do you want to continue
    var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n\t>>>Choice: ");
    if (choice == "Y" || choice == "y") {
        console.clear();
        issueBook();
    } else {
        console.clear();
        user();
    }
}
});
});
});
}

//********returnook()********//
function returnBook(){
     // displayinhg all books
     console.log("\n\n\t\t ********************** Book Details *********************");
     connection.query('SELECT * FROM book_details', function(err, result) {
         if (err) throw err;
         var table = require('table');
         var data = [['Book ID','Book Name']];
         for(var i=0; i<result.length; i++){
             data.push([result[i].bookId,result[i].bookName]);
         }
         console.log(table.table(data));
         
     //issue book
     console.log("\n\n********************** Return Book *********************");
     var studentId = require('readline-sync').question("\nEnter student id: ");
     var bookId = require('readline-sync').question("\nEnter book id: ");
     //fetching current date in dd-mm-yyyy format in issueDate variable
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
     if(dd<10) {
         dd = '0'+dd
     }
     if(mm<10) {
         mm = '0'+mm
     }
     var returnDate = dd + '-' + mm + '-' + yyyy;
 
     //fetching student name and contact number from student_details table in studentName and contactNumber variables
     connection.query('SELECT studentName, contactNumber FROM student_details WHERE studentId = ?', studentId, function(err, result) {
         if (err) throw err;
         var studentName = result[0].studentName;
         var contactNumber = result[0].contactNumber;
 
         //fetching book name and stock from book_details table in bookName and stock variables
         connection.query('SELECT bookName, bookQuantity FROM book_details WHERE bookId = ?', bookId, function(err, result) {
             if (err) throw err;
             var bookName = result[0].bookName;
             var stock = result[0].bookQuantity;
             //checking if book is available or not
                 //updating book stock and add 1 to stock
                    connection.query('UPDATE book_details SET bookQuantity = bookQuantity+1 WHERE bookId = ?', [bookId], function(err, result) {
                        if (err) throw err;
                //fetching stock of current book from bookdetails table in stock variable
                connection.query('SELECT bookQuantity FROM book_details WHERE bookId = ?', bookId, function(err, result) {
                    if (err) throw err;
                    var stock = result[0].bookQuantity;
                    

                     var issue = {
                         studentId: studentId,
                         studentName: studentName,
                         contactNumber: contactNumber,
                         bookId: bookId,
                         bookName: bookName,
                         returnDate: returnDate,
                         stock : stock
                     };
 
                     //inserting student details in issue_details table
                     connection.query('INSERT INTO returndetails SET ?',issue, function(err, result) {
                         if (err) throw err;

                         //displaying returned book details with student details using npm table
                            console.log("\n\n********************** Returned Book Details *********************");
                            var table = require('table');
                            var data = [['Student ID','Student Name','Contact Number','Book ID','Book Name','Return Date','Stock']];
                            data.push([issue.studentId,issue.studentName,issue.contactNumber,issue.bookId,issue.bookName,issue.returnDate,issue.stock]);
                            console.log(table.table(data));

                         console.log("\n>>>Book returned successfully<<<");
                         //do you want to continue
                         var choice = require('readline-sync').question("\nDo you want to continue(Y/N)?\n>>>Choice: ");
                         if (choice == "Y" || choice == "y") {
                            
                             issueBook();
                         } else {
                             
                             user();
                         }
                         
                     });
     });
 });
 });
 });
    });
}
