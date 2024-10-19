document.addEventListener("DOMContentLoaded", function() {
    // Mock data for teams and mentors
    const teams = [
        { id: 1, name: "Team Alpha", members: "John, Sarah, Tom", mentor: "None" },
        { id: 2, name: "Team Beta", members: "Alice, Bob, Mark", mentor: "None" }
    ];

    const mentors = [
        { id: 1, name: "Dr. Emily Clarke", teams: [] },
        { id: 2, name: "Dr. Richard Smith", teams: [] }
    ];

    // Populate Teams and Mentors in dropdowns
    const teamSelect = document.getElementById('team');
    const mentorSelect = document.getElementById('mentor');

    teams.forEach(team => {
        const option = `<option value="${team.id}">${team.name}</option>`;
        teamSelect.insertAdjacentHTML('beforeend', option);
    });

    mentors.forEach(mentor => {
        const option = `<option value="${mentor.id}">${mentor.name}</option>`;
        mentorSelect.insertAdjacentHTML('beforeend', option);
    });

    // Handle Allocation Form Submission
    const allocationForm = document.getElementById('allocation-form');
    allocationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedTeamId = teamSelect.value;
        const selectedMentorId = mentorSelect.value;

        const selectedTeam = teams.find(team => team.id == selectedTeamId);
        const selectedMentor = mentors.find(mentor => mentor.id == selectedMentorId);

        // Assign the mentor to the selected team
        selectedTeam.mentor = selectedMentor.name;
        selectedMentor.teams.push(selectedTeam.name);

        // Update the team and mentor tables dynamically
        updateTables();

        // Display success message
        const allocationResult = document.getElementById('allocation-result');
        allocationResult.textContent = `Mentor ${selectedMentor.name} assigned to ${selectedTeam.name}.`;

        // Notify via backend (this is where you'd send an API request)
        alert(`Notification sent to ${selectedTeam.members} and ${selectedMentor.name}`);
    });

    // Update tables with the latest team and mentor information
    function updateTables() {
        const teamList = document.getElementById('team-list');
        const mentorList = document.getElementById('mentor-list');

        // Clear the existing rows
        teamList.innerHTML = '';
        mentorList.innerHTML = '';

        // Populate teams
        teams.forEach(team => {
            const row = `<tr>
                <td>${team.name}</td>
                <td>${team.members}</td>
                <td>${team.mentor}</td>
            </tr>`;
            teamList.insertAdjacentHTML('beforeend', row);
        });

        // Populate mentors
        mentors.forEach(mentor => {
            const row = `<tr>
                <td>${mentor.name}</td>
                <td>${mentor.teams.length > 0 ? mentor.teams.join(", ") : "None"}</td>
            </tr>`;
            mentorList.insertAdjacentHTML('beforeend', row);
        });
    }

    // Initialize tables with default data
    updateTables();
});
