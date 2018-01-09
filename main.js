// This is interesting.
// Note also that saveIssue takes in a parameter (e, presumably element).
// I guess that's passed implicitly by adding the event
// listener. Or as part of the "submit" form action.
// AHH. Nvm. "e" is the event.
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
    // It's also interesting to note that
    // issuesList appears to be changed via side effect.
    // There's no "setHTML" or anything like that.
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    if(issues !== null) {
        for(var i = 0; i < issues.length; i++) {
            var id = issues[i].id;
            var desc = issues[i].description;
            var severity = issues[i].severity;
            var assignedTo = issues[i].assignedTo;
            var status = issues[i].status;
            
            issuesList.innerHTML += '<div class="well">' +
                                    '<h6>Issue ID: ' + id + '</hd>' +
                                    '<p><span class="label label-info">' + status + '</span></p>' +
                                    '<h3>' + desc + '</h3>' +
                                    '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' +
                                    '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                  '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                  '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                  '</div>';
        }
    }
}

function saveIssue(e) {
    // What is chance. Ahhhh. A random-like library?
    // What a weird thing.
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open'; // Implied by sav... Wait. Maybe?
    
    // Hashmap? Or JSON?
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    }
    
    // === is a strict comparison operator.
    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue); // Push! Implies stack or something!
        
    } else {
        var issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    // Seriously, where is localStorage.
    
    // This is interesting.
    // Ah. Nvm. This isn't interesting.
    document.getElementById('issueInputForm').reset();
    
    fetchIssues();
    
    // What does this do?
    // Avoids default submission of the form. Ahhh.
    e.preventDefault();
}


function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}


function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}